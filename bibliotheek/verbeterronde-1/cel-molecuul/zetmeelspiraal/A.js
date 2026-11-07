// ZETMEEL — variant A 'schroef met voor- en achterkant' (27 okt 2026).
// Recept (Berg, Biochemistry h. 11; WOU Chemistry 'Carbohydrates part 4'): amylose = onvertakte keten van
// glucoseringen (α-1,4) die zich tot een spiraal windt, ± 6 glucose per winding. In 2D leest de spiraal als
// schroef als de achterste helft van elke winding duidelijk kleiner, donkerder en met dunnere bindingen
// getekend wordt dan de voorste helft (diepte zonder schaduw of verloop). Bij vertering wikkelt de keten af
// (open) en knippen enzymen hem in losse glucose (los). Oker = voedsel (C1).
// Bekende fouten: een rechte rij zeshoeken (dat is eerder cellulose); een zigzag zonder voor/achter.
// Aanroep zoals voorheen: zetmeelSpiraal(ctx, x, y, n, r, {a, angle, open, los, t, fill, spreid}) → posities.
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  const donker = _mixHex(fill, '#1A2740', 0.5), rand = _mixHex(fill, '#FFFFFF', 0.35);
  // doorlopende schroeflijn (de keten): achterste helft dun en donker, voorste helft dik en licht
  const sp = 1 - Math.max(open, los); const gids = (voor) => { if (sp <= 0.5) return; ctx.save(); ctx.globalAlpha *= sp; ctx.lineCap = 'round'; const N = (n - 1) * 10; let open2 = false;
    for (let j = 0; j <= N; j++) { const i = j / 10, ph = i / per * 6.283, hz = Math.cos(ph); const px = lerp(i * pas + hz * R * 0.62, i * r * 2.3, open), py = lerp(Math.sin(ph) * R, Math.sin(i * 0.8) * r * 0.3, open);
      if ((hz > 0) !== voor) { if (open2) { ctx.stroke(); open2 = false; } continue; }
      if (!open2) { ctx.beginPath(); ctx.moveTo(px, py); open2 = true; ctx.strokeStyle = voor ? rand : donker; ctx.lineWidth = (voor ? 4.5 : 2) * Math.max(0.4, r / 22); } else ctx.lineTo(px, py); }
    if (open2) ctx.stroke(); ctx.restore(); };
  gids(false);
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: Math.min(p[2], pos[i - 1][2]) - 0.01, lijn: i }); });
  let gidsVoor = false; items.sort((A, B) => A.z - B.z).forEach(it => { if (!gidsVoor && it.z > 0) { gids(true); gidsVoor = true; } const lf = 1 - clamp(los / 0.6, 0, 1); const zz = (it.z + 1) / 2;
    if (it.lijn) { if (lf <= 0.01 || sp > 0.5) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.strokeStyle = _mixHex(donker, rand, zz); ctx.lineWidth = lerp(1.2, 4, zz) * Math.max(0.5, r / 22); ctx.globalAlpha = a * lf; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.globalAlpha = a; return; }
    const p = pos[it.ring]; const k = lerp(0.55, 0.95, zz); hexagon(ctx, p[0], p[1], r * k, _mixHex(donker, fill, zz), zz > 0.4 ? rand : _mixHex(donker, rand, 0.5), lerp(0.8, 1.6, zz)); });
  if (!gidsVoor) gids(true);
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
