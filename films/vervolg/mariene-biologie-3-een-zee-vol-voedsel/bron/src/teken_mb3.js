// Wat word jij? · Mariene biologie 3 · Een zee vol voedsel: de Waddenzee — eigen tekeningen (7 nov 2026)
// Seriekleuren (REEKS-marien): teal = zeewater, groen = algen (producenten), oker = schelp, vlees en voedsel,
// koraal = let op (tekort aan voedsel), goud = focus en draagkracht; geen paars.
// Maten (tekstbron wint, C10): kanoet ± 25 cm (B42, Welsh Wildlife Trusts 23–25 cm), snavel ± 3,5 cm, recht en zwart,
// winterkleed grijs met witte buik, korte groengrijze poten; slikt kokkels tot ± 17 mm heel door (Natura 2000 profiel A143).
// Scholekster ± 42 cm, zwart-wit, oranjerode snavel ± 8 cm, roze poten. Kokkel tot ± 4 cm, 22–28 ribben, korte sifons;
// nonnetje ± 2 cm, glad, roze, dieper met lange sifon; mossel ± 5 cm, blauwzwart, top aan het spitse eind, byssusdraden;
// wadpier 15–20 cm in een U-gang ± 20–30 cm diep, trechter boven de kop, kronkelhoopje boven de staart (Volkenborn 2007, Ecomare).
// Invanginstallatie (MZI): drijvers met touwen of netten waar mosselzaad zich op vastzet (WMR C027/23; WUR-magazine 2021).

const GROND = 860;
const MB3 = { slik: '#5E5140', slikL: '#7A6A52', zand: '#B8A47C', bruin: '#8A7A3A', zee: '#2F6F8F', zeeL: '#5BA4C9',
  schelp: '#E2CFA2', schelpD: '#A88C5A', vlees: '#E39A72', mossel: '#272C3C', mosselL: '#56607E', plankton: '#7FC48F', kiezel: '#B59A44' };

