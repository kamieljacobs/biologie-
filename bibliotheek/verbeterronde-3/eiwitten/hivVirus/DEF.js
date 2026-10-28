// ---------- HIV-DEELTJE (gp120/gp41) (verbeterronde 3 eiwitten, 28 okt 2026: kralenketen) ----------
// Env-spike: gp41 = steeltje van drie kralen door de envelop; gp120 = trimeer van drie lobben, elk drie kralen (klein: één kraal per lob).
// Zelfde aanroep, plaats, grootte en ankerpunten als nu; alleen de eiwitten zijn een kralenketen (_kkKluwen/_kkPad/_kkHelix uit
// verbeterronde-2/eiwitten/_hulp.js), zoals Kamiel voor alle eiwitten koos (C9, BEELDAFSPRAKEN: keten van aminozuren die vouwt,
// geen vlakke vorm). Het receptcommentaar boven de functie in lib_bio.js blijft gelden; alleen deze functie vervangen.
function hivVirus(ctx, x, y, r, o = {}) {
  const { a = 1, t = 0, rot = 0, fuseer = 0, n = 12, membraan = null } = o; const mem = membraan == null ? fuseer > 0.01 : membraan; const f = clamp(fuseer, 0, 1);
  const yb = r, gap = 0.25 + f * 0.9;
  const P = th => { const px = Math.cos(th) * r, py = Math.sin(th) * r; return [px * (1 + 0.28 * f), yb - (yb - py) * (1 - 0.38 * f)]; };
  const spikes = [];
  for (let k = 0; k < n; k++) { const th = rot + (k + 0.12 * (hash(k * 4.3) - 0.5)) / n * 6.283; const d = Math.abs(((th - Math.PI / 2) % 6.283 + 9.425) % 6.283 - 3.1416);
    const zicht = f < 0.01 ? 1 : clamp((d - gap - 0.2) / 0.3, 0, 1); if (zicht <= 0) continue;
    const p0 = P(th), p1 = P(th + 0.01), p2 = P(th - 0.01); let nx = p1[1] - p2[1], ny = -(p1[0] - p2[0]); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    spikes.push({ p: p0, nx, ny, zicht }); }
  const ret = { midden: [x, y], onder: [x, y + yb], spikes: spikes.map(s => [x + s.p[0] + s.nx * r * 0.24, y + s.p[1] + s.ny * r * 0.24]) };
  if (a <= 0.01) return ret;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // envelop-pad (open bij fusie, met voetjes die in de membraan overlopen)
  const pts = []; const N = 72;
  if (f < 0.01) for (let i = 0; i < N; i++) pts.push(P(i / N * 6.283));
  else { const t0 = Math.PI / 2 + gap, t1 = Math.PI / 2 + 6.283 - gap; for (let i = 0; i <= N; i++) pts.push(P(lerp(t0, t1, i / N)));
    const A = pts[0], B = pts[pts.length - 1], voet = r * 0.75 * f;
    pts.unshift([A[0] - voet - r * 0.15, yb], [A[0] - voet * 0.45, yb - r * 0.02]); pts.push([B[0] + voet * 0.45, yb - r * 0.02], [B[0] + voet + r * 0.15, yb]); }
  // doelmembraan (celmembraan van de T-cel): dubbellaag, licht gebogen (stuk van een grote cirkel), ligt op y + r
  if (mem) { const Rm = r * 22, cyM = yb + Rm; const lwm = Math.max(5, r * 0.13), llm = Math.max(1.3, r * 0.03); const gat = f > 0.01 ? (r * 0.75 * f + r * 0.3) / Rm : 0;
    const boog = (b0, b1) => { ctx.beginPath(); ctx.arc(0, cyM, Rm, -Math.PI / 2 + b0, -Math.PI / 2 + b1); };
    for (const [b0, b1] of (gat > 0 ? [[-0.075, -gat], [gat, 0.075]] : [[-0.075, 0.075]])) { boog(b0, b1); ctx.strokeStyle = _mixHex(C.coral || '#E07A5F', '#FFFFFF', 0.3); ctx.lineWidth = lwm; ctx.stroke(); boog(b0, b1); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lwm - 2 * llm; ctx.stroke(); } }
  const closed = f < 0.01;
  ctx.beginPath(); bioPad(ctx, pts, closed); if (!closed) ctx.closePath(); ctx.fillStyle = rgba('#E07A5F', 0.13); ctx.fill();
  // spikes: steel (gp41) door de membraan + trimeerknop (gp120)
  const ks = Math.max(1.6, r * 0.055);
  spikes.forEach(s => { ctx.save(); ctx.globalAlpha *= s.zicht; const [px, py] = s.p, nx = s.nx, ny = s.ny, tx = -ny, ty = nx;
    // gp41 = kort steeltje van kralen door de envelop; gp120 = drie lobben (trimeer), elk een klein kluwentje van drie kralen
    const sk = Math.max(1.1, r * 0.022); for (let q = 0; q < 3; q++) { const h = 0.0 + q * 0.06; ctx.beginPath(); ctx.arc(px + nx * r * h, py + ny * r * h, sk, 0, 6.283); shape(ctx, lighten((C.coral || '#E07A5F'), 0.2), null); }
    [[-1, 0.17], [1, 0.17], [0, 0.235]].forEach(([sd, h], li) => { const lx = px + nx * r * h + tx * sd * ks * 0.95, ly = py + ny * r * h + ty * sd * ks * 0.95, cl = (C.coralL || '#F0A88F');
      if (ks < 3) { ctx.beginPath(); ctx.arc(lx, ly, ks, 0, 6.283); shape(ctx, cl, lighten(cl, 0.35), 1); return; }
      for (let q = 0; q < 3; q++) { const aq = q / 3 * 6.283 + li; ctx.beginPath(); ctx.arc(lx + Math.cos(aq) * ks * 0.45, ly + Math.sin(aq) * ks * 0.45, ks * 0.55, 0, 6.283); shape(ctx, q ? cl : lighten(cl, 0.12), lighten(cl, 0.35), 1); } });
    ctx.restore(); });
  // dubbellaag: band met twee lichte lijnen en donkerder midden
  const lw = Math.max(5, r * 0.13), ll = Math.max(1.3, r * 0.03);
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = lighten((C.coral || '#E07A5F'), 0.3); ctx.lineWidth = lw; ctx.stroke();
  ctx.beginPath(); bioPad(ctx, pts, closed); ctx.strokeStyle = '#9A4A3A'; ctx.lineWidth = lw - 2 * ll; ctx.stroke();
  // capside (kegel) met twee RNA-strengen
  const sc = 1 - 0.22 * f; ctx.save(); ctx.translate(0, f * r * 0.22); ctx.rotate(rot + 0.55); ctx.scale(sc, sc);
  const L = r * 1.3, hw = r * 0.3, hn = r * 0.11;
  ctx.beginPath(); ctx.moveTo(-L / 2, -hn); ctx.lineTo(L / 2 - hw * 0.5, -hw); ctx.quadraticCurveTo(L / 2 + hw * 0.55, 0, L / 2 - hw * 0.5, hw); ctx.lineTo(-L / 2, hn); ctx.quadraticCurveTo(-L / 2 - hn * 1.1, 0, -L / 2, -hn); ctx.closePath();
  shape(ctx, rgba((C.gold || '#E0B64A'), 0.85), (C.goldL || '#F0D58A'), Math.max(1.3, r * 0.025));
  ctx.strokeStyle = C.paars; ctx.lineWidth = Math.max(1, r * 0.03);
  for (const sd of [-1, 1]) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(-L * 0.3, L * 0.48, u), half = lerp(hn, hw, (px + L / 2) / L);
      const py = sd * half * 0.32 + Math.sin(u * 16 + sd * 1.3 + t * 1.5) * half * 0.28; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore();
  ctx.restore();
  return ret;
}
