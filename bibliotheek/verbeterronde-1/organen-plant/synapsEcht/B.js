// =====================================================================================
// SYNAPS (chemisch) — plaats en werking: axonuiteinden op een dendriet, met een zoomcirkel in één synaps.
// Recept: een axon vertakt aan het eind in synapsknopjes die tegen dendrieten (of doorntjes) van het volgende neuron
// liggen; tussen knop en dendriet de synapsspleet (20–40 nm). In de knop blaasjes met neurotransmitter.
// Volgorde (o.fase 0..1): impuls loopt door het axon (0–0,25) → Ca2+ de knop in (0,2–0,35) → blaasjes versmelten met
// het membraan (0,3–0,5) → neurotransmitter over de spleet (0,42–0,65) → bindt aan receptoren, ionkanaal open (0,6–0,8)
// → heropname door transporters (0,72–1). o.ssri blokkeert de transporter.
// Bron: OpenStax Biology 35.2; BioNumbers 100721 (Kandel 2000). Bekende fouten: synaps zonder plaats (los zwevend);
// receptoren op de knop; blaasjes die verdwijnen in plaats van versmelten.
// Ontwerp: hoogte ± 600, breedte ± 680; links de neuronen (cel-schaal), rechts een zoomcirkel (vergroot ± 10 000×).
// Aanpak B: context eerst (waar zit een synaps), werking vereenvoudigd in de zoom.
// o: a, fase (0..1), t, ssri (0..1), hi ('knop','blaasje','receptor','transporter')
// =====================================================================================
function synapsEcht(ctx, x, y, s = 1, o = {}) {
  const { a = 1, fase = 0, t = 0, ssri = 0, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const ZX = 150, ZY = 20, ZR = 200;
  const anker = { axon: W(-300, -230), knop: W(-150, 20), dendriet: W(-240, 140), zoom: W(ZX, ZY - ZR), blaasje: W(ZX - 40, ZY - 80), receptor: W(ZX, ZY + 60), transporter: W(ZX + 95, ZY - 5) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const seg = (u0, u1) => clamp((fase - u0) / (u1 - u0), 0, 1);
  const imp = seg(0, 0.25), ca = seg(0.2, 0.35), fus = seg(0.3, 0.5), dif = seg(0.42, 0.65), bind = seg(0.6, 0.8), her = seg(0.72, 1) * (1 - 0.85 * ssri);
  const NEUR = '#8C7BBF', NEUR2 = '#7FA6A0', NT = C.goud;
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  // ---------- dendriet van het volgende neuron (onder), met doorntjes ----------
  ctx.strokeStyle = NEUR2; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(-340, 150); ctx.bezierCurveTo(-250, 120, -120, 120, -20, 170); ctx.stroke();
  for (const [sx, sy, ex, ey] of [[-250, 132, -246, 82], [-150, 128, -150, 60], [-80, 140, -66, 92]]) { ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.fillStyle = NEUR2; ctx.beginPath(); ctx.arc(ex, ey, 13, 0, 6.283); ctx.fill(); }
  // ---------- axon met vertakkingen en knopjes ----------
  const AX = [[-330, -280], [-260, -200], [-200, -110], [-170, -40]];
  ctx.strokeStyle = NEUR; ctx.lineWidth = 14; ctx.beginPath(); bioPad(ctx, AX, false); ctx.stroke();
  ctx.lineWidth = 7; const takken = [[[-170, -40], [-220, 10], [-246, 56]], [[-170, -40], [-160, 0], [-150, 34]], [[-170, -40], [-110, 20], [-70, 66]]];
  for (const T of takken) { ctx.beginPath(); bioPad(ctx, T, false); ctx.stroke(); }
  ctx.save(); ctx.globalAlpha *= dimF('knop'); for (const T of takken) { const [kx, ky] = T[T.length - 1]; ctx.fillStyle = hi === 'knop' ? C.goud : NEUR; ctx.beginPath(); ctx.arc(kx, ky - 6, 15, 0, 6.283); ctx.fill(); } ctx.restore();
  // myelineschede (worstjes met knopen van Ranvier)
  ctx.fillStyle = '#E8E1D0'; for (let i = 0; i < 3; i++) { const P = bioPunt(AX, 0.08 + i * 0.27); ctx.save(); ctx.translate(P[0], P[1]); ctx.rotate(P[2]); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-30, -11, 60, 22, 11) : ctx.rect(-30, -11, 60, 22); ctx.fill(); ctx.restore(); }
  // impuls (goud) die door het axon loopt
  if (imp > 0.01 && imp < 1) { const u = imp < 0.8 ? imp / 0.8 : 1; const P = imp < 0.8 ? bioPunt(AX, u) : bioPunt(takken[1], (imp - 0.8) / 0.2); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.arc(P[0], P[1], 9, 0, 6.283); ctx.fill(); }
  // zoomlijnen van het middelste knopje naar de cirkel
  ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-150, 40, 34, 0, 6.283); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-122, 20); ctx.lineTo(ZX - ZR * 0.86, ZY - ZR * 0.5); ctx.moveTo(-124, 60); ctx.lineTo(ZX - ZR * 0.86, ZY + ZR * 0.5); ctx.stroke();
  // ---------- zoomcirkel ----------
  ctx.save(); ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.fillStyle = C.bgMicro; ctx.fill(); ctx.clip();
  // knop (boven, gebogen) en dendriet (onder, gebogen)
  ctx.fillStyle = rgba(NEUR, 0.45); ctx.beginPath(); ctx.ellipse(ZX, ZY - 150, 230, 150, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = NEUR; ctx.lineWidth = 4; ctx.stroke();
  ctx.fillStyle = rgba(NEUR2, 0.45); ctx.beginPath(); ctx.ellipse(ZX, ZY + 190, 260, 160, 0, 0, 6.283); ctx.fill(); ctx.strokeStyle = NEUR2; ctx.lineWidth = 4; ctx.stroke();
  const knopY = xx => ZY - 150 + 150 * Math.sqrt(Math.max(0, 1 - ((xx - ZX) / 230) ** 2)), postY = xx => ZY + 190 - 160 * Math.sqrt(Math.max(0, 1 - ((xx - ZX) / 260) ** 2));
  // Ca2+
  if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, ca * 3) * (1 - seg(0.5, 0.65)); ctx.fillStyle = '#D8DDE6'; for (let k = 0; k < 8; k++) { const sd = k % 2 ? 1 : -1; const v = (ca * 1.3 + hash(k)) % 1; const xx = ZX + sd * 120; ctx.beginPath(); ctx.arc(xx - sd * v * 30, knopY(xx) + 12 - v * 70, 3.5, 0, 6.283); ctx.fill(); } ctx.restore(); }
  // receptoren
  ctx.save(); ctx.globalAlpha *= dimF('receptor'); [-80, -30, 20, 70].forEach((dx, i) => { const rx = ZX + dx, ry = postY(rx); const open = bind * (1 - seg(0.9, 1) * (1 - ssri));
    ctx.strokeStyle = hi === 'receptor' ? C.goud : NEUR2; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(rx - 9 - 3 * open, ry + 14); ctx.lineTo(rx - 9 - 3 * open, ry - 8); ctx.moveTo(rx + 9 + 3 * open, ry + 14); ctx.lineTo(rx + 9 + 3 * open, ry - 8); ctx.stroke();
    if (open > 0.4) { ctx.fillStyle = C.teal; const v = (t * 1.2 + i * 0.3) % 1; ctx.beginPath(); ctx.arc(rx, ry - 6 + v * 40, 4, 0, 6.283); ctx.fill(); } }); ctx.restore();
  // transporters in de knop
  ctx.save(); ctx.globalAlpha *= dimF('transporter'); for (const dx of [-120, 95]) { const tx = ZX + dx, ty = knopY(tx); ctx.fillStyle = hi === 'transporter' ? C.goud : '#B79BCB'; ctx.beginPath(); ctx.arc(tx, ty - 4, 12, 0, 6.283); ctx.fill();
    if (ssri > 0.01) { ctx.save(); ctx.globalAlpha *= ssri; ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.arc(tx, ty + 10, 6, 0, 6.283); ctx.fill(); ctx.restore(); } } ctx.restore();
  // blaasjes
  ctx.save(); ctx.globalAlpha *= dimF('blaasje'); const BL = [[-50, -30], [10, -24], [60, -36], [-90, -80], [-20, -90], [50, -96], [-40, -140], [30, -150]];
  BL.forEach(([dx, dy], i) => { const vrij = i < 3; const bx = ZX + dx; let by = ZY + dy; const r = 17; if (vrij) by = lerp(by, knopY(bx) - r, ease(seg(0.3, 0.4))); const open = vrij ? ease(seg(0.38, 0.5)) : 0;
    if (open < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - open; ctx.beginPath(); ctx.arc(bx, by + open * r, r * (1 - 0.5 * open), 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.35); ctx.fill(); ctx.strokeStyle = hi === 'blaasje' ? C.goud : C.vesR; ctx.lineWidth = 2.5; ctx.stroke();
      if (open < 0.3) { ctx.fillStyle = NT; for (let k = 0; k < 5; k++) { const an = k * 1.26 + i; ctx.beginPath(); ctx.arc(bx + Math.cos(an) * 8, by + Math.sin(an) * 8, 3, 0, 6.283); ctx.fill(); } } ctx.restore(); }
    if (open > 0.05) { ctx.strokeStyle = NEUR; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(bx, knopY(bx), r * open * 0.9, 3.1416, 6.2832); ctx.stroke(); } });
  ctx.restore();
  // neurotransmitter
  if (fus > 0.5) { for (let k = 0; k < 18; k++) { const bx = ZX + BL[k % 3][0], rx = ZX + [-80, -30, 20, 70][k % 4]; let px = lerp(bx + (hash(k) - 0.5) * 16, rx, dif), py = lerp(knopY(bx) + 4, postY(rx) - 14, dif) + Math.sin(t * 3 + k) * 3;
      if (her > 0.01 && k % 3 !== 0) { const tr = ZX + (k % 2 ? 95 : -120); px = lerp(px, tr, her); py = lerp(py, knopY(tr) - 20, her); }
      ctx.save(); ctx.globalAlpha *= Math.min(1, (fus - 0.5) * 4); ctx.fillStyle = NT; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, 6.283); ctx.fill(); ctx.restore(); } }
  ctx.restore();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.stroke();
  ctx.restore(); return anker;
}
