// STAAFBACTERIE — variant A 'één bacterie voor de hele bank' (27 okt 2026): bacterie() met bacterieCel() en
// bacterieGroot() als dunne omhulsels, zodat oude aanroepen blijven werken en elke film dezelfde bacterie krijgt.
// Recept (C9; OpenStax Microbiology 3.3; Brock h. 2): staafje ± 1 µm breed × 2–3 µm lang, uiteinden halfrond.
// Celwand (peptidoglycaan) als dikke laag buiten het dunne celmembraan, met een smalle spleet ertussen (twee
// lagen). Geen kern: het DNA is één ringvormig chromosoom, sterk opgekruld als losse kronkellus in het midden
// (nucleoïde, paars zoals alle DNA, C1); plasmide = klein los ringetje DNA (paars, dunner). Ribosomen (70S,
// ± 20 nm) als veel kleine stipjes in C.ribo buiten de nucleoïde. Flagel ± 20 nm dik, 2–4× de cellengte,
// schroefvormig, verankerd met een basaal lichaam in wand + membraan aan een pool.
// Antibiotica (o.antibiotica 0..1, bv. penicilline): gaten in de wand, het membraan puilt door een gat naar
// buiten en scheurt → inhoud lekt weg. o.riboHl 0..1 = ribosomen lichten op (aangrijpingspunt van andere
// antibiotica), o.hlWand 0..1 = wand licht op (goud, geen gloed).
// Eén wandkleur (o.col, standaard gedempt oker: organisme, C1); cytoplasma neutraal.
// Bekende fouten: bacterie met kern; wand en membraan als één lijn; DNA als strakke spiraalveer; ribosomen
// als grote bollen; twee verschillende bacteriën in één reeks.
// bacterie(ctx, x, y, L, {a, t, rot, h, antibiotica, hlWand, riboHl, flagel, plasmide, col, seed})
//   L = lengte in px, h = breedte (standaard L / 2,5). Geeft {wand, ribo, dna, plasmide, wandAt(an)} terug.
function bacterie(ctx, x, y, L, o = {}) {
  const { a = 1, t = 0, rot = 0, antibiotica = 0, hlWand = 0, flagel = false, plasmide = false, col = '#B89A62', seed = 3 } = o;
  const riboHl = o.riboHl != null ? o.riboHl : (o.hlRibo || 0); const ab = clamp(antibiotica, 0, 1);
  const hw = (o.h != null ? o.h : L / 2.5) / 2, ww = Math.max(2, hw * 0.16), half = L / 2 - hw;
  const cs = Math.cos(rot), sn = Math.sin(rot); const T = (px, py) => [x + px * cs - py * sn, y + px * sn + py * cs];
  const omtrek = (rr, N = 140) => { const out = []; const per = 4 * half + 6.283 * rr;
    for (let i = 0; i < N; i++) { let d = i / N * per; let p, nrm;
      if (d < 2 * half) { p = [-half + d, -rr]; nrm = [0, -1]; } else if ((d -= 2 * half) < Math.PI * rr) { const an = -Math.PI / 2 + d / rr; p = [half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      else if ((d -= Math.PI * rr) < 2 * half) { p = [half - d, rr]; nrm = [0, 1]; } else { d -= 2 * half; const an = Math.PI / 2 + d / rr; p = [-half + Math.cos(an) * rr, Math.sin(an) * rr]; nrm = [Math.cos(an), Math.sin(an)]; }
      out.push({ p, n: nrm }); } return out; };
  const x0 = half * 0.25, sig = hw * lerp(0.25, 0.75, ab), bul = ab < 0.15 ? 0 : hw * 1.25 * ease((ab - 0.15) / 0.65);
  const bump = (px, py, ny) => { if (ny > -0.9 || Math.abs(px - x0) > sig) return 0; return bul * Math.sqrt(1 - Math.pow((px - x0) / sig, 2)); };
  const kx = -half * 0.12, ky = 0, plx = half * 0.62, ply = hw * 0.32;
  const ret = { wand: T(-half * 0.55, -hw), ribo: T(half * 0.6, hw * 0.45), dna: T(kx, ky), plasmide: T(plx, ply),
    wandAt: an => T(Math.cos(an) * L / 2, Math.sin(an) * hw) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const mem = omtrek(hw - ww - Math.max(1.5, hw * 0.06)).map(q => { const b = bump(q.p[0], q.p[1], q.n[1]); return [q.p[0] + q.n[0] * b, q.p[1] + q.n[1] * b]; });
  const scheur = ab > 0.82; const top = mem.reduce((bi, p, i) => p[1] < mem[bi][1] ? i : bi, 0);
  // flagel aan de linkerpool, achter de cel
  if (flagel) { ctx.beginPath(); const fl = L * 2.4; for (let i = 0; i <= 90; i++) { const u = i / 90, d = u * fl; const px = -L / 2 - d, py = Math.sin(d / (L * 0.42) * 6.283 - t * 8) * hw * 0.55 * Math.min(1, u * 4);
      i ? ctx.lineTo(px, py) : ctx.moveTo(-L / 2 + ww, 0); } ctx.strokeStyle = rgba(C.text, 0.7); ctx.lineWidth = Math.max(1.2, hw * 0.05); ctx.stroke(); }
  // cytoplasma (neutraal) met ribosomen
  ctx.beginPath(); bioPad(ctx, mem, true); ctx.fillStyle = rgba('#2A3448', 0.85); ctx.fill();
  ctx.save(); ctx.beginPath(); bioPad(ctx, mem, true); ctx.clip();
  const nr = Math.round(L * hw / 75 + 30); const rr = Math.max(0.9, hw * 0.028);
  for (let i = 0; i < nr; i++) { const px = (hash(i * 2.7 + seed) - 0.5) * (L + bul), py = (hash(i * 3.9 + 2 + seed) - 0.5) * (2 * hw + 2 * bul) - bul * 0.4;
    if (Math.pow((px - kx) / (half * 0.78 + hw * 0.2), 2) + Math.pow((py - ky) / (hw * 0.48), 2) < 1) continue;
    if (plasmide && Math.hypot(px - plx, py - ply) < hw * 0.2) continue;
    ctx.beginPath(); ctx.arc(px, py, rr * (1 + 0.5 * riboHl), 0, 6.283); ctx.fillStyle = riboHl > 0.01 ? _mixHex(C.ribo, C.goud, riboHl) : rgba(C.ribo, 0.75); ctx.fill(); }
  // nucleoïde: één gesloten, losjes opgekrulde lus (random walk rond een ellips), paars
  const P = []; const N = 90; for (let i = 0; i < N; i++) { const u = i / N * 6.283; const bx = Math.cos(u) * half * 0.62, by = Math.sin(u) * hw * 0.24;
    const jr = hw * 0.16; P.push([kx + bx + Math.sin(u * 4 + seed) * jr + Math.cos(u * 9 + seed) * jr * 0.7, ky + by + Math.cos(u * 6 + seed * 2) * jr * 1.1 + Math.sin(u * 11) * jr * 0.5]); }
  ctx.beginPath(); bioPad(ctx, P, true); ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1.2, hw * 0.045); ctx.stroke();
  // plasmide: klein ringetje, licht gedraaid
  if (plasmide) { const pr = hw * 0.15; const Q = []; for (let i = 0; i < 12; i++) { const u = i / 12 * 6.283; Q.push([plx + Math.cos(u) * pr * (1 + 0.15 * Math.sin(u * 3)), ply + Math.sin(u) * pr * 0.75]); }
    ctx.beginPath(); bioPad(ctx, Q, true); ctx.strokeStyle = _mixHex(C.paars, '#FFFFFF', 0.25); ctx.lineWidth = Math.max(1, hw * 0.035); ctx.stroke(); }
  ctx.restore();
  // celmembraan (scheurt bovenin het blaasje)
  ctx.strokeStyle = C.er; ctx.lineWidth = Math.max(1.1, hw * 0.035);
  if (!scheur) { ctx.beginPath(); bioPad(ctx, mem, true); ctx.stroke(); }
  else { const g = Math.round(lerp(2, 9, (ab - 0.82) / 0.18)); const open = []; for (let k = g; k < mem.length - g; k++) open.push(mem[(top + k) % mem.length]); ctx.beginPath(); bioPad(ctx, open); ctx.stroke();
    const [qx, qy] = mem[top]; for (let i = 0; i < 14; i++) { const u = ((t * 0.3 + hash(i * 1.9)) % 1 + 1) % 1; const an = -Math.PI / 2 + (hash(i * 3.1) - 0.5) * 2.2, d = u * hw * 2.2;
      ctx.beginPath(); ctx.arc(qx + Math.cos(an) * d, qy + Math.sin(an) * d, rr * 1.3, 0, 6.283); ctx.fillStyle = rgba(C.ribo, 1 - u); ctx.fill(); } }
  // celwand: dikke band (één kleur), met gaten bij antibiotica; oplichten = gouden rand
  const wand = omtrek(hw - ww / 2, 96);
  const houd = wand.map((q, i) => { const inGat = bul > 0 && q.n[1] < -0.9 && Math.abs(q.p[0] - x0) < sig + ww; return !(inGat || hash(Math.floor(i / 5) * 5.3 + 7) < ab * 0.4); });
  const runs = []; const st = houd.indexOf(false);
  if (st < 0) runs.push(wand.map(q => q.p).concat([wand[0].p]));
  else { let cur = null; for (let k = 1; k <= wand.length; k++) { const i = (st + k) % wand.length; if (houd[i]) { (cur = cur || []).push(wand[i].p); } else if (cur) { runs.push(cur); cur = null; } } if (cur) runs.push(cur); }
  const rand = hlWand > 0.01 ? _mixHex(_mixHex(col, '#FFFFFF', 0.35), C.goud, hlWand) : _mixHex(col, '#FFFFFF', 0.35);
  for (const pass of [[rand, ww + Math.max(1.5, ww * 0.25)], [col, ww]]) runs.forEach(rn => { if (rn.length < 2) return; ctx.beginPath(); ctx.moveTo(rn[0][0], rn[0][1]); rn.forEach(p => ctx.lineTo(p[0], p[1])); ctx.strokeStyle = pass[0]; ctx.lineWidth = pass[1]; ctx.stroke(); });
  if (flagel) { ctx.beginPath(); ctx.arc(-L / 2 + ww * 0.5, 0, Math.max(2, hw * 0.07), 0, 6.283); shape(ctx, C.line, C.text, 1); }
  ctx.restore(); return ret;
}
// Oude aanroepen blijven werken:
// bacterieCel(ctx, x, y, L, {a, t, rot, antibiotica, hlWand, hlRibo, flagel}) → {wand, ribo, dna}
function bacterieCel(ctx, x, y, L, o = {}) { const r = bacterie(ctx, x, y, L, Object.assign({ plasmide: false }, o)); return { wand: r.wand, ribo: r.ribo, dna: r.dna }; }
// bacterieGroot(ctx, x, y, w, h, {a, t, wandKapot, riboHl, col}) → {wand(an)}; col blijft werken maar valt terug op de bankkleur
function bacterieGroot(ctx, x, y, w, h, o = {}) { const { wandKapot = 0, riboHl = 0, a = 1, t = 0 } = o; const r = bacterie(ctx, x, y, w, { a, t, h, antibiotica: wandKapot, riboHl, plasmide: true }); return { wand: an => [x + Math.cos(an) * w / 2, y + Math.sin(an) * h / 2] }; }
