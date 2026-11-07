// synapsZ4 = synapsEcht uit bibliotheek/lib_bio.js (variant A, 28 okt 2026), letterlijk overgenomen met drie kleuropties
// voor de kleurentabel van Zenuwstelsel/Hormonen (Kamiel 29 okt 2026): o.nt = neurotransmitter (licht teal #9CCBE3,
// was goud), o.imp = impuls (teal, was goud), o.trans = heropnametransporter (grijsblauw, was lichtpaars: minder paars).
// Voorstel voor de beeldbank: deze drie opties in synapsEcht zelf opnemen (standaard ongewijzigd).
function synapsZ4(ctx, x, y, s = 1, o = {}) {
  const { a = 1, fase = 0, t = 0, ssri = 0, hi = null, nt = '#9CCBE3', imp: imp_ = C.teal, trans = '#A9B7CC' } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { knop: W(-170, -170), blaasje: W(-60, -120), spleet: W(200, 4), receptor: W(-40, 30), transporter: W(130, -16), mitochondrium: W(90, -210), volgend: W(-160, 180), ca: W(-150, -40) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const seg = (u0, u1) => clamp((fase - u0) / (u1 - u0), 0, 1);
  const imp = seg(0.05, 0.2), ca = seg(0.15, 0.35), fus = seg(0.28, 0.5), dif = seg(0.4, 0.65), bind = seg(0.58, 0.8), her = seg(0.7, 1) * (1 - 0.85 * ssri);
  const CYT = '#2A3550', MEM = C.er, NT = nt;
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  // ---------- knop (gebogen membraan; onderkant iets afgeplat tegen de spleet) ----------
  const KNOP = [[-62, -300], [-80, -258], [-200, -215], [-262, -120], [-240, -50], [-180, -16], [-60, -8], [60, -8], [180, -16], [240, -50], [262, -120], [200, -215], [80, -258], [62, -300]];
  ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.lineTo(62, -300); ctx.closePath(); ctx.fillStyle = CYT; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = rgba(C.grain, 0.12); for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(-240 + hash(i) * 480, -290 + hash(i + 50) * 270, 1.5, 0, 6.283); ctx.fill(); }
  // impuls: gouden gloed die door het axon de knop in loopt
  if (imp > 0.01 && imp < 1) { ctx.fillStyle = rgba(imp_, 0.25 * Math.sin(imp * 3.14)); ctx.beginPath(); ctx.ellipse(0, lerp(-320, -80, imp), 200, 70, 0, 0, 6.283); ctx.fill(); }
  mitochondrion(ctx, 130, -165, 90, 0.5, 0.95, 5, t); mitochondrion(ctx, -160, -150, 70, -0.6, 0.95, 4, t);
  ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.stroke();
  ctx.strokeStyle = rgba(MEM, 0.5); ctx.lineWidth = 1.5; ctx.save(); ctx.translate(0, -5); ctx.scale(0.97, 0.98); ctx.beginPath(); bioPad(ctx, KNOP, false); ctx.stroke(); ctx.restore(); // dubbellaag
  // ---------- volgend neuron (dendriet), membraan zacht gebogen ----------
  const POST = []; for (let i = 0; i <= 12; i++) { const xx = -300 + i * 50; POST.push([xx, 22 + (xx / 300) ** 2 * 30]); }
  ctx.beginPath(); bioPad(ctx, POST, false); ctx.lineTo(300, 170); ctx.quadraticCurveTo(0, 330, -300, 170); ctx.closePath(); ctx.fillStyle = '#2E3A4E'; ctx.fill();
  ctx.save(); ctx.clip(); if (bind > 0.01) { ctx.fillStyle = rgba(C.teal, 0.18 * bind * (1 - seg(0.85, 1))); ctx.beginPath(); ctx.ellipse(0, 70, 260 * bind, 60, 0, 0, 6.283); ctx.fill(); } ctx.restore();
  ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); bioPad(ctx, POST, false); ctx.stroke();
  // ---------- receptoren (ionkanalen) loodrecht in het membraan ----------
  const RX = [-150, -90, -30, 30, 90, 150]; const postY = xx => 22 + (xx / 300) ** 2 * 30;
  ctx.save(); ctx.globalAlpha *= dimF('receptor');
  RX.forEach((rx, i) => { const ry = postY(rx); const bezet = bind * (i % 2 === 0 || bind > 0.6 ? 1 : 0); const open = bezet * (1 - seg(0.85, 1) * (1 - ssri));
    ctx.fillStyle = hi === 'receptor' ? C.goud : '#7FA6A0'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(rx + sd * (7 + 4 * open), ry + 4, 6.5, 17, 0, 0, 6.283); ctx.fill(); }
    if (bezet > 0.5) { ctx.fillStyle = NT; ctx.beginPath(); ctx.arc(rx, ry - 14, 5, 0, 6.283); ctx.fill(); }
    if (open > 0.3) { ctx.fillStyle = C.teal; for (let k = 0; k < 2; k++) { const v = (t * 1.2 + k * 0.5 + i * 0.13) % 1; ctx.beginPath(); ctx.arc(rx, ry - 10 + v * 50, 3.5, 0, 6.283); ctx.fill(); } } });
  ctx.restore();
  // ---------- Ca2+-kanalen + heropname-transporters in het membraan van de knop ----------
  const kanaal = (kx, open, col) => { ctx.fillStyle = col; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(kx + sd * (6 + 3 * open), -10, 6, 15, 0, 0, 6.283); ctx.fill(); } };
  kanaal(-200, ca * (1 - seg(0.4, 0.55)), '#9AA3B2'); kanaal(200, ca * (1 - seg(0.4, 0.55)), '#9AA3B2');
  if (ca > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, ca * 3) * (1 - seg(0.5, 0.7)); ctx.fillStyle = '#D8DDE6'; for (let k = 0; k < 10; k++) { const sd = k % 2 ? 1 : -1; const v = (ca * 1.4 + hash(k)) % 1;
      ctx.beginPath(); ctx.arc(sd * 200 + (hash(k + 4) - 0.5) * 30 - sd * v * 60, 20 - v * 90, 3, 0, 6.283); ctx.fill(); } ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= dimF('transporter');
  for (const tx of [-130, 130]) { ctx.fillStyle = hi === 'transporter' ? C.goud : trans; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx - 12, -26, 24, 30, 8) : ctx.rect(tx - 12, -26, 24, 30); ctx.fill();
    if (ssri > 0.01) { ctx.save(); ctx.globalAlpha *= ssri; ctx.fillStyle = C.koraal; ctx.beginPath(); ctx.moveTo(tx - 10, 14); ctx.lineTo(tx + 10, 14); ctx.lineTo(tx, 2); ctx.closePath(); ctx.fill(); ctx.restore(); } }
  ctx.restore();
  // ---------- blaasjes: stil → naar de actieve zone → versmelten ----------
  ctx.save(); ctx.globalAlpha *= dimF('blaasje');
  const BL = [[-80, -60], [-20, -50], [40, -58], [100, -66], [-120, -110], [-50, -120], [20, -112], [80, -130], [-10, -175], [60, -190], [-90, -200]];
  BL.forEach(([bx, by], i) => { const vrij = i < 4; const r = 15; let px = bx + Math.sin(t * 0.7 + i) * 2, py = by + Math.cos(t * 0.6 + i) * 2;
    if (vrij) { const dock = ease(seg(0.28, 0.38)); py = lerp(py, -8 - r, dock); }
    const open = vrij ? ease(seg(0.36, 0.5)) : 0;
    if (open < 0.98) { ctx.save(); ctx.globalAlpha *= 1 - open; ctx.beginPath(); ctx.arc(px, py + open * r, r * (1 - 0.5 * open), 0, 6.283); ctx.fillStyle = rgba(C.ves, 0.35); ctx.fill(); ctx.strokeStyle = hi === 'blaasje' ? C.goud : C.vesR; ctx.lineWidth = 2.5; ctx.stroke();
      if (open < 0.3) { ctx.fillStyle = NT; for (let k = 0; k < 5; k++) { const an = k * 1.26 + i; ctx.beginPath(); ctx.arc(px + Math.cos(an) * 7, py + Math.sin(an) * 7, 2.6, 0, 6.283); ctx.fill(); } } ctx.restore(); }
    if (open > 0.05) { ctx.strokeStyle = MEM; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, -8, r * open * 0.9, 3.1416, 6.2832); ctx.stroke(); } }); // blaasje wordt deel van het membraan (Ω-vorm)
  ctx.restore();
  // ---------- neurotransmitter in de spleet (en heropname) ----------
  if (fus > 0.5) { const N = 26; for (let k = 0; k < N; k++) { const bx = BL[k % 4][0]; const tt = dif; const tx = RX[k % RX.length];
      let px = lerp(bx + (hash(k) - 0.5) * 20, tx + (hash(k * 3) - 0.5) * 30, tt), py = lerp(-6, postY(tx) - 18, tt) + Math.sin(t * 3 + k) * 3;
      if (her > 0.01 && k % 3 !== 0) { const tr = k % 2 ? 130 : -130; px = lerp(px, tr, her); py = lerp(py, lerp(-10, -60, clamp(her * 1.6 - 0.6, 0, 1)), her); }
      const al = Math.min(1, (fus - 0.5) * 4) * (k % 3 === 0 ? 1 - seg(0.85, 1) * (1 - ssri) : 1); ctx.save(); ctx.globalAlpha *= al; ctx.fillStyle = NT; ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.283); ctx.fill(); ctx.restore(); } }
  if (hi === 'spleet') { ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeRect(-250, -8, 500, 28); ctx.setLineDash([]); }
  ctx.restore(); return anker;
}
