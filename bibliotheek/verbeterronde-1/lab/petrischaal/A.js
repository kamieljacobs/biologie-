// =====================================================================================
// PETRISCHAAL met agar, van boven gezien: gazon of losse kolonies die groeien, antibioticumschijfjes met remmingszone.
//  Recept: ASM-protocol 'Kirby-Bauer disk diffusion' (Hudzicki 2009/2016): petrischaal van 100 mm (hier 90 mm, de
//  gangbare maat in Nederland, ≈), agar 4 mm dik; bacteriën als gelijkmatig gazon over de hele plaat; papieren
//  schijfjes van 6 mm met antibioticum, minstens 24 mm uit elkaar; na ± 24 uur bij 37 °C een heldere remmingszone
//  rond een schijfje waar het middel werkt (diameter in mm, vergeleken met een tabel); groeit het gazon tot tegen het
//  schijfje, dan is de bacterie resistent (OpenOregon Microbiology lab manual, 'Antibiotic susceptibility testing').
//  Losse kolonies (o.gazon false): ronde, licht glanzende bultjes van 1–5 mm die in de tijd groeien.
//  Kleuren: agar lichtgeel-oker doorschijnend, kolonies crème, schijfjes wit; zones = gewoon agar zonder groei.
//  Bekende fouten: zone die oplicht in plaats van leeg is; schijfjes te groot; zones even groot bij alle middelen;
//  kolonies als felle stippen.
// x, y = midden; s = px per mm. o.groei 0..1, o.gazon (bool), o.schijf (bool), o.a. Geeft { midden, schijfjes, zones } terug.
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
  const { a = 1, schijf = true } = o; const P = (px, py) => [x + px * s, y + py * s];
  const ret = { midden: [x, y], schijfjes: _PS_SCHIJF.map(([zx, zy]) => P(zx, zy)), zones: _PS_SCHIJF.map(([zx, zy, d]) => [...P(zx, zy), d / 2 * s]) }; if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y, 45 * s, 0, 6.283); shape(ctx, rgba(C.er, 0.10), C.er, Math.max(1, 0.5 * s)); // wand van de schaal
  ctx.beginPath(); ctx.arc(x, y, 42.5 * s, 0, 6.283); shape(ctx, '#B9A66E', null); ctx.fillStyle = rgba('#1A2740', 0.35); ctx.fill(); // agar
  _psInhoud(ctx, P, 1, Object.assign({ s }, o));
  ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = Math.max(1, 1.2 * s); ctx.beginPath(); ctx.arc(x, y, 44 * s, 3.6, 4.6); ctx.stroke();
  ctx.restore(); return ret;
}
