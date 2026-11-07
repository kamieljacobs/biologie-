// =====================================================================================
// PETRISCHAAL in drie-kwart-aanzicht met deksel dat opengaat: je ziet de agarlaag (4 mm) aan de rand, kolonies als
// bultjes, schijfjes en remmingszones in perspectief.
//  Recept: ASM-protocol 'Kirby-Bauer disk diffusion' (Hudzicki 2009/2016): petrischaal van 100 mm (hier 90 mm, de
//  gangbare maat in Nederland, ≈), agar 4 mm dik; bacteriën als gelijkmatig gazon over de hele plaat; papieren
//  schijfjes van 6 mm met antibioticum, minstens 24 mm uit elkaar; na ± 24 uur bij 37 °C een heldere remmingszone
//  rond een schijfje waar het middel werkt (diameter in mm, vergeleken met een tabel); groeit het gazon tot tegen het
//  schijfje, dan is de bacterie resistent (OpenOregon Microbiology lab manual, 'Antibiotic susceptibility testing').
//  Losse kolonies (o.gazon false): ronde, licht glanzende bultjes van 1–5 mm die in de tijd groeien.
//  Kleuren: agar lichtgeel-oker doorschijnend, kolonies crème, schijfjes wit; zones = gewoon agar zonder groei.
//  Bekende fouten: zone die oplicht in plaats van leeg is; schijfjes te groot; zones even groot bij alle middelen;
//  kolonies als felle stippen.
//  Schaal 90 × 15 mm, deksel iets groter (± 92 mm, ≈); oogpunt 35° boven de schaal.
// x, y = midden van de bodem; s = px per mm. o.deksel 0 dicht … 1 open (kantelt naar achteren), o.groei, o.gazon,
// o.schijf, o.a. Geeft { midden, schijfjes, zones, deksel } terug.
// =====================================================================================
const _PS_SCHIJF = [[-22, -18, 0], [24, -14, 18], [0, 24, 27]]; // [x, y (mm vanaf het midden), zone-diameter mm; 0 = resistent: groei tot tegen het schijfje]
function _psInhoud(ctx, P, sy, o) { // P(xmm, ymm) → beeld; sy = verkorting in y (1 = bovenaanzicht); tekent gazon/kolonies, schijfjes, zones
  const { groei = 1, gazon = true, schijf = true, t = 0, s = 1 } = o; const r = 42; // agar-straal (mm) in een schaal van 90 mm
  const zones = schijf ? _PS_SCHIJF : [];
  const inZone = (xx, yy) => zones.some(([zx, zy, d]) => Math.hypot(xx - zx, yy - zy) < Math.max(3.3, d / 2));
  if (gazon && groei > 0.01) { // gazon: één rustige, licht matte laag over de hele agar; zones blijven helder agar
    const m = P(0, 0), q1 = P(r - 1.5, 0); ctx.save(); ctx.beginPath(); ctx.ellipse(m[0], m[1], q1[0] - m[0], (q1[0] - m[0]) * sy, 0, 0, 6.283);
    zones.forEach(([zx, zy, d]) => { const q = P(zx, zy), rr = Math.max(3.3, d / 2) * s; ctx.moveTo(q[0] + rr, q[1]); ctx.ellipse(q[0], q[1], rr, rr * sy, 0, 0, 2 * Math.PI, true); });
    ctx.fillStyle = rgba('#E8DAB2', 0.75 * groei); ctx.fill('evenodd'); ctx.clip('evenodd');
    for (let i = 0; i < 160; i++) { const u = hash(i * 2 + 1) * 6.283, rr = Math.sqrt(hash(i * 2 + 2)) * (r - 1.5), q = P(Math.cos(u) * rr, Math.sin(u) * rr); ctx.fillStyle = rgba('#F2E6C4', 0.18 * groei); ctx.beginPath(); ctx.ellipse(q[0], q[1], 2.2 * s, 2.2 * s * sy, 0, 0, 6.283); ctx.fill(); }
    ctx.restore(); }
  if (!gazon) for (let i = 0; i < 26; i++) { const u = hash(i * 3 + 5) * 6.283, rr = Math.sqrt(hash(i * 3 + 6)) * (r - 4), xx = Math.cos(u) * rr, yy = Math.sin(u) * rr; if (inZone(xx, yy)) continue;
    const d = (1.2 + 2.6 * hash(i * 3 + 7)) * clamp(groei * 1.4 - hash(i) * 0.4, 0, 1); if (d < 0.1) continue; const q = P(xx, yy); ctx.fillStyle = hash(i + 40) < 0.8 ? '#E3D3A8' : '#D8B98A'; ctx.beginPath(); ctx.ellipse(q[0], q[1], d * s, d * s * sy, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = rgba('#FFFFFF', 0.3); ctx.beginPath(); ctx.ellipse(q[0] - d * s * 0.3, q[1] - d * s * sy * 0.3, d * s * 0.3, d * s * sy * 0.3, 0, 0, 6.283); ctx.fill(); }
  if (schijf) zones.forEach(([zx, zy, d], i) => { const q = P(zx, zy); if (d > 0 && groei > 0.3) { ctx.strokeStyle = rgba('#E3D3A8', 0.5 * groei); ctx.lineWidth = Math.max(1, 0.4 * s); ctx.beginPath(); ctx.ellipse(q[0], q[1], d / 2 * s, d / 2 * s * sy, 0, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = '#F2F2EE'; ctx.beginPath(); ctx.ellipse(q[0], q[1], 3 * s, 3 * s * sy, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = '#B8C0CC'; ctx.lineWidth = Math.max(0.8, 0.3 * s); ctx.stroke(); });
}
function petrischaal(ctx, x, y, s, o = {}) {
  const { a = 1, deksel = 0 } = o; const sy = Math.sin(35 * Math.PI / 180), cz = Math.cos(35 * Math.PI / 180);
  const P = (px, py, pz = 4) => [x + px * s, y + (py * sy - pz * cz) * s];
  const ret = { midden: P(0, 0), schijfjes: _PS_SCHIJF.map(([zx, zy]) => P(zx, zy)), zones: _PS_SCHIJF.map(([zx, zy, d]) => [...P(zx, zy), d / 2 * s]), deksel: P(0, -40, 40) }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; const lw = Math.max(1, 0.5 * s);
  const ell = (r, z, fill, stroke) => { const q = P(0, 0, z); ctx.beginPath(); ctx.ellipse(q[0], q[1], r * s, r * s * sy, 0, 0, 6.283); shape(ctx, fill, stroke, lw); };
  const wand = (r, z0, z1, fill, stroke) => { const a0 = P(-r, 0, z0), a1 = P(r, 0, z0), b0 = P(-r, 0, z1); ctx.beginPath(); ctx.moveTo(...b0); ctx.lineTo(...a0); ctx.ellipse(x, a0[1], r * s, r * s * sy, 0, Math.PI, 0, true); ctx.lineTo(P(r, 0, z1)[0], P(r, 0, z1)[1]); ctx.ellipse(x, b0[1], r * s, r * s * sy, 0, 0, Math.PI, false); ctx.closePath(); shape(ctx, fill, stroke, lw); };
  // bodem + agar (4 mm, de zijkant zichtbaar) + inhoud
  ell(45, 0, rgba(C.er, 0.08), rgba(C.er, 0.5)); wand(42.5, 0, 4, '#9C8A55', null); ell(42.5, 4, '#B9A66E', null); { const q = P(0, 0, 4); ctx.save(); ctx.beginPath(); ctx.ellipse(q[0], q[1], 42.5 * s, 42.5 * s * sy, 0, 0, 6.283); ctx.fillStyle = rgba('#1A2740', 0.30); ctx.fill(); ctx.clip(); _psInhoud(ctx, (px, py) => P(px, py, 4), sy, Object.assign({ s }, o)); ctx.restore(); }
  wand(45, 0, 15, rgba(C.er, 0.10), rgba(C.er, 0.7)); ell(45, 15, null, rgba(C.er, 0.7));
  // deksel: kantelt om de achterrand
  const ph = clamp(deksel, 0, 1) * 1.35; ctx.save(); ctx.globalAlpha *= 0.9; const pts = []; for (let k = 0; k <= 32; k++) { const u = k / 32 * 6.283, X = Math.cos(u) * 46.5, Yr = Math.sin(u) * 46.5 + 46.5; const Y = -46.5 + Yr * Math.cos(ph), Z = 17 + Yr * Math.sin(ph); pts.push(P(X, Y, Z)); }
  ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.closePath(); shape(ctx, rgba(C.er, 0.10), rgba(C.er, 0.8), lw); ctx.restore();
  ctx.strokeStyle = rgba('#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, 1.2 * s); const g = P(-30, -20, 15); ctx.beginPath(); ctx.ellipse(g[0], g[1], 8 * s, 2 * s, -0.3, 0, 6.283); ctx.stroke();
  ctx.restore(); return ret;
}