// ---------- algemene hulpjes (zoals mk1/mk2) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function lijn(ctx, pts, col, lw = 3, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
function stippel(ctx, x0, y0, x1, y1, col, a = 1, lw = 3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash([12, 9]); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.9), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 72, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 2);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 22); ctx.lineTo(x + 52, y + 36); ctx.lineTo(x + 26, y + 50); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); text(ctx, s2, x + 66, y + 49, fTekst(36, 700), C.text, 'left'); ctx.restore(); }
function somRegel(ctx, s2, x, y, a = 1, kl = C.text, px = 48, al = 'left') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s2, x, y, fTekst(px, 800), kl, al); ctx.restore(); }
function mb3_mix(h1, h2, u) { u = clamp(u, 0, 1); const p = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }; const A = p(h1), B = p(h2); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * u)).join(',')})`; }
// gladde gesloten (of open) lijn door punten (Catmull-Rom)
function mb3_pad(ctx, P, dicht = true) { const n = P.length; const g = i => dicht ? P[(i + n) % n] : P[clamp(i, 0, n - 1)];
  ctx.moveTo(P[0][0], P[0][1]); const m = dicht ? n : n - 1;
  for (let i = 0; i < m; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]); }
  if (dicht) ctx.closePath(); }

// =====================================================================
// 1. VOGELS: kanoet en scholekster (zijaanzicht, eenheid 1 = 1 cm, s = px per cm)
// =====================================================================
const MB3_VOGEL = {
  kanoet: { k: 1, snavel: 3.6, snDik: 0.75, snKl: ['#22252A', '#22252A'], poot: 3.1, pootKl: '#6E7A5E', rug: '#8E959D', vleugel: '#7D858E', buik: '#ECEDEA', kop: '#8E959D', oog: '#141414', borst: 0.55, streep: true },
  scholekster: { k: 1.55, snavel: 8.0, snDik: 1.5, snKl: ['#E0662E', '#E88A3A'], poot: 5.0, pootKl: '#D89A92', rug: '#1C1D22', vleugel: '#202228', buik: '#F2F1EC', kop: '#1C1D22', oog: '#D8402A', borst: 1, streep: false }
};
function mb3_vogelLijf(ctx, V, o) { const k = V.k;
  const LIJF = [[5.5, -10.8], [3, -12.0], [-1, -12.2], [-5, -11.3], [-9, -9.8], [-9.5, -8.4], [-6, -6.8], [-2, -5.2], [2, -5.0], [5, -6.4], [6.5, -8.6]].map(([x, y]) => [x * k, y * k]);
  const STAART = [[-8.5, -10.2], [-12.2, -9.6], [-12.4, -8.8], [-8.8, -8.4]].map(([x, y]) => [x * k, y * k]);
  ctx.beginPath(); mb3_pad(ctx, STAART); shape(ctx, lighten(V.rug, -0.15), null);
  ctx.beginPath(); mb3_pad(ctx, LIJF); shape(ctx, V.buik, null);
  ctx.save(); ctx.beginPath(); mb3_pad(ctx, LIJF); ctx.clip();
  // bovenkant (rug) en bij de scholekster ook de borst donker
  ctx.fillStyle = V.rug; ctx.beginPath(); const gy = V.borst >= 1 ? [[8 * k, -14 * k], [8 * k, -6.6 * k], [4 * k, -6.9 * k], [0, -8.2 * k], [-10 * k, -8.6 * k], [-10 * k, -14 * k]] : [[8 * k, -14 * k], [8 * k, -9.6 * k], [3 * k, -9.4 * k], [-3 * k, -8.8 * k], [-10 * k, -8.5 * k], [-10 * k, -14 * k]];
  mb3_pad(ctx, gy); ctx.fill();
  if (V.streep) { ctx.fillStyle = rgba('#7E858C', 0.7); for (let i = 0; i < 9; i++) { const xx = (5.4 - (i % 3) * 1.1) * k, yy = (-8.9 + Math.floor(i / 3) * 0.9) * k; ctx.beginPath(); ctx.ellipse(xx, yy, 0.42 * k, 0.16 * k, 0.4, 0, 6.283); ctx.fill(); } }
  ctx.restore();
  if (o.vlucht) { ctx.fillStyle = rgba('#F2F2EE', 0.9); ctx.beginPath(); ctx.ellipse(-8.6 * k, -9.4 * k, 1.1 * k, 0.6 * k, 0, 0, 6.283); ctx.fill(); return; } // in vlucht: geen gevouwen vleugel, witte stuit zichtbaar
  // dichte vleugel op de flank, punt tot bij de staartpunt
  const VL = [[4, -10.6], [0, -11.7], [-5, -11.1], [-11.8, -9.3], [-10.4, -8.7], [-5, -8.5], [0, -8.8], [3.4, -9.5]].map(([x, y]) => [x * k, y * k]);
  ctx.beginPath(); mb3_pad(ctx, VL); shape(ctx, V.vleugel, null);
  ctx.save(); ctx.beginPath(); mb3_pad(ctx, VL); ctx.clip(); ctx.strokeStyle = V.streep ? rgba('#C8CDD2', 0.55) : rgba('#3A3C44', 0.8); ctx.lineWidth = 0.13 * k;
  for (let i = 0; i < 6; i++) { const xx = (2 - i * 2.2) * k; ctx.beginPath(); ctx.moveTo(xx, -11.6 * k); ctx.quadraticCurveTo(xx - 1.2 * k, -10 * k, xx - 2.2 * k, -8.7 * k); ctx.stroke(); }
  if (!V.streep) { ctx.strokeStyle = rgba('#F2F1EC', 0.9); ctx.lineWidth = 0.35 * k; ctx.beginPath(); ctx.moveTo(1 * k, -9.0 * k); ctx.lineTo(-8 * k, -8.9 * k); ctx.stroke(); } // witte vleugelstreep scholekster
  ctx.restore(); }
function mb3_vogelKop(ctx, V, o) { const k = V.k, hx = 6.4 * k, hy = -12.2 * k, hr = 2.35 * Math.sqrt(k);
  // snavel (taps, recht)
  const L = V.snavel, d0 = V.snDik; const bx = hx + hr * 0.82, by = hy + hr * 0.12;
  ctx.beginPath(); ctx.moveTo(bx - 0.2, by - d0 / 2); ctx.lineTo(bx + L, by + 0.25 * k - 0.12); ctx.lineTo(bx + L, by + 0.25 * k + 0.12); ctx.lineTo(bx - 0.2, by + d0 / 2); ctx.closePath();
  const g = ctx.createLinearGradient(bx, 0, bx + L, 0); g.addColorStop(0, V.snKl[0]); g.addColorStop(1, V.snKl[1]); ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); ctx.arc(hx, hy, hr, 0, 6.283); shape(ctx, V.kop, null);
  if (V.streep) { ctx.strokeStyle = rgba('#E4E6E4', 0.85); ctx.lineWidth = 0.32; ctx.beginPath(); ctx.moveTo(hx - 0.6, hy - 0.95); ctx.quadraticCurveTo(hx + 0.7, hy - 1.25, hx + hr * 0.95, hy - 0.4); ctx.stroke();
    ctx.fillStyle = V.buik; ctx.beginPath(); ctx.ellipse(hx + 0.8, hy + hr * 0.75, hr * 0.55, hr * 0.32, -0.2, 0, 6.283); ctx.fill(); } // lichte keel
  ctx.beginPath(); ctx.arc(hx + hr * 0.3, hy - hr * 0.12, 0.36 * Math.sqrt(k), 0, 6.283); ctx.fillStyle = V.oog; ctx.fill();
  if (!V.streep) { ctx.beginPath(); ctx.arc(hx + hr * 0.3, hy - hr * 0.12, 0.2, 0, 6.283); ctx.fillStyle = '#141414'; ctx.fill(); }
  return { tip: [bx + L, by + 0.25 * k] }; }
// staande steltloper. x,y = tussen de voeten. o: kijk, pik (0..1 kop omlaag), kokkel (0..1 kokkel voor de snavel), slik (0..1 kokkel naar binnen)
function mb3_vogel(ctx, soort, x, y, s, o = {}) { const V = MB3_VOGEL[soort]; const { a = 1, kijk = 1, pik = 0, kokkel = 0, slik = 0, vleugelsOp = 0 } = o; if (a <= 0.01) return {};
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; const k = V.k, P = V.poot;
  const poot = (dx, kl) => { ctx.strokeStyle = kl; ctx.lineWidth = 0.42 * Math.sqrt(k); ctx.beginPath(); ctx.moveTo(dx + 0.4 * k, -4.8 * k); ctx.lineTo(dx - 0.5 * k, -P - 0.2); ctx.lineTo(dx + 0.15, 0); ctx.stroke();
    ctx.lineWidth = 0.24 * Math.sqrt(k); ctx.beginPath(); ctx.moveTo(dx + 0.15, 0); ctx.lineTo(dx + 2.3 * k, 0.05); ctx.moveTo(dx + 0.15, 0); ctx.lineTo(dx + 1.7 * k, 0.45); ctx.moveTo(dx + 0.15, 0); ctx.lineTo(dx - 0.6 * k, 0.15); ctx.stroke(); };
  poot(-1.1 * k, lighten(V.pootKl, -0.25)); poot(0.1, V.pootKl);
  ctx.translate(0, -(P - 3.1)); // langere poten tillen het lijf op
  ctx.save(); ctx.translate(0, -4.6 * k); ctx.rotate(pik * 0.42); ctx.translate(0, 4.6 * k);
  if (vleugelsOp > 0.01) mb3_vleugelsOp(ctx, V, vleugelsOp);
  mb3_vogelLijf(ctx, V, o); const kp = mb3_vogelKop(ctx, V, o);
  if (kokkel > 0.01) { const u = ease(slik); const kx = lerp(kp.tip[0] + 0.4, 6.6 * k, u), ky = lerp(kp.tip[1] + 0.2, -10.2 * k, u); laag(ctx, kokkel * (1 - ramp(u, 0.75, 0.25)), () => mb3_kokkel(ctx, kx, ky, 1, { L: 1.5, rot: 0.2 })); }
  ctx.restore(); ctx.restore(); return {}; }
function mb3_vleugelsOp(ctx, V, u) { const k = V.k; ctx.save(); ctx.globalAlpha *= clamp(u, 0, 1); ctx.fillStyle = lighten(V.vleugel, -0.1);
  for (const dx of [0, 1.6]) { ctx.beginPath(); mb3_pad(ctx, [[(2 + dx) * k, -10.5 * k], [(-1 + dx) * k, -17 * k], [(-6 + dx) * k, -22 * k], [(-5 + dx) * k, -16 * k], [(-4 + dx) * k, -10.5 * k]]); ctx.fill(); }
  ctx.restore(); }
// kanoet in vlucht, zijaanzicht naar rechts, x,y = midden van het lijf. fase 0..1: neerslag (gestrekt), opslag (hand gevouwen).
// Spanwijdte ± 50 cm (± 23 cm per vleugel vanaf het lijf); witte vleugelstreep, grijze stuit.
// kanoet in vlucht, zijaanzicht naar rechts, x,y = midden van het lijf. fase 0..1: neerslag 0–0,55 (gestrekt), opslag (hand gevouwen bij de pols).
// Recept (C9, review 7 nov 2026): spanwijdte ± 50 cm → per vleugel ± 23 cm: arm ± 40 % (breed, koorde ± 6 cm), hand ± 60 % (spits);
// rechte voorrand, licht gekartelde achterrand, witte vleugelstreep over de achterkant van arm en hand. Neerslag tot ± 20° onder horizontaal.
// Geen gevouwen flankvleugel in vlucht. Bekende fouten: vleugel als smalle spies; dubbele vleugel; vleugel die verder dan 20° omlaag wijst (leest als poot).
function mb3_kanoetVlieg(ctx, x, y, s, fase, o = {}) { const V = MB3_VOGEL[o.soort || 'kanoet']; const { a = 1, kijk = 1 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s * kijk, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const ph = ((fase % 1) + 1) % 1, neer = ph < 0.55, u = neer ? ph / 0.55 : (ph - 0.55) / 0.45;
  const e = o.glij != null ? o.glij : (neer ? lerp(1.2, -0.3, ease(u)) : lerp(-0.3, 1.2, ease(u))); // slaghoek (rad), + = omhoog
  const vouw = o.glij != null ? 0 : (neer ? 0 : Math.sin(u * Math.PI) * 0.95);
  const k = V.k, A = 9.2 * k, Hd = 13.8 * k;
  const vleugel = (ver) => { const pr0 = Math.sin(e), pr = Math.sign(pr0 || 1) * Math.max(0.3, Math.abs(pr0)), sc = ver ? 0.9 : 1;
    const sweep = 0.32 + vouw * 0.9; // hand zwaait naar achteren (meer bij de opslag)
    // (u langs de spanwijdte, v langs de koorde naar achteren) → scherm
    const P = (uu, vv) => { const uh = Math.max(0, uu - A), ua = Math.min(uu, A); const sw = uh * Math.sin(sweep), up = ua + uh * Math.cos(sweep);
      return [2.2 - vv - sw - ua * 0.12, -9.6 * k - up * pr * sc]; };
    const C0 = 6.0 * k, cw = 5.4 * k; // koorde bij de romp en bij de pols
    const voor = [[0, 0], [A * 0.5, -0.15], [A, 0.2], [A + Hd * 0.5, 0.3], [A + Hd, 1.2]];
    const achter = [[A + Hd * 0.82, 2.6], [A + Hd * 0.6, 3.9], [A + Hd * 0.35, 4.9], [A + Hd * 0.1, cw], [A * 0.6, cw + 0.3], [0, C0]];
    const vorm = () => { ctx.beginPath(); const pts = voor.concat(achter).map(([uu, vv]) => P(uu, vv)); mb3_pad(ctx, pts); };
    vorm(); shape(ctx, ver ? lighten(V.vleugel, -0.25) : V.vleugel, null);
    if (!ver) { ctx.save(); vorm(); ctx.clip();
      ctx.fillStyle = lighten(V.vleugel, -0.22); ctx.beginPath(); mb3_pad(ctx, [[A * 0.92, 0.1], [A + Hd, 1.2], [A + Hd * 0.6, 3.9], [A + Hd * 0.1, cw], [A * 0.92, cw]].map(([uu, vv]) => P(uu, vv))); ctx.fill(); // donkere handpennen
      ctx.strokeStyle = rgba('#F2F2EE', 0.9); ctx.lineWidth = 0.5 * k; ctx.beginPath(); [[0.4, C0 - 1.4], [A * 0.6, cw - 1.1], [A + Hd * 0.12, cw - 1.3], [A + Hd * 0.42, 3.6]].map(([uu, vv]) => P(uu, vv)).forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); // witte vleugelstreep
      ctx.strokeStyle = rgba('#3A4048', 0.55); ctx.lineWidth = 0.14 * k; for (let f = 0.2; f < 0.95; f += 0.15) { const [x1, y1] = P(A + Hd * f, 0.4 + f * 0.6), [x2, y2] = P(A + Hd * (f - 0.08), 3.6 + (1 - f) * 1.6); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); } // handpennen
      ctx.restore(); } };
  ctx.translate(0, 8.4); // lijf rond (0,0)
  ctx.save(); ctx.translate(1.4, -0.7); vleugel(true); ctx.restore();
  mb3_vogelLijf(ctx, V, { vlucht: true }); mb3_vogelKop(ctx, V, {});
  ctx.fillStyle = V.pootKl; ctx.beginPath(); ctx.ellipse(-8.2 * k, -7.1 * k, 1.6 * k, 0.3 * k, -0.08, 0, 6.283); ctx.fill(); // poten ingetrokken onder de staart
  vleugel(false);
  ctx.restore(); }

// =====================================================================
// 2. SCHELPDIEREN EN WORM (eenheid 1 = 1 cm)
// =====================================================================
// kokkel van opzij: rond, 22–28 ribben vanuit de top (umbo), groeiringen. x,y = midden. o.L = lengte (cm), o.open 0..1 = sifons uit, o.rot
function mb3_kokkel(ctx, x, y, s, o = {}) { const { a = 1, L = 3, open = 0, rot = 0, kl = MB3.schelp } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const rx = L / 2, ry = L * 0.47; const UMB = [-0.05 * L, -ry * 1.04];
  const vorm = () => { ctx.beginPath(); mb3_pad(ctx, [[UMB[0], UMB[1]], [rx * 0.55, -ry * 0.88], [rx * 0.98, -ry * 0.2], [rx * 0.85, ry * 0.55], [rx * 0.3, ry * 0.98], [-rx * 0.35, ry * 0.96], [-rx * 0.9, ry * 0.5], [-rx * 0.98, -ry * 0.25], [-rx * 0.55, -ry * 0.86]]); };
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= open; const sx = rx * 0.55, sy = -ry * 0.78; // twee korte sifons met franjes, naar boven
    for (const [dx, h, kk] of [[-0.12, 0.55, '#C9A57A'], [0.18, 0.42, '#D8B88A']]) { roundRect(ctx, sx + dx * L - 0.11 * L, sy - h * L * open, 0.22 * L, h * L * open + 0.1 * L, 0.1 * L); shape(ctx, kk, lighten(kk, -0.2), 0.04 * L);
      ctx.strokeStyle = '#8A6A44'; ctx.lineWidth = 0.03 * L; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(sx + dx * L + i * 0.04 * L, sy - h * L * open); ctx.lineTo(sx + dx * L + i * 0.06 * L, sy - h * L * open - 0.07 * L); ctx.stroke(); } }
    ctx.restore(); }
  vorm(); shape(ctx, kl, lighten(kl, -0.35), 0.05 * L);
  ctx.save(); vorm(); ctx.clip(); ctx.strokeStyle = rgba('#7A6440', 0.55); ctx.lineWidth = 0.045 * L;
  for (let i = 0; i < 24; i++) { const an = Math.PI * (0.05 + 0.9 * i / 23); ctx.beginPath(); ctx.moveTo(UMB[0], UMB[1]); ctx.lineTo(UMB[0] - Math.cos(an) * L * 1.2, UMB[1] + Math.sin(an) * L * 1.2); ctx.stroke(); }
  ctx.strokeStyle = rgba('#7A6440', 0.4); ctx.lineWidth = 0.035 * L; for (const f of [0.45, 0.68, 0.86]) { ctx.beginPath(); ctx.ellipse(0, UMB[1] + (ry * 1.04) * f * 0.95, rx * f, ry * f * 1.05, 0, 0.15, Math.PI - 0.15); ctx.stroke(); }
  ctx.restore(); if (open > 0.01) { ctx.strokeStyle = rgba('#3A2E20', 0.8 * open); ctx.lineWidth = 0.06 * L; ctx.beginPath(); ctx.moveTo(rx * 0.92, -ry * 0.1); ctx.lineTo(rx * 0.35, ry * 0.95); ctx.stroke(); }
  ctx.restore(); }
// kokkel opengesneden: schelprand en het vlees binnenin (vlees 0..1)
function mb3_kokkelVlees(ctx, x, y, s, vlees, o = {}) { const { a = 1, L = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const rx = L / 2, ry = L * 0.47; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); shape(ctx, MB3.schelp, MB3.schelpD, 0.06 * L);
  ctx.beginPath(); ctx.ellipse(0, 0, rx * 0.84, ry * 0.8, 0, 0, 6.283); shape(ctx, '#3A3226', null);
  const f = 0.25 + 0.75 * clamp(vlees, 0, 1); ctx.beginPath(); mb3_pad(ctx, [[-rx * 0.7 * f, 0], [-rx * 0.3 * f, -ry * 0.7 * f], [rx * 0.4 * f, -ry * 0.6 * f], [rx * 0.75 * f, ry * 0.05], [rx * 0.3 * f, ry * 0.68 * f], [-rx * 0.4 * f, ry * 0.6 * f]]); shape(ctx, MB3.vlees, lighten(MB3.vlees, -0.25), 0.04 * L);
  ctx.restore(); }
// nonnetje: ± 2 cm, glad, roze met lichte banden
function mb3_nonnetje(ctx, x, y, s, o = {}) { const { a = 1, L = 2, rot = 0, sifon = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (sifon > 0.01) { ctx.strokeStyle = '#E8D6C2'; ctx.lineWidth = 0.18; ctx.beginPath(); ctx.moveTo(0.4 * L, -0.4 * L); ctx.bezierCurveTo(0.6 * L, -2.5 * sifon, 0.2, -5 * sifon, 1.2, -sifon * 6.2); ctx.stroke(); }
  const rx = L / 2, ry = L * 0.42; const vorm = () => { ctx.beginPath(); mb3_pad(ctx, [[0, -ry * 1.05], [rx * 0.7, -ry * 0.65], [rx, 0.05 * ry], [rx * 0.55, ry * 0.85], [-rx * 0.4, ry * 0.88], [-rx * 0.95, ry * 0.15], [-rx * 0.65, -ry * 0.7]]); };
  vorm(); shape(ctx, '#E3A6A0', '#A86A68', 0.05 * L); ctx.save(); vorm(); ctx.clip(); ctx.strokeStyle = rgba('#F6E2DA', 0.8); ctx.lineWidth = 0.08 * L;
  for (const f of [0.4, 0.62, 0.82]) { ctx.beginPath(); ctx.ellipse(0, -ry * 1.05 + ry * 2 * f * 0.9, rx * f, ry * f, 0, 0.2, Math.PI - 0.2); ctx.stroke(); } ctx.restore(); ctx.restore(); }
// mossel: ± 5 cm, langwerpig, top (umbo) aan het spitse eind links, blauwzwart. o.open = mantelrand zichtbaar (filtert)
function mb3_mossel(ctx, x, y, s, o = {}) { const { a = 1, L = 5, rot = 0, open = 0, byssus = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const P = [[-L * 0.5, 0.05 * L], [-L * 0.3, -0.2 * L], [L * 0.1, -0.27 * L], [L * 0.42, -0.2 * L], [L * 0.5, 0], [L * 0.38, 0.13 * L], [0, 0.15 * L], [-L * 0.35, 0.12 * L]];
  if (byssus > 0.01) { ctx.strokeStyle = rgba('#B8A070', 0.8 * byssus); ctx.lineWidth = 0.05 * L; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-L * 0.15, 0.13 * L); ctx.quadraticCurveTo(-L * 0.2 + i * 0.1 * L, 0.3 * L, -L * 0.35 + i * 0.16 * L, 0.42 * L); ctx.stroke(); } }
  if (open > 0.01) { ctx.save(); ctx.globalAlpha *= open; ctx.beginPath(); ctx.ellipse(L * 0.1, 0.17 * L, L * 0.33, 0.07 * L, 0, 0, 6.283); shape(ctx, '#D88A4E', '#A8642E', 0.03 * L); ctx.strokeStyle = '#7A4A26'; ctx.lineWidth = 0.025 * L; for (let i = 0; i < 9; i++) { const xx = -L * 0.18 + i * 0.065 * L; ctx.beginPath(); ctx.moveTo(xx, 0.2 * L); ctx.lineTo(xx, 0.27 * L); ctx.stroke(); } ctx.restore(); }
  ctx.beginPath(); mb3_pad(ctx, P); shape(ctx, MB3.mossel, '#151822', 0.05 * L);
  ctx.save(); ctx.beginPath(); mb3_pad(ctx, P); ctx.clip(); ctx.strokeStyle = rgba(MB3.mosselL, 0.75); ctx.lineWidth = 0.05 * L;
  for (const f of [0.35, 0.6, 0.85]) { ctx.beginPath(); ctx.ellipse(-L * 0.5, 0.05 * L, L * f, 0.3 * L * f, 0, -1.2, 0.9); ctx.stroke(); }
  ctx.fillStyle = rgba('#7A88B0', 0.35); ctx.beginPath(); ctx.ellipse(L * 0.05, -0.12 * L, L * 0.3, 0.05 * L, -0.05, 0, 6.283); ctx.fill(); ctx.restore(); ctx.restore(); }
// mosselbank: een tros mosselen op de bodem (x = midden, y = bodem)
function mb3_mosselbank(ctx, x, y, w, s, o = {}) { const { a = 1, n = 14, open = 0, seed = 3 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const u = hash(i * 3.3 + seed), v = hash(i * 7.1 + seed); mb3_mossel(ctx, x - w / 2 + u * w, y - 4 * s * v - 1.2 * s, s * (0.75 + 0.35 * hash(i + seed)), { rot: -0.9 + 1.8 * hash(i * 2.7 + seed), open: open * (i % 2), byssus: 0.6 }); }
  ctx.restore(); }
// wadpier in een U-gang. x,y = midden aan het oppervlak, s px/cm. Trechter links boven de kop, hoopje rechts boven de staart.
function mb3_wadpier(ctx, x, y, s, o = {}) { const { a = 1, t = 0, eet = 0, hoopje = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // gang (donkerder, licht omrand)
  ctx.strokeStyle = rgba('#2E271E', 0.85); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(10, -0.2); ctx.lineTo(10, -0.2); ctx.bezierCurveTo(10.5, 8, 9, 20, 4, 21.5); ctx.lineTo(-8, 21.5); ctx.stroke();
  ctx.strokeStyle = rgba('#8A7A5A', 0.55); ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-9, 20); ctx.stroke(); // kolom los zand onder de trechter (voedingsschacht)
  ctx.strokeStyle = rgba('#2E271E', 0.85); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-8.6, 21.5); ctx.lineTo(-9, 19); ctx.stroke();
  // worm: kop links onder de schacht, staart rechts omhoog
  const W0 = [[-8.4, 21.2], [-4, 21.6], [0, 21.5], [3.8, 21.0], [7.2, 18.5], [8.8, 14]]; ctx.strokeStyle = '#A85440'; ctx.lineWidth = 1.15;
  ctx.beginPath(); W0.slice(0, 4).forEach((p, i) => i ? ctx.lineTo(p[0], p[1] + Math.sin(t * 3 + i) * 0.15) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.lineWidth = 0.6; ctx.strokeStyle = '#C47A5E'; ctx.beginPath(); W0.slice(3).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  ctx.strokeStyle = '#D84A3A'; ctx.lineWidth = 0.22; for (let i = 0; i < 7; i++) { const xx = -5 + i * 1.1; ctx.beginPath(); ctx.moveTo(xx, 21); ctx.lineTo(xx - 0.2, 19.9 + Math.sin(t * 4 + i) * 0.2); ctx.moveTo(xx, 22); ctx.lineTo(xx - 0.2, 23); ctx.stroke(); } // kieuwbosjes
  // trechter (kuiltje) aan het oppervlak
  ctx.fillStyle = rgba('#2E271E', 0.6); ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-9, 2.6, -6, 0); ctx.closePath(); ctx.fill();
  // kronkelhoopje boven de staart
  if (hoopje > 0.01) { ctx.save(); ctx.globalAlpha *= hoopje; ctx.strokeStyle = '#C8B48A'; ctx.lineWidth = 0.75; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, an = u * 18, r = 2.6 * (1 - u * 0.55); ctx.lineTo(10 + Math.cos(an) * r, -0.4 - u * 2.6 + Math.sin(an) * r * 0.35); } ctx.stroke(); ctx.restore(); }
  // zand gaat erin (pijltjes omlaag in de trechter), komt eruit op het hoopje
  if (eet > 0.01) { ctx.save(); ctx.globalAlpha *= eet; ctx.fillStyle = '#E8D6A8'; for (let i = 0; i < 6; i++) { const u = ((t * 0.25 + i / 6) % 1); ctx.beginPath(); ctx.arc(-9, u * 19, 0.38, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }

// =====================================================================
// 3. HET WAD IN DOORSNEDE, ALGEN, WATER
// =====================================================================
// bodemblok: x,y = linksboven van de bodem (het oppervlak), w,h. o.water = hoogte waterlaag erboven (px); o.bruin = laagje kiezelwieren
function mb3_bodem(ctx, x, y, w, h, o = {}) { const { a = 1, water = 0, bruin = 0, golf = 0, t = 0, groen = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (water > 0.5) { ctx.fillStyle = rgba(MB3.zee, 0.55); ctx.fillRect(x, y - water, w, water); ctx.strokeStyle = rgba(C.teal, 0.9); ctx.lineWidth = 3; ctx.beginPath(); for (let xx = 0; xx <= w; xx += 20) ctx.lineTo(x + xx, y - water + Math.sin(xx * 0.02 + t * 1.5) * golf); ctx.stroke();
    if (groen > 0.01) { for (let i = 0; i < Math.round(w * water / 900); i++) { const g = wander(i, t, 10, 0.4); const px = x + 10 + hash(i * 1.7) * (w - 20) + g.x, py = y - water + 10 + hash(i * 2.9) * (water - 20) + g.y; circ(ctx, px, py, 3.2, rgba(MB3.plankton, 0.85 * groen)); } } }
  ctx.fillStyle = MB3.slik; ctx.fillRect(x, y, w, h); ctx.fillStyle = rgba('#3E352A', 0.6); ctx.fillRect(x, y + h * 0.45, w, h * 0.55); // dieper = donkerder (zuurstofloos)
  for (let i = 0; i < Math.round(w * h / 6000); i++) circ(ctx, x + hash(i * 3.1) * w, y + 6 + hash(i * 5.3) * (h - 10), 1.6 + hash(i) * 1.4, rgba('#9A8A68', 0.18));
  ctx.fillStyle = MB3.slikL; ctx.fillRect(x, y, w, 5);
  if (bruin > 0.01) { ctx.fillStyle = rgba('#8C7A30', 0.95 * bruin); ctx.fillRect(x, y - 2, w, 10); }
  ctx.restore(); }
// kiezelwieren op zandkorrels (zoomcirkel): bootvormige en ronde kiezelwieren, goudbruin
function mb3_kiezelwieren(ctx, cx, cy, r, t = 0) { ctx.fillStyle = '#4A4232'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(cx - r + hash(i * 4.1) * 2 * r, cy - r + hash(i * 6.7) * 2 * r, r * 0.22, r * 0.17, hash(i) * 3, 0, 6.283); shape(ctx, '#B8A47C', '#8E7C58', 1.5); }
  for (let i = 0; i < 16; i++) { const g = wander(i, t, 3, 0.3); const px = cx - r * 0.85 + hash(i * 2.3 + 1) * 1.7 * r + g.x, py = cy - r * 0.85 + hash(i * 3.9 + 2) * 1.7 * r + g.y, an = hash(i * 9.1) * 3.14;
    ctx.save(); ctx.translate(px, py); ctx.rotate(an);
    if (i % 4 === 0) { circ(ctx, 0, 0, r * 0.07, '#B59A44', '#7A6A2A', 1.2); ctx.strokeStyle = rgba('#7A6A2A', 0.8); ctx.lineWidth = 0.8; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(k * 0.785) * r * 0.07, Math.sin(k * 0.785) * r * 0.07); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.13, r * 0.035, 0, 0, 6.283); shape(ctx, '#B59A44', '#7A6A2A', 1.2); ctx.strokeStyle = rgba('#6A5A22', 0.8); ctx.lineWidth = 0.8; for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(k * r * 0.03, -r * 0.03); ctx.lineTo(k * r * 0.03, r * 0.03); ctx.stroke(); } circ(ctx, 0, 0, r * 0.012, '#6A5A22'); }
    ctx.restore(); } }
// zwevende algen (fytoplankton) in water (zoomcirkel), groen
function mb3_plankton(ctx, cx, cy, r, t = 0) { ctx.fillStyle = '#1F4E66'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 14; i++) { const g = wander(i + 30, t, r * 0.12, 0.25); const px = cx - r * 0.8 + hash(i * 2.9 + 4) * 1.6 * r + g.x, py = cy - r * 0.8 + hash(i * 4.3 + 5) * 1.6 * r + g.y; ctx.save(); ctx.translate(px, py); ctx.rotate(hash(i) * 3 + t * 0.1);
    if (i % 3 === 0) { for (let k = 0; k < 4; k++) { roundRect(ctx, k * r * 0.07 - r * 0.14, -r * 0.03, r * 0.065, r * 0.06, 3); shape(ctx, '#7FC48F', '#4E8A5E', 1); } } // kettinkje kiezelwieren
    else if (i % 3 === 1) { circ(ctx, 0, 0, r * 0.05, '#7FC48F', '#4E8A5E', 1.2); circ(ctx, r * 0.015, -r * 0.01, r * 0.018, '#B8E2C0'); }
    else { ctx.beginPath(); ctx.ellipse(0, 0, r * 0.06, r * 0.04, 0, 0, 6.283); shape(ctx, '#9BCF8A', '#5E9A56', 1.2); ctx.strokeStyle = '#5E9A56'; ctx.beginPath(); ctx.moveTo(0, -r * 0.04); ctx.lineTo(0, r * 0.04); ctx.stroke(); }
    ctx.restore(); } }

// =====================================================================
// 4. EMMERPROEF, STOPWATCH, MAATBEKER, WEEGSCHAAL, BALANS
// =====================================================================
// witte emmer van opzij, iets van boven (wateroppervlak zichtbaar). x = midden, y = bodem, w = breedte bovenrand.
// o.groen 0..1 (groenig → helder), o.n = aantal mosselen erin
function mb3_emmer(ctx, x, y, w, o = {}) { const { a = 1, groen = 1, n = 0, t = 0, lepel = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const h = w * 0.92, wb = w * 0.78, ey = w * 0.16;
  ctx.strokeStyle = '#B8BEC6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, y - h, w * 0.52, h * 0.55, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); // hengsel
  ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - wb / 2, y); ctx.quadraticCurveTo(x, y + ey * 0.6, x + wb / 2, y); ctx.lineTo(x + w / 2, y - h); ctx.closePath(); shape(ctx, '#E8EAEC', '#9AA3B2', 2);
  ctx.fillStyle = rgba('#C8CDD4', 0.6); ctx.fillRect(x + w * 0.22, y - h + 10, w * 0.12, h - 20);
  ctx.beginPath(); ctx.ellipse(x, y - h, w / 2, ey, 0, 0, 6.283); shape(ctx, '#D8DCE0', '#9AA3B2', 2);
  const wk = mb3_mix('#7FA84A', '#9CC3CF', 1 - groen); ctx.beginPath(); ctx.ellipse(x, y - h + 6, w / 2 - 8, ey - 5, 0, 0, 6.283); shape(ctx, wk, null);
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y - h + 6, w / 2 - 8, ey - 5, 0, 0, 6.283); ctx.clip();
  for (let i = 0; i < n; i++) mb3_mossel(ctx, x - w * 0.36 + hash(i * 2.1 + 7) * w * 0.72, y - h + 6 - ey * 0.5 + hash(i * 3.7 + 1) * ey, w / 70, { rot: hash(i * 5.3) * 6, a: 0.45 + 0.4 * (1 - groen) });
  for (let i = 0; i < 14; i++) { const g = wander(i, t, 4, 0.4); circ(ctx, x - w * 0.38 + hash(i * 1.3 + 2) * w * 0.76 + g.x, y - h + 6 - ey * 0.6 + hash(i * 4.1) * ey * 1.2 + g.y, 3, rgba('#4E7A2E', 0.8 * groen)); }
  ctx.restore(); ctx.restore(); }
// stopwatch zonder getal: wijzer loopt
function mb3_stopwatch(ctx, x, y, r, tt, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - r * 0.16, y - r * 1.32, r * 0.32, r * 0.28, 4); shape(ctx, '#AFB6C0', '#6E7480', 1.5); circ(ctx, x, y, r, '#C9CED6', '#6E7480', 2); circ(ctx, x, y, r * 0.84, '#F2F2EE', '#9AA3B2', 1.5);
  ctx.strokeStyle = '#5A6478'; for (let i = 0; i < 12; i++) { const an = i * Math.PI / 6; ctx.lineWidth = i % 3 ? 1.5 : 3; ctx.beginPath(); ctx.moveTo(x + Math.sin(an) * r * 0.66, y - Math.cos(an) * r * 0.66); ctx.lineTo(x + Math.sin(an) * r * 0.78, y - Math.cos(an) * r * 0.78); ctx.stroke(); }
  const an = tt * 0.8; ctx.strokeStyle = C.koraal; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(an) * r * 0.7, y - Math.cos(an) * r * 0.7); ctx.stroke(); circ(ctx, x, y, 4, C.koraal); ctx.restore(); }
// maatbeker: x = midden, y = bodem, h = hoogte, vul 0..1, o.kl vloeistof, o.label bij het vulpeil
function mb3_maatbeker(ctx, x, y, w, h, vul, o = {}) { const { a = 1, kl = C.teal, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const v = clamp(vul, 0, 1); if (v > 0.005) { roundRect(ctx, x - w / 2 + 4, y - h * v * 0.9, w - 8, h * v * 0.9 - 4, 6); shape(ctx, rgba(kl, 0.55), null); }
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - 8); ctx.quadraticCurveTo(x - w / 2, y, x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.quadraticCurveTo(x + w / 2, y, x + w / 2, y - 8); ctx.lineTo(x + w / 2, y - h); ctx.lineTo(x + w / 2 + 14, y - h - 12); ctx.stroke();
  ctx.lineWidth = 2; for (let i = 1; i <= 6; i++) { const yy = y - h * 0.9 * i / 6; ctx.beginPath(); ctx.moveTo(x - w / 2, yy); ctx.lineTo(x - w / 2 + (i % 2 ? 14 : 24), yy); ctx.stroke(); }
  if (label) text(ctx, label, x - w / 2 - 16, y - h * 0.9 * v + 10, fTekst(34, 800), C.goud, 'right'); ctx.restore(); }
// vogelweegschaal (keukenweegschaal, schaal zonder getallen), kanoet erop
function mb3_vogelWeeg(ctx, x, y, s, o = {}) { const { a = 1, t = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 26 * s, y - 9 * s, 52 * s, 9 * s, 2 * s); shape(ctx, '#D8DCE0', '#8A93A2', 2); circ(ctx, x, y - 4.5 * s, 3.4 * s, '#F2F2EE', '#8A93A2', 1.5);
  ctx.strokeStyle = C.koraal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 4.5 * s); ctx.lineTo(x + 2.4 * s * Math.sin(0.6 + Math.sin(t) * 0.03), y - 4.5 * s - 2.4 * s * Math.cos(0.6)); ctx.stroke();
  roundRect(ctx, x - 22 * s, y - 11 * s, 44 * s, 2 * s, 1 * s); shape(ctx, '#AFB6C0', null);
  mb3_vogel(ctx, 'kanoet', x - 2 * s, y - 11 * s, s, { kijk: 1, pik: 0.08 * Math.sin(t * 0.7) }); ctx.restore(); }
// balans met twee schalen; links/rechts = functies (cx, cy) die iets op de schaal tekenen; kant > 0 = rechts lager
function mb3_balans(ctx, x, y, w, kant, links, rechts, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const an = clamp(kant, -1, 1) * 0.12;
  roundRect(ctx, x - 70, y + 230, 140, 20, 6); shape(ctx, '#8A93A2', null); ctx.fillStyle = '#AFB6C0'; ctx.fillRect(x - 6, y, 12, 232); circ(ctx, x, y, 12, '#C9CED6', '#6E7480', 2);
  const ex = Math.cos(an) * w / 2, ey = Math.sin(an) * w / 2; ctx.strokeStyle = '#C9CED6'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke();
  for (const [px, py, fn] of [[x - ex, y - ey, links], [x + ex, y + ey, rechts]]) { ctx.strokeStyle = '#8A93A2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 70, py + 120); ctx.moveTo(px, py); ctx.lineTo(px + 70, py + 120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 90, py + 120); ctx.quadraticCurveTo(px, py + 170, px + 90, py + 120); ctx.closePath(); shape(ctx, '#C9CED6', '#6E7480', 2); if (fn) fn(px, py + 112); }
  ctx.restore(); }
// spiermaag (doorsnede in een zoomcirkel): dikke spierwand, harde binnenlaag, kokkel die kraakt. o.groot 0..1, o.kraak 0..1
function mb3_spiermaag(ctx, cx, cy, r, o = {}) { const { groot = 0, kraak = 0, kokkel = 1 } = o; const f = 1 + 0.32 * clamp(groot, 0, 1);
  ctx.fillStyle = '#2A1E22'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.save(); ctx.translate(cx, cy); ctx.scale(f, f);
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.62, r * 0.5, 0, 0, 6.283); shape(ctx, '#9A3E34', '#C2604E', 3);
  ctx.strokeStyle = rgba('#C2604E', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 10; i++) { const an = i * 0.628; ctx.beginPath(); ctx.ellipse(0, 0, r * (0.36 + 0.02 * (i % 3)), r * 0.28, an * 0.05, an, an + 0.5); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.3, r * 0.2, 0, 0, 6.283); shape(ctx, '#4A2E24', '#D8BC6A', 4); // lumen met harde (gele) binnenlaag
  ctx.restore();
  if (kokkel > 0.01) { mb3_kokkel(ctx, cx, cy, r * 0.13 * f, { L: 1.5, a: kokkel });
    if (kraak > 0.01) { ctx.save(); ctx.globalAlpha *= kraak; ctx.strokeStyle = '#2A1E14'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx - r * 0.1, cy - r * 0.08); ctx.lineTo(cx, cy + r * 0.02); ctx.lineTo(cx - r * 0.04, cy + r * 0.09); ctx.moveTo(cx, cy + r * 0.02); ctx.lineTo(cx + r * 0.1, cy - r * 0.02); ctx.stroke(); ctx.restore(); } } }
// meter (draagkracht): halve boog groen → koraal, wijzer op v (0..1), grens bij g met gestippelde streep en vraagteken
function mb3_meter(ctx, cx, cy, r, v, o = {}) { const { a = 1, grens = 0.75, vraag = 1, label = '' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const A0 = Math.PI, A1 = 2 * Math.PI, ag = A0 + (A1 - A0) * grens;
  ctx.lineWidth = r * 0.18; ctx.lineCap = 'butt'; ctx.strokeStyle = rgba(C.groen, 0.75); ctx.beginPath(); ctx.arc(cx, cy, r, A0, ag - 0.12); ctx.stroke();
  ctx.strokeStyle = rgba(C.koraal, 0.85); ctx.beginPath(); ctx.arc(cx, cy, r, ag + 0.12, A1); ctx.stroke();
  ctx.save(); ctx.setLineDash([8, 7]); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + Math.cos(ag) * r * 0.62, cy + Math.sin(ag) * r * 0.62); ctx.lineTo(cx + Math.cos(ag) * r * 1.25, cy + Math.sin(ag) * r * 1.25); ctx.stroke(); ctx.restore();
  if (vraag > 0.01) { ctx.save(); ctx.globalAlpha *= vraag; text(ctx, '?', cx + Math.cos(ag) * r * 1.42, cy + Math.sin(ag) * r * 1.42 + 22, fTitel(64), C.goud, 'center'); ctx.restore(); }
  if (v == null) { circ(ctx, cx, cy, 12, C.text2); text(ctx, '?', cx, cy - r * 0.3, fTitel(80), C.goud, 'center'); if (label) metaText(ctx, label, cx, cy + 56, C.text2, 'center', 28); ctx.restore(); return; }
  const av = A0 + (A1 - A0) * clamp(v, 0, 1); ctx.strokeStyle = C.text; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(av) * r * 0.82, cy + Math.sin(av) * r * 0.82); ctx.stroke(); circ(ctx, cx, cy, 12, C.text);
  if (label) metaText(ctx, label, cx, cy + 56, C.text2, 'center', 28); ctx.restore(); }

// =====================================================================
// 5. KWEEK: kotter, mosselzaad, invanginstallatie, zak voer, tablet, schep
// =====================================================================
// mosselkotter van opzij (± 40 m), x = midden, y = waterlijn, s = px per m. o.figuur(dekX, dekY) tekent iemand op het dek (vóór de verschansing).
function mb3_kotter(ctx, x, y, s, o = {}) { const { a = 1, zaai = 0, t = 0, figuur = null, geul = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const L = 40 * s;
  if (geul > 0.01) mb3_geul(ctx, x - L * 0.15, y + 1.2 * s, L * 2.2, 7 * s, geul);
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(x + L * 0.22, y - 9.5 * s, 1.0 * s, 9 * s); ctx.fillRect(x - L * 0.18, y - 8 * s, 0.8 * s, 7 * s); // masten
  ctx.strokeStyle = '#AFB6C0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + L * 0.22, y - 9 * s); ctx.lineTo(x - L * 0.05, y - 3.6 * s); ctx.moveTo(x - L * 0.18, y - 7.6 * s); ctx.lineTo(x - L * 0.42, y - 3 * s); ctx.stroke();
  roundRect(ctx, x + L * 0.12, y - 6.4 * s, L * 0.2, 4.4 * s, 4); shape(ctx, '#E6E2D6', '#A8A498', 1.5); ctx.fillStyle = '#2E3A4E'; for (let i = 0; i < 3; i++) ctx.fillRect(x + L * 0.14 + i * L * 0.06, y - 5.6 * s, L * 0.04, 1.4 * s); // stuurhut
  if (figuur) figuur(x - L * 0.36, y - 2.0 * s); // bij de zaaigoot aan de achtersteven
  ctx.beginPath(); ctx.moveTo(x - L * 0.5, y - 2.4 * s); ctx.lineTo(x + L * 0.42, y - 2.4 * s); ctx.lineTo(x + L * 0.52, y - 3.4 * s); ctx.lineTo(x + L * 0.46, y + 1.2 * s); ctx.lineTo(x - L * 0.46, y + 1.2 * s); ctx.closePath(); shape(ctx, '#2E4A5E', '#1E3242', 1.5); // romp
  ctx.fillStyle = '#B84A3A'; ctx.fillRect(x - L * 0.46, y + 0.2 * s, L * 0.92, 1.0 * s); ctx.fillStyle = '#E6E2D6'; ctx.fillRect(x - L * 0.5, y - 2.4 * s, L * 0.94, 0.45 * s);
  if (zaai > 0.01) { ctx.save(); ctx.globalAlpha *= zaai; ctx.fillStyle = '#3A4058'; for (let i = 0; i < 26; i++) { const u = ((t * 0.5 + i / 26) % 1); const px = x - L * 0.44 - u * 2.2 * s + Math.sin(i) * 0.4 * s, py = y - 2 * s + u * 6 * s; circ(ctx, px, py, 2.2, '#2A2F44'); } ctx.restore(); }
  ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - L * 0.6, y + 1.4 * s); ctx.lineTo(x + L * 0.6, y + 1.4 * s); ctx.stroke();
  ctx.restore(); }
// geul: teal waterbaan door de drooggevallen plaat (x = midden, y = midden, w, h)
function mb3_geul(ctx, x, y, w, h, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); mb3_pad(ctx, [[x - w / 2, y + h * 0.1], [x - w * 0.25, y - h * 0.45], [x + w * 0.2, y - h * 0.5], [x + w / 2, y - h * 0.1], [x + w * 0.3, y + h * 0.5], [x - w * 0.2, y + h * 0.45]]);
  shape(ctx, rgba(MB3.zee, 0.95), rgba(C.teal, 0.8), 2); ctx.restore(); }
// naam bij een onderdeel (zoals naamBij), maar de metaregel op 28 px en altijd in een donkere pil (C5)
function naam28(ctx, name, meta, x, y, a = 1, kl = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); let w = ctx.measureText(name).width; ctx.font = fMeta(28); ctx.letterSpacing = '3px'; if (meta) w = Math.max(w, ctx.measureText(meta.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width); ctx.letterSpacing = '0px';
  const h = meta ? 92 : 56; roundRect(ctx, x - w / 2 - 18, y - 42, w + 36, h, 14); shape(ctx, rgba('#0D1420', 0.85), null); text(ctx, name, x, y, fTekst(36, 600), kl, 'center'); if (meta) metaText(ctx, meta, x, y + 36, C.grain, 'center', 28); ctx.restore(); }
// Joost aan de reling bij de zaaigoot (close-up in een zoomcirkel): cx,cy = midden van de cirkel, r = straal, t
function mb3_zaaiCloseup(ctx, cx, cy, r, t) { ctx.fillStyle = '#2B3E58'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.fillStyle = rgba(MB3.zee, 0.95); ctx.fillRect(cx - r, cy + r * 0.45, 2 * r, r);
  persoon(ctx, 'joost', cx - r * 0.25, cy + r * 1.2, r * 1.55, { t, kijk: 1, pose: 'vasthouden', uit: 'neutraal' });
  ctx.fillStyle = '#2E4A5E'; ctx.fillRect(cx - r, cy + r * 0.2, r * 1.2, r); ctx.fillStyle = '#E6E2D6'; ctx.fillRect(cx - r, cy + r * 0.16, r * 1.2, r * 0.07); // romp en reling vóór zijn benen
  ctx.save(); ctx.translate(cx + r * 0.08, cy + r * 0.12); ctx.rotate(0.45); roundRect(ctx, 0, -r * 0.06, r * 0.62, r * 0.12, 4); shape(ctx, '#AFB6C0', '#6E7480', 2); ctx.restore(); // zaaigoot
  for (let i = 0; i < 22; i++) { const u = ((t * 0.7 + i / 22) % 1); const px = cx + r * 0.62 + u * r * 0.15 + Math.sin(i * 2.1) * r * 0.05, py = cy + r * 0.4 + u * r * 0.5; circ(ctx, px, py, r * 0.022, '#2A2F44'); } }
// invanginstallatie (MZI): drijvers met een draaglijn aan het oppervlak, touwen eronder waar mosselzaad zich op vastzet; ankerlijnen aan de uiteinden.
// x = links, yW = waterlijn, w = breedte, o.zaad 0..1, o.diep = touwlengte in px
function mb3_mzi(ctx, x, yW, w, o = {}) { const { a = 1, zaad = 0.6, diep = 240, t = 0, n = 7 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = '#8A93A2'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, yW + 4); ctx.lineTo(x - 70, yW + diep + 70); ctx.moveTo(x + w, yW + 4); ctx.lineTo(x + w + 70, yW + diep + 70); ctx.stroke();
  for (const ax of [x - 70, x + w + 70]) { roundRect(ctx, ax - 16, yW + diep + 62, 32, 18, 4); shape(ctx, '#5A6478', null); }
  ctx.strokeStyle = '#D8D2C4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, yW + 6); ctx.lineTo(x + w, yW + 6); ctx.stroke(); // draaglijn
  for (let i = 0; i < n; i++) { const xx = x + 30 + i * (w - 60) / (n - 1), sw = Math.sin(t * 0.8 + i) * 6;
    ctx.strokeStyle = '#C8B48A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, yW + 6); ctx.quadraticCurveTo(xx + sw, yW + diep / 2, xx + sw * 1.4, yW + diep); ctx.stroke();
    for (let k = 0; k < Math.round(16 * zaad); k++) { const u = 0.08 + 0.9 * hash(i * 13 + k * 3.1); const px = xx + sw * u * 1.4 + (hash(k * 7 + i) - 0.5) * 12, py = yW + 6 + u * (diep - 6); mb3_mossel(ctx, px, py, 4.2, { L: 1.8, rot: 1.2 + hash(k + i) * 1.4 }); } }
  for (let i = 0; i < n + 1; i++) { const xx = x + i * w / n; ctx.beginPath(); ctx.ellipse(xx, yW, 22, 15, 0, 0, 6.283); shape(ctx, '#E8B730', '#B08A20', 2); }
  ctx.restore(); }
// zak voer met vraagteken
function mb3_zak(ctx, x, y, s, o = {}) { const { a = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-66, -150); ctx.quadraticCurveTo(-40, -170, -20, -160); ctx.lineTo(20, -164); ctx.quadraticCurveTo(48, -172, 64, -150); ctx.lineTo(58, 0); ctx.closePath(); shape(ctx, '#C8B48A', '#8A7A5A', 3);
  roundRect(ctx, -40, -110, 80, 60, 8); shape(ctx, '#E6DCC4', '#8A7A5A', 2); text(ctx, 'VOER', 0, -70, fTekst(30, 800), '#6A5A3A', 'center');
  for (let i = 0; i < 6; i++) circ(ctx, -50 + i * 18 + (i % 2) * 6, 8 + (i % 3) * 5, 6, '#A8936A'); ctx.restore(); }
function mb3_tablet(ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35); roundRect(ctx, -30 * s, -42 * s, 60 * s, 84 * s, 6 * s); shape(ctx, '#2A2F3E', '#5A6478', 2); roundRect(ctx, -25 * s, -36 * s, 50 * s, 72 * s, 3 * s); shape(ctx, '#3E6A7A', null);
  ctx.strokeStyle = C.groen; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-20 * s, 20 * s); ctx.lineTo(-6 * s, 4 * s); ctx.lineTo(6 * s, 10 * s); ctx.lineTo(20 * s, -14 * s); ctx.stroke(); ctx.restore(); }
// schep (steel + blad), voor in de hand: (c, hx, hy)
function mb3_schep(ctx, hx, hy, s = 1, slik = 0) { ctx.save(); ctx.translate(hx, hy); ctx.rotate(0.12); ctx.fillStyle = '#9A7A52'; ctx.fillRect(-4 * s, -80 * s, 8 * s, 220 * s); roundRect(ctx, -16 * s, -92 * s, 32 * s, 14 * s, 6 * s); shape(ctx, '#2A2F3E', null);
  ctx.beginPath(); ctx.moveTo(-22 * s, 136 * s); ctx.lineTo(22 * s, 136 * s); ctx.lineTo(18 * s, 196 * s); ctx.quadraticCurveTo(0, 212 * s, -18 * s, 196 * s); ctx.closePath(); shape(ctx, '#AFB6C0', '#6E7480', 2);
  if (slik > 0.01) { ctx.save(); ctx.globalAlpha *= slik; ctx.beginPath(); ctx.ellipse(0, 150 * s, 22 * s, 14 * s, 0, Math.PI, 0); shape(ctx, MB3.slik, null); ctx.restore(); } ctx.restore(); }
// lepel van de algenemmer naar een eter (pijl in groen, met een lepeltje)
function mb3_lepel(ctx, x1, y1, x2, y2, a = 1) { if (a <= 0.01) return; pijl(ctx, x1, y1, x2, y2, C.groen, a, 4, 16); ctx.save(); ctx.globalAlpha *= a; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, an = Math.atan2(y2 - y1, x2 - x1); ctx.translate(mx, my); ctx.rotate(an);
  ctx.fillStyle = '#C9CED6'; ctx.fillRect(-26, -3, 30, 6); ctx.beginPath(); ctx.ellipse(12, 0, 14, 9, 0, 0, 6.283); shape(ctx, '#C9CED6', '#8A93A2', 1.5); circ(ctx, 12, 0, 5, MB3.plankton); ctx.restore(); }

// =====================================================================
// 6. PIRAMIDE VAN ENERGIE
// =====================================================================
const MB3_TREDE = [{ naam: 'ALGEN', kl: C.groen, w: 1300 }, { naam: 'KOKKELS', kl: C.oker, w: 560 }, { naam: 'KOKKELETERS', kl: C.goud, w: 300 }];
// cx = midden, yb = onderkant, o.a = [a0,a1,a2], o.kj = [tekst0..2], o.kjA = [alpha], o.hl = index goud omrand
function mb3_piramide(ctx, cx, yb, o = {}) { const { a = [1, 1, 1], kj = ['', '', ''], kjA = [0, 0, 0], h = 118, hl = -1 } = o;
  MB3_TREDE.forEach((T, i) => { if (a[i] <= 0.01) return; ctx.save(); ctx.globalAlpha *= a[i]; const y = yb - (i + 1) * h, x = cx - T.w / 2;
    roundRect(ctx, x, y, T.w, h - 10, 12); shape(ctx, rgba(T.kl, 0.3), hl === i ? C.goud : T.kl, hl === i ? 4 : 2);
    if (i < 2) { text(ctx, T.naam, x + 30, y + h / 2 + 8, fTekst(36, 800), T.kl, 'left'); laag(ctx, kjA[i], () => text(ctx, kj[i], x + T.w - 30, y + h / 2 + 10, fTekst(40, 800), C.text, 'right')); }
    else { text(ctx, T.naam, cx, y - 16, fTekst(30, 800), T.kl, 'center'); laag(ctx, kjA[i], () => text(ctx, kj[i], cx, y + h / 2 + 10, fTekst(40, 800), C.text, 'center')); }
    ctx.restore(); }); }
