// =====================================================================================
// INJECTIESPUIT met prik in de bovenarm (deltaspier): spuit met volume (drie vlakke tinten) en, met o.arm, een
// doorsnede van de bovenarm onder de prikplek, op dezelfde ware maat.
// Recept (mm): CDC 'IM injection adult': naald 25–38 mm, 22–25 G, loodrecht (90°) in het dikste deel van de
//  deltaspier, ± 5 cm onder het schouderdak (acromion). Hier 25 mm, 23 G (0,6 mm, blauwe hub, ISO 6009).
//  Spuit 3 ml: cilinder ± 10 mm dik, ± 50 mm lang, schaal per 0,1 ml (1 ml ± 16 mm); zuiger met rubber stop.
//  Lagen onder de prikplek (≈, volwassene van gemiddeld gewicht): opperhuid + lederhuid ± 2 mm, onderhuids vet
//  ± 6–10 mm (hier 8), deltaspier ± 15–20 mm met vezels in de lengte, dan het opperarmbeen. De naald gaat door
//  huid en vet tot in de spier; het vaccin vormt een depot tússen de spiervezels (niet in het vet).
//  Standen: o.prik 0 (naald boven de huid) … 1 (naald op 22 mm diepte), o.druk 0..1 (zuiger in, depot groeit).
//  Rust (Kamiel 28 okt 2026, keuze B: 'wel erg druk'): weinig vetkwabjes en spiervezels, zacht; de lagen dragen het beeld.
//  In een scène staat de maat-hand op ruime afstand van de weefselblokken, met de spuit náást (niet op) de hand.
//  Bekende fouten: naald schuin in de arm; depot in het vet; spier dunner dan de vetlaag; prik in de elleboog;
//  hand of maatspuit tegen de doorsnede aan.
// x, y: met o.arm = prikplek op de huid; zonder o.arm = naaldpunt. s = px per mm. o.rot (alleen zonder arm;
// 0 = naald naar rechts). o.vul (0..1 van 3 ml; standaard 0,17 = 0,5 ml), o.a, o.hl.
// Geeft { punt, cilinder, duim, huid, spier, depot } terug.
// =====================================================================================
function injectiespuit(ctx, x, y, s, o = {}) {
  const { a = 1, arm = false, prik = 0, druk = 0, vul = 0.17, kleur = C.teal, hl = 0, t = 0 } = o;
  const rot = arm ? Math.PI / 2 : (o.rot || 0), diep = arm ? clamp(prik, 0, 1) * 22 : 0;
  const tx = x + Math.cos(rot) * diep * s, ty = y + Math.sin(rot) * diep * s; // naaldpunt
  const co = Math.cos(rot), si = Math.sin(rot); const P = (px, py) => [tx + (px * co - py * si) * s, ty + (px * si + py * co) * s];
  const ml = 16, rest = clamp(vul * (1 - (arm ? clamp(druk, 0, 1) : 0)), 0, 1), xC0 = -38, xC1 = xC0 - 50, xStop = xC0 - 3 - rest * 3 * ml;
  const ret = { punt: [tx, ty], cilinder: P((xC0 + xC1) / 2, 0), duim: P(xStop - 62, 0), huid: [x, y], spier: [x + 30 * s, y + 20 * s], depot: [tx, ty] };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const lw = Math.max(1, s * 0.12);
  if (arm) { // doorsnede bovenarm: lagen evenwijdig aan de huid, licht gebogen (arm is rond)
    const B = 55, bocht = (xx) => (xx * xx) / (2 * 140); // straal ± 14 cm-boog over de breedte
    const laag = (d0, d1, fill, clip) => { ctx.beginPath(); for (let k = 0; k <= 40; k++) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d0 + bocht(xx)) * s); } for (let k = 40; k >= 0; k--) { const xx = -B + 2 * B * k / 40; ctx.lineTo(x + xx * s, y + (d1 + bocht(xx)) * s); } ctx.closePath(); if (clip) { ctx.clip(); return; } ctx.fillStyle = fill; ctx.fill(); };
    laag(0, 2, BIO.huid); laag(0, 0.6, BIO.huidS); laag(2, 10, BIO.vet); laag(10, 30, BIO.spier); laag(30, 46, BIO.bot);
    // vetkwabjes en spiervezels (rustig, alleen bij genoeg pixels)
    if (s > 3) { ctx.save(); laag(-1, 46, null, true); ctx.strokeStyle = rgba(BIO.vetS, 0.35); ctx.lineWidth = 1; for (let i = 0; i < 7; i++) { const xx = -B + 9 + i * 15.5 + hash(i) * 3, yy = 6 + hash(i + 9) * 1.5; ctx.beginPath(); ctx.ellipse(x + xx * s, y + (yy + bocht(xx)) * s, 4.2 * s, 2.6 * s, 0, 0, 6.283); ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.spierL, 0.3); for (let j = 0; j < 4; j++) { const d = 14 + j * 4.2; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (d + bocht(xx) + Math.sin(xx * 0.09 + j) * 0.5) * s); } ctx.stroke(); }
      ctx.strokeStyle = rgba(BIO.botS, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const xx = -B + 2 * B * k / 30; ctx.lineTo(x + xx * s, y + (31.5 + bocht(xx)) * s); } ctx.stroke(); ctx.restore(); }
    // depot tussen de spiervezels
    const dep = clamp(druk, 0, 1) * clamp(prik * 2 - 1, 0, 1); if (dep > 0.01) { const r = Math.sqrt(dep) * 6; ctx.save(); ctx.globalAlpha *= 0.75; ctx.fillStyle = kleur; ctx.beginPath(); ctx.ellipse(tx, ty - 1 * s, r * 1.6 * s, r * 0.8 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  } // de spuit zelf blijft altijd boven de huid (hub op 25 mm, naald hooguit 22 mm diep)
  ctx.translate(tx, ty); ctx.rotate(rot); ctx.scale(s, s);
  const L = C.er, wit = '#DDE4EC', mid = '#A9B6C6', don = '#6F7E93';
  const band = (x0, x1, h, cols) => { const n = cols.length; cols.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x0, -h + 2 * h * i / n, x1 - x0, 2 * h / n + 0.05); }); };
  // cilinder (glasheldere kunststof: lichte rand, donkere zijde)
  ctx.save(); ctx.beginPath(); ctx.rect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4); ctx.clip();
  ctx.fillStyle = rgba(L, 0.12); ctx.fillRect(xC1, -5.2, 60, 10.4);
  if (rest > 0.003) band(xStop, xC0, 4.6, [lighten(kleur, 0.35), kleur, kleur, kleur, lighten(kleur, -0.0)].map((c, i) => i === 4 ? '#3E7FA5' : c));
  ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.fillRect(xC1, -4.4, 60, 1.0); ctx.restore();
  ctx.strokeStyle = L; ctx.lineWidth = lw / s; ctx.strokeRect(xC1, -5.2, xC0 - 2.5 - xC1, 10.4);
  ctx.beginPath(); ctx.moveTo(xC0 - 2.5, -5.2); ctx.lineTo(xC0, -1.4); ctx.lineTo(xC0, 1.4); ctx.lineTo(xC0 - 2.5, 5.2); ctx.fillStyle = rgba(L, 0.2); ctx.fill(); ctx.stroke();
  if (s > 3) { ctx.strokeStyle = rgba(don, 0.9); ctx.lineWidth = 0.18; for (let k = 0; k <= 30; k++) { const xx = xC0 - 3 - k * ml / 10, lang = k % 5 === 0 ? 3 : 1.6; ctx.beginPath(); ctx.moveTo(xx, -5.2); ctx.lineTo(xx, -5.2 + lang); ctx.stroke(); } }
  // rubber stop + stang + duimplaat
  band(xStop - 6, xStop, 4.5, ['#5A606C', '#3B3F48', '#3B3F48', '#2C2F36']);
  band(xStop - 62 + 1.5, xStop - 6, 3.6, [wit, mid, mid, don]);
  band(xStop - 62.5, xStop - 60.3, 6.5, [wit, mid, mid, don]);
  // vingersteun
  band(xC1 - 2, xC1, 11, [wit, mid, mid, mid, don]);
  // luer + hub (blauw, 23 G)
  band(xC0, -34, 1.4, [wit, mid, don]); band(-34, -32, 3.3, ['#6B9DC2', '#4E86B0', '#3E6F95']); band(-32, -25, 2.6, ['#6B9DC2', '#4E86B0', '#4E86B0', '#3E6F95']);
  // naald (ook het deel onder de huid)
  ctx.fillStyle = '#C8D0DA'; ctx.beginPath(); ctx.moveTo(-25, -0.3); ctx.lineTo(-1.6, -0.3); ctx.lineTo(0, 0.3); ctx.lineTo(-25, 0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba('#FFFFFF', 0.55); ctx.fillRect(-25, -0.3, 23, 0.15);
  if (hl > 0.01) { ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / s; ctx.strokeRect(xC1 - 2, -11.5, -xC1 + 2, 23); }
  ctx.restore(); return ret;
}
