// =====================================================================================
// WORTELHAREN — wortelstelsel van een plant (penwortel met zijwortels) en ingezoomd één wortelhaarcel.
// Recept: wortelharen zijn uitstulpingen van één opperhuidcel (géén aparte cellen), ± 10 µm dik en tot ± 1 mm lang;
// ze zitten in de zone vlak achter de groeiende punt (strekkingszone voorbij, waar de cellen zich specialiseren),
// niet op de punt zelf (daar zit het wortelmutsje) en niet op oude delen. Ze vergroten het oppervlak sterk.
// Water gaat de wortelhaar in en loopt naar het midden (vaatbundel); de haar groeit tussen de bodemdeeltjes
// door, waar een laagje water om de korrels zit. Tweezaadlobbigen: penwortel met zijwortels.
// Bron: OpenStax Biology 30.3 (Lumen-versie: zones, wortelharen = uitstulpingen van epidermiscellen, penwortel);
// Bekende fouten: haren op de wortelpunt; haren als losse cellen of even dik als de
// wortel; wortel die boven de grond uitsteekt; water dat via de punt naar binnen gaat.
// Ontwerp: hoogte ± 600 (bodem vanaf y −250), breedte ± 640; zoomcirkel rechtsonder. Aanpak A: hele wortelstelsel
// + zoom op één wortelhaarcel met water.
// o: a, t, water (0..1 waterdeeltjes), zoom (0..1), groei (0..1 wortels groeien uit), hi ('haren','penwortel','zijwortel')
// =====================================================================================
function wortelHaren(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, water = 0, zoom = 1, groei = 1, hi = null } = o;
  const W = (px, py) => [x + px * s, y + py * s];
  const ZX = 180, ZY = 110, ZR = 150;
  const anker = { stengel: W(-130, -285), bodem: W(-300, -230), penwortel: W(-130, 120), zijwortel: W(-240, 10), haren: W(-30, 30), zoom: W(ZX, ZY - ZR), haarcel: W(ZX - 70, ZY + 50) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const WORTEL = '#D9C9A0', WORTELd = '#A8956A', BODEM = '#3A2E24', KORREL = '#6E5A44';
  const dimF = k => (hi && hi !== k) ? 0.35 : 1;
  // bodem
  ctx.fillStyle = rgba(BODEM, 0.75); ctx.beginPath(); ctx.moveTo(-320, -250); for (let i = 0; i <= 16; i++) ctx.lineTo(-320 + i * 40, -250 + Math.sin(i * 1.7) * 4); ctx.lineTo(320, 300); ctx.lineTo(-320, 300); ctx.closePath(); ctx.fill();
  ctx.fillStyle = rgba(KORREL, 0.5); for (let i = 0; i < 70; i++) { const px = -310 + hash(i) * 620, py = -235 + hash(i + 99) * 530; if (Math.hypot(px - ZX, py - ZY) < ZR + 6) continue; ctx.beginPath(); ctx.arc(px, py, 1.5 + hash(i + 7) * 3, 0, 6.283); ctx.fill(); }
  // stengel met blaadjes boven de grond
  ctx.strokeStyle = C.groen; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-130, -250); ctx.quadraticCurveTo(-134, -280, -128, -310); ctx.stroke();
  ctx.fillStyle = '#5FA86E'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(-128 + sd * 26, -300, 26, 10, sd * -0.5, 0, 6.283); ctx.fill(); }
  // wortels: penwortel + zijwortels (takken van 2e orde)
  const takken = [];
  const tak = (pts, w, key, L = groei) => { if (L <= 0.02) return; const n = Math.max(2, Math.round(pts.length * L)); const P = pts.slice(0, n); if (L < 1 && n < pts.length) { const f = pts.length * L - (n - 1); P[n - 1] = [lerp(pts[n - 2][0], pts[n - 1][0], f), lerp(pts[n - 2][1], pts[n - 1][1], f)]; }
    ctx.save(); ctx.globalAlpha *= dimF(key); ctx.strokeStyle = WORTELd; ctx.lineWidth = w + 2; ctx.beginPath(); bioPad(ctx, P, false); ctx.stroke(); ctx.strokeStyle = hi === key ? C.goud : WORTEL; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); takken.push([P, w]); };
  tak([[-130, -250], [-128, -170], [-136, -60], [-126, 60], [-132, 170], [-128, 270]], 14, 'penwortel');
  const ZW = [[[-130, -190], [-200, -160], [-260, -110], [-290, -40]], [[-130, -170], [-60, -140], [-10, -90], [20, -20]], [[-134, -90], [-210, -50], [-250, 20], [-262, 100]],
    [[-132, -60], [-70, -20], [-30, 40], [-20, 120]], [[-128, 40], [-200, 80], [-230, 150], [-240, 220]], [[-128, 80], [-80, 120], [-60, 190], [-58, 250]]];
  const lZij = Z => clamp((groei - (Z[0][1] + 250) / 520) / 0.45, 0, 1);
  ZW.forEach(Z => tak(Z, 6, 'zijwortel', lZij(Z)));
  ZW.forEach((Z, i) => { const L2 = clamp((lZij(Z) - 0.55) / 0.45, 0, 1); const P = bioPunt(Z, 0.5); tak([[P[0], P[1]], [P[0] + (i % 2 ? 30 : -30), P[1] + 22], [P[0] + (i % 2 ? 44 : -44), P[1] + 52]], 3, 'zijwortel', L2); });
  // wortelharen: alleen in de zone achter de punt (niet op de punt zelf)
  ctx.save(); ctx.globalAlpha *= dimF('haren') * 0.9; ctx.strokeStyle = hi === 'haren' ? C.goud : '#EDE3C6'; ctx.lineWidth = 1;
  takken.forEach(([P, w], j) => { const D = bioDicht(P, 10); const n = D.length; const i0 = Math.floor(n * 0.55), i1 = Math.floor(n * 0.9);
    for (let i = i0; i < i1; i++) { if (i % 2) continue; const p = D[i], q = D[Math.min(n - 1, i + 1)]; const an = Math.atan2(q[1] - p[1], q[0] - p[0]); const L = (w * 0.9 + 6) * (0.6 + 0.5 * hash(i + j * 50));
      for (const sd of [-1, 1]) { const nx = Math.cos(an + sd * 1.571), ny = Math.sin(an + sd * 1.571); ctx.beginPath(); ctx.moveTo(p[0] + nx * w * 0.5, p[1] + ny * w * 0.5); ctx.lineTo(p[0] + nx * (w * 0.5 + L), p[1] + ny * (w * 0.5 + L)); ctx.stroke(); } } });
  ctx.restore();
  // worteltopjes met mutsje (iets donkerder)
  takken.forEach(([P, w]) => { const e = P[P.length - 1]; ctx.fillStyle = WORTELd; ctx.beginPath(); ctx.arc(e[0], e[1], w * 0.55, 0, 6.283); ctx.fill(); });
  // ---------- zoom: één wortelhaarcel ----------
  if (zoom > 0.01) { ctx.save(); ctx.globalAlpha *= zoom; const bron = [-28, 40];
    ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bron[0], bron[1], 16, 0, 6.283); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bron[0] + 14, bron[1] - 8); ctx.lineTo(ZX - ZR * 0.95, ZY - ZR * 0.3); ctx.moveTo(bron[0] + 12, bron[1] + 10); ctx.lineTo(ZX - ZR * 0.8, ZY + ZR * 0.6); ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.fillStyle = '#2A221C'; ctx.fill(); ctx.clip();
    // bodemkorrels met een laagje water
    const KR = [[ZX + 10, ZY - 70, 34], [ZX + 95, ZY - 20, 40], [ZX + 30, ZY + 30, 26], [ZX + 110, ZY + 80, 34], [ZX - 20, ZY - 120, 28], [ZX + 60, ZY + 130, 30], [ZX - 10, ZY + 110, 22]];
    for (const [kx, ky, kr] of KR) { ctx.beginPath(); ctx.arc(kx, ky, kr + 6, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.35); ctx.fill(); ctx.beginPath(); bioPad(ctx, [0, 1, 2, 3, 4, 5].map(k => [kx + Math.cos(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr)), ky + Math.sin(k * 1.05 + kr) * kr * (0.85 + 0.2 * hash(k + kr * 2))]), true); ctx.fillStyle = KORREL; ctx.fill(); }
    // opperhuidcellen van de wortel (links) en één cel met een lange haar
    for (let i = -2; i <= 2; i++) { const cy = ZY + i * 62; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(ZX - ZR - 10, cy - 29, 110, 58, 12) : ctx.rect(ZX - ZR - 10, cy - 29, 110, 58); ctx.fillStyle = '#C8D6A8'; ctx.fill(); ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 3; ctx.stroke(); }
    const HAAR = [[ZX - 52, ZY], [ZX - 10, ZY - 6], [ZX + 40, ZY - 18], [ZX + 60, ZY - 30], [ZX + 160, ZY - 40]];
    ctx.strokeStyle = '#8FA870'; ctx.lineWidth = 22; ctx.beginPath(); bioPad(ctx, HAAR, false); ctx.stroke(); ctx.strokeStyle = '#C8D6A8'; ctx.lineWidth = 16; ctx.stroke();
    ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.ellipse(ZX - 30, ZY - 2, 10, 7, 0, 0, 6.283); ctx.fill(); // kern bij de basis van de haar
    ctx.fillStyle = rgba(C.teal, 0.35); ctx.beginPath(); ctx.ellipse(ZX - 80, ZY, 30, 18, 0, 0, 6.283); ctx.fill(); // vacuole
    if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; const HD = bioDicht(HAAR, 10); for (let k = 0; k < 14; k++) { const u = 1 - ((t * 0.25 + k / 14) % 1); const p = HD[Math.floor(u * (HD.length - 1))];
        ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(p[0], p[1] + Math.sin(k * 2.1) * 4, 3.4, 0, 6.283); ctx.fill(); }
      for (let k = 0; k < 6; k++) { const v = (t * 0.25 + k / 6) % 1; ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(lerp(ZX - 90, ZX - ZR - 20, v), ZY + Math.sin(k * 3) * 12, 3.4, 0, 6.283); ctx.fill(); } ctx.restore(); }
    ctx.restore(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ZX, ZY, ZR, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore(); return anker;
}
