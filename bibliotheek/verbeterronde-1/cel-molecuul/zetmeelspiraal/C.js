// ZETMEEL — variant C 'echte schroef' (ronde 2, 27 okt 2026).
// Recept (WOU Chemistry 'Carbohydrates part 4'; Berg h. 11): amylose = onvertakte keten van glucoseringen (α-1,4) die
// zich tot een spiraal windt, ± 6 glucose per winding. Getekend als schroef, iets schuin van opzij gezien: de keten is
// een doorlopende band die om een denkbeeldige as draait; de achterste helft van elke winding loopt dun en donker
// áchter de as langs (schuin de ene kant op), de voorste helft dik en licht er óverheen (schuin de andere kant op), zodat
// je de windingen ziet kruisen zoals bij een veer. Glucose = zeshoekige ring (oker, V.kh) met de ringzuurstof als
// stipje op één hoek; ringen achter de as kleiner en donkerder, ringen voor de as groot en licht.
// Bij vertering wikkelt de keten af (open 0 → 1) tot een losse golvende keten en knippen enzymen hem in losse glucose (los).
// Bekende fouten: een rechte rij zeshoeken (cellulose); een zigzag of sinus zonder voor/achter.
// Aanroep zoals voorheen: zetmeelSpiraal(ctx, x, y, n, r, {a, angle, open, los, t, fill, spreid}) → posities (van links naar rechts).
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return [];
  const per = 6, R = r * 2.7, pas = r * 0.72, sch = 0.6;     // straal van de schroef, stap per glucose langs de as, schuinte van het aanzicht
  const op = clamp(open, 0, 1), ls = clamp(los, 0, 1), vorm = 1 - Math.max(op, ls);
  // punt op de hartlijn voor fractie i (mag tussen glucoses liggen)
  const hart = i => { const ph = i / per * 6.283 + 0.6; const z = Math.cos(ph); const hx = i * pas - z * R * sch, hy = Math.sin(ph) * R * 0.95;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.35; return [lerp(ox, hx, 1 - op), lerp(oy, hy, 1 - op), z * (1 - op)]; };
  const pos = []; for (let i = 0; i < n; i++) { const h = hart(i); const w = wander(i + 300, t, r * 0.6, 0.5);
    pos.push([lerp(h[0], (i * r * 2.3 + i * r * 1.4) * spreid + w.x * 2, ls), lerp(h[1], Math.sin(i * 0.8) * r * 0.35 + w.y * 2 + (hash(i) - 0.5) * r * 3, ls), h[2] * (1 - ls)]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const donker = _mixHex(fill, '#1A2740', 0.55), rand = _mixHex(fill, '#FFFFFF', 0.4);
  const k = r / 22;
  // band: in stukjes, achter (z < 0) en voor (z ≥ 0) apart
  const band = voor => { const lf = 1 - clamp(ls / 0.5, 0, 1); if (lf <= 0.01) return; ctx.save(); ctx.globalAlpha *= lf; const N = (n - 1) * 8; let open2 = false;
    for (let j = 0; j <= N; j++) { const i = j / 8; const h = hart(i); const p = ls > 0 ? [lerp(h[0], pos[Math.min(n - 1, Math.round(i))][0], ls), lerp(h[1], pos[Math.min(n - 1, Math.round(i))][1], ls)] : h;
      const isV = h[2] >= -0.05 || vorm < 0.3; if (isV !== voor) { if (open2) { ctx.stroke(); open2 = false; } continue; }
      if (!open2) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); open2 = true; ctx.strokeStyle = voor ? rand : donker; ctx.lineWidth = Math.max(1, (voor ? lerp(3, 6, vorm) : 2.4) * k); } else ctx.lineTo(p[0], p[1]); }
    if (open2) ctx.stroke(); ctx.restore(); };
  const ring = (i) => { const p = pos[i], zz = (p[2] + 1) / 2; const rr = r * lerp(0.4, 0.66, zz * vorm + (1 - vorm) * 1.2); const rot = (i % 2) * 0.2;
    hexagon(ctx, p[0], p[1], rr, _mixHex(donker, fill, lerp(0.15, 1, zz * vorm + (1 - vorm))), zz > 0.45 || vorm < 0.3 ? rand : _mixHex(donker, rand, 0.4), Math.max(0.8, lerp(0.9, 1.6, zz) * k), rot);
    const oa = rot + Math.PI / 6 - Math.PI / 3; ctx.beginPath(); ctx.arc(p[0] + Math.cos(oa) * rr, p[1] + Math.sin(oa) * rr, Math.max(1, rr * 0.2), 0, 6.283); ctx.fillStyle = zz > 0.45 || vorm < 0.3 ? C.teal : _mixHex(C.teal, '#1A2740', 0.5); ctx.fill(); };
  const achter = [], voor = []; pos.forEach((p, i) => ((p[2] < -0.05 && vorm >= 0.3) ? achter : voor).push(i));
  band(false); achter.sort((A, B) => pos[A][2] - pos[B][2]).forEach(ring); band(true); voor.sort((A, B) => pos[A][2] - pos[B][2]).forEach(ring);
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
