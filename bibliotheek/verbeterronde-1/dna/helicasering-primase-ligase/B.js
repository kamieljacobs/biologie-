// ---------- HELICASE, PRIMASE, LIGASE (variant B, beeldbank 27 okt 2026) ----------
// Recept (OpenStax Biology 2e § 14.4; Leman & Noguchi 2013: CMG-helicase = ring van zes Mcm2–7 om één streng; Pascal e.a. 2004
// Nature 432:473: DNA-ligase I 'encircles its DNA substrate' en 'positions the catalytic core on the nick'):
//  - helicase: een dikke ring (donut) van zes segmenten met naden, vrij plat van voren gezien (60°) zodat het gat groot is;
//    de streng loopt door het gat (achterste helft laag 'achter', voorste helft laag 'voor'); fase = de naden draaien mee.
//  - primase: eiwit als gevouwen kralenketen (Beeldafspraak) met het RNA-stukje (teal) dat hij maakt aan het actieve centrum.
//  - ligase: ring om het DNA bij de knip: o.sluit 0 = ring nog open (C-vorm), 1 = ring dicht om de naad met een gouden flits.
// Zelfde aanroepen als v2: helicaseRing(ctx, x, y, r, {fase, laag, hl}); primase(ctx, x, y, r, {an, hl, rna}); ligase(ctx, x, y, r, {an, sluit, hl}).
function helicaseRing(ctx, x, y, r, o = {}) { const { a = 1, fase = 0, laag = 'beide', hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const sb = Math.sin(1.05), R = r * 0.72, w = r * 0.42;
  const seg = (v) => { for (let k = 0; k < 6; k++) { const a0 = k / 6 * 6.283 + fase, a1 = a0 + 6.283 / 6 - 0.12; const mid = (a0 + a1) / 2; if ((Math.sin(mid) >= 0) !== v) continue;
      const vul = v ? '#8E9CB8' : '#4A5970', rd = hl > 0.01 && v ? _mixHex('#B8C4D6', C.goud, hl) : _mixHex(vul, '#FFFFFF', 0.3);
      ctx.beginPath(); for (let i = 0; i <= 12; i++) { const ph = lerp(a0, a1, i / 12); ctx.lineTo(x + Math.sin(ph) * (R + w / 2) * sb, y + Math.cos(ph) * (R + w / 2)); }
      for (let i = 12; i >= 0; i--) { const ph = lerp(a0, a1, i / 12); ctx.lineTo(x + Math.sin(ph) * (R - w / 2) * sb, y + Math.cos(ph) * (R - w / 2)); } ctx.closePath(); shape(ctx, vul, rd, hl > 0.01 && v ? 3 : 1.5); } };
  if (laag !== 'voor') { ctx.beginPath(); ctx.ellipse(x, y, (R - w / 2) * sb, R - w / 2, 0, 0, 6.283); ctx.fillStyle = rgba('#0D1420', 0.55); ctx.fill(); seg(false); } // gat (schaduw) + achterste segmenten
  if (laag !== 'achter') seg(true);
  ctx.restore(); }
function primase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, rna = 1, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const pts = []; for (let k = 0; k < 22; k++) { const u = k / 21, th = u * 6.283 * 1.6 + 0.4, rr = r * (0.75 - 0.35 * Math.sin(u * 9) * 0.5) * (0.6 + 0.4 * Math.sin(u * Math.PI)); pts.push([Math.cos(th) * rr - r * 0.1, Math.sin(th) * rr]); }
  const P = bioDicht(pts, 6); ctx.strokeStyle = '#5A6E88'; ctx.lineWidth = r * 0.42; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  for (let i = 0; i < P.length; i += 4) _bioCirc(ctx, P[i][0], P[i][1], r * 0.2, '#6F86A0', hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl) : '#9AAAC4', 1.2);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.62, 0, r * 0.22, Math.PI * 0.55, Math.PI * 1.45); ctx.stroke();
  if (rna > 0.01) { ctx.globalAlpha *= rna; const n = 4, st = r * 0.3, x0 = r * 1.0; for (let i = 0; i < n; i++) { ctx.fillStyle = Object.values(RNA_BASE.base)[i % 4]; ctx.fillRect(x0, -i * st - st * 0.36, st * 0.7, st * 0.72); }
    ctx.strokeStyle = D2.rna; ctx.lineWidth = Math.max(3, r * 0.13); ctx.beginPath(); ctx.moveTo(x0, st * 0.3); ctx.lineTo(x0, -(n - 0.6) * st); ctx.stroke(); }
  ctx.restore(); }
function ligase(ctx, x, y, r, o = {}) { const { a = 1, an = 0, sluit = 0, hl = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an);
  const k = ease(sluit), cx = r * 0.95, open = lerp(0.9, 0, k), vul = '#8392AE', rd = hl > 0.01 ? _mixHex('#A4B2CA', C.goud, hl) : '#A4B2CA';
  // achterste boog (dun, donker) en voorste boog (dik): ring om de streng(en) bij de knip, opening sluit
  ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(cx, 0, r * 1.05, r * 0.38, 0, Math.PI + open * 0.5, Math.PI * 2 - open * 0.5); ctx.strokeStyle = '#4E5D76'; ctx.lineWidth = r * 0.3; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(cx, 0, r * 1.05, r * 0.38, 0, open * 0.5, Math.PI - open * 0.5); ctx.strokeStyle = rd; ctx.lineWidth = r * 0.42 + 3; ctx.stroke(); ctx.strokeStyle = vul; ctx.lineWidth = r * 0.42; ctx.stroke();
  // katalytische kern aan de buitenkant (bij het enzymmidden) met goud actief centrum
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.45, r * 0.55, 0, 0, 6.283); shape(ctx, vul, rd, 1.5);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r * 0.28, 0, r * 0.2, Math.PI * 0.6, Math.PI * 1.4, true); ctx.stroke();
  if (k > 0.7) { ctx.globalAlpha *= (k - 0.7) / 0.3; _bioCirc(ctx, cx, 0, r * 0.16, rgba(C.goud, 0.55), C.goud, 2); }
  ctx.restore(); }
