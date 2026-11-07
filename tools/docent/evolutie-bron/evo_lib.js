/* =====================================================================================
   Evolutie · gedeelde tekenhulpen voor de lessen (31 okt 2026)
   Overgenomen uit de filmreeks Evolutie v2 (films/evolutie/1-wat-is-evolutie/bron/src/lib_evo.js en teken_e1.js),
   aangepast aan de C-kleuren van de lessen (licht/donker).
   Kleuren zoals in de films: allel voor zwart = blauw (EV().a1), allel voor oranje = geel (EV().a2),
   krachten: selectie groen, toeval (drift) goud, uitwisseling (genenstroom) blauw, mutatie paars.
   ===================================================================================== */
const EV = () => ({ a1: C.teal, a2: C.oker, nieuw: C.paars,
  kracht: { selectie: C.groen, drift: C.goud, stroom: C.teal, mutatie: C.paars } });

// ---- knikker = één allel ----
function knikker(ctx, x, y, r, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  circ(ctx, x, y, r, kleur, lighten(kleur, 0.35), 2); circ(ctx, x - r * 0.35, y - r * 0.35, r * 0.22, 'rgba(255,255,255,0.4)'); ctx.restore(); }

// ---- glazen pot met knikkers (de genenpool) ----
// anker (x, y) = midden van de bodem; s = schaal (s = 1 → 260 breed, 300 hoog); o.kleuren = lijst knikkerkleuren (wordt gemengd met o.seed),
// of o.p + o.n (aandeel allel 1); o.vul = 0..1 hoeveel knikkers al in de pot liggen
function pot(ctx, x, y, s = 1, o = {}) {
  const { p = 0.5, n = 60, seed = 1, a = 1, vul = 1 } = o; if (a <= 0.01) return;
  let kl = o.kleuren ? o.kleuren.slice() : Array.from({ length: n }, (_, i) => i < Math.round(n * p) ? EV().a1 : EV().a2);
  if (!o.vast) for (let i = kl.length - 1; i > 0; i--) { const j = Math.floor(hash(seed * 31 + i * 7) * (i + 1)); [kl[i], kl[j]] = [kl[j], kl[i]]; }
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  const w = 260, h = 300, r = 34, kr = o.kr || 13, kol = Math.floor((w - 40) / (kr * 2.25));
  ctx.save(); roundRect(ctx, -w / 2 + 6, -h + 40, w - 12, h - 46, r - 6); ctx.clip();
  const zicht = Math.round(kl.length * vul);
  for (let i = 0; i < zicht; i++) { const rij = Math.floor(i / kol), k = i % kol, vs = (rij % 2) * kr;
    const kx = -w / 2 + 28 + k * (kr * 2.25) + vs + (hash(seed + i * 3.1) - 0.5) * 5, ky = -20 - rij * (kr * 1.95) + (hash(seed + i * 5.7) - 0.5) * 4;
    if (ky < -h + 60) break; knikker(ctx, kx, ky, kr, kl[i]); }
  ctx.restore();
  const glas = C.licht ? '#7D8FA5' : '#AFC0D0';
  ctx.strokeStyle = glas; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
  ctx.moveTo(-w / 2 + 34, -h + 10); ctx.lineTo(-w / 2 + 34, -h + 34); ctx.quadraticCurveTo(-w / 2, -h + 44, -w / 2, -h + 80);
  ctx.lineTo(-w / 2, -r); ctx.quadraticCurveTo(-w / 2, 0, -w / 2 + r, 0); ctx.lineTo(w / 2 - r, 0); ctx.quadraticCurveTo(w / 2, 0, w / 2, -r);
  ctx.lineTo(w / 2, -h + 80); ctx.quadraticCurveTo(w / 2, -h + 44, w / 2 - 34, -h + 34); ctx.lineTo(w / 2 - 34, -h + 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-w / 2 + 26, -h + 10); ctx.lineTo(w / 2 - 26, -h + 10); ctx.stroke();
  ctx.strokeStyle = rgba(glas, 0.35); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-w / 2 + 22, -h + 100); ctx.lineTo(-w / 2 + 22, -70); ctx.stroke();
  ctx.restore();
}

// ---- allelbalk: aandeel allel 1 (blauw) tegen allel 2 (geel), met percentages eronder ----
function allelBalk(ctx, x, y, w, p, a = 1, o = {}) { if (a <= 0.01) return; const h = o.h || 34;
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, h / 2); ctx.save(); ctx.clip();
  ctx.fillStyle = EV().a1; ctx.fillRect(x, y, w * p, h); ctx.fillStyle = EV().a2; ctx.fillRect(x + w * p, y, w * (1 - p), h); ctx.restore();
  roundRect(ctx, x, y, w, h, h / 2); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  if (o.procent !== false) { text(ctx, (o.namen ? o.namen[0] + ' ' : '') + Math.round(p * 100) + '%', x, y + h + 40, fTekst(32, 700), EV().a1, 'left');
    text(ctx, (o.namen ? o.namen[1] + ' ' : '') + Math.round((1 - p) * 100) + '%', x + w, y + h + 40, fTekst(32, 700), EV().a2, 'right'); }
  ctx.restore(); }

// ---- Aziatisch lieveheersbeestje (Harmonia axyridis), bovenaanzicht; kop naar boven ----
// o.vorm: 'oranje' (f. succinea, o.stippen 0–19), 'vier' (zwart met vier rode vlekken, f. spectabilis), 'twee' (zwart met twee, f. conspicua)
// s = 1 → ± 150 px lang. o.loop = fase voor de poten (pootjes bewegen), o.open = dekschilden open (vliegen)
function lhb(ctx, x, y, s = 1, o = {}) {
  const { vorm = 'oranje', stippen = 12, rot = 0, a = 1, open = 0, loop = null } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const rug = vorm === 'oranje' ? '#D9792E' : '#1B1A1C', vlek = vorm === 'oranje' ? '#1B1A1C' : '#D2452C';
  ctx.strokeStyle = '#2A2422'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (const k of [-1, 1]) [[-22, -0.5], [0, 0.05], [20, 0.55]].forEach(([py, hoek], i) => { const sw = loop == null ? 0 : Math.sin(loop * 9 + i * 2.1 + (k > 0 ? Math.PI : 0)) * 7;
    ctx.beginPath(); ctx.moveTo(k * 30, py); ctx.lineTo(k * 62, py + hoek * 30 - 6 + sw); ctx.lineTo(k * 74, py + hoek * 50 + sw); ctx.stroke(); });
  ctx.lineWidth = 2.5; for (const k of [-1, 1]) { ctx.beginPath(); ctx.moveTo(k * 8, -78); ctx.quadraticCurveTo(k * 20, -96, k * 26, -98); ctx.stroke(); circ(ctx, k * 27, -98, 3.5, '#2A2422'); }
  ctx.beginPath(); ctx.ellipse(0, -70, 20, 13, 0, 0, 6.283); ctx.fillStyle = '#1B1A1C'; ctx.fill(); circ(ctx, -11, -72, 3.2, '#E9E2CC'); circ(ctx, 11, -72, 3.2, '#E9E2CC');
  ctx.beginPath(); ctx.moveTo(-40, -44); ctx.quadraticCurveTo(-38, -66, 0, -68); ctx.quadraticCurveTo(38, -66, 40, -44); ctx.quadraticCurveTo(0, -38, -40, -44); ctx.fillStyle = '#EDE6D2'; ctx.fill(); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#1B1A1C'; ctx.beginPath(); ctx.moveTo(-18, -44); ctx.lineTo(-12, -60); ctx.lineTo(-4, -52); ctx.lineTo(0, -60); ctx.lineTo(4, -52); ctx.lineTo(12, -60); ctx.lineTo(18, -44); ctx.quadraticCurveTo(0, -41, -18, -44); ctx.fill();
  if (vorm !== 'oranje') { circ(ctx, -28, -52, 6, '#EDE6D2'); circ(ctx, 28, -52, 6, '#EDE6D2'); }
  const dek = (k) => { ctx.beginPath(); ctx.moveTo(0, -42); ctx.quadraticCurveTo(k * 44, -44, k * 50, -6); ctx.quadraticCurveTo(k * 52, 42, k * 4, 62); ctx.lineTo(0, 62); ctx.closePath(); };
  for (const k of [-1, 1]) { ctx.save(); ctx.translate(k * open * 18, 0); ctx.rotate(k * open * 0.35); dek(k); ctx.fillStyle = rug; ctx.fill(); ctx.strokeStyle = lighten(rug, 0.25); ctx.lineWidth = 1.5; ctx.stroke(); ctx.save(); dek(k); ctx.clip();
    if (vorm === 'oranje') { const pos = [[18, -26], [34, -10], [14, -2], [30, 14], [12, 22], [26, 36], [40, 28], [20, 46], [36, -28], [8, 40]]; for (let i = 0; i < Math.min(Math.floor(stippen / 2), pos.length); i++) circ(ctx, k * pos[i][0], pos[i][1], 5.4, vlek); if (stippen % 2) circ(ctx, 0, -32, 5, vlek); }
    else if (vorm === 'twee') { ctx.beginPath(); ctx.ellipse(k * 26, -14, 14, 12, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); }
    else { ctx.beginPath(); ctx.ellipse(k * 26, -18, 11, 9, 0, 0, 6.283); ctx.fillStyle = vlek; ctx.fill(); ctx.beginPath(); ctx.ellipse(k * 24, 28, 10, 8, 0, 0, 6.283); ctx.fill(); }
    ctx.restore(); ctx.restore(); }
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, -42); ctx.lineTo(0, 62); ctx.stroke();
  ctx.restore();
}

// ---- allelenpaar onder een beestje: twee knikkers naast elkaar ----
function allelPaar(ctx, x, y, k1, k2, r = 16, a = 1) { knikker(ctx, x - r * 1.15, y, r, k1, a); knikker(ctx, x + r * 1.15, y, r, k2, a); }

// ---- thermometer (meta) ----
function thermo(ctx, x, y, h, f, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 12, y - h, 24, h, 12); shape(ctx, rgba(C.fill, 0.6), C.line, 2); circ(ctx, x, y + 6, 22, kleur, C.line, 2);
  roundRect(ctx, x - 6, y - h * f, 12, h * f + 4, 6); ctx.fillStyle = kleur; ctx.fill(); ctx.restore(); }
