// =====================================================================================
// WORTELHAREN — wortelpunt in lengtedoorsnede met de zones, wortelharen en wateropname.
// Recept (van punt naar boven): wortelmutsje (beschermt, slijt en wordt aangevuld) → delingszone (kleine, dicht
// opeengepakte cellen) → strekkingszone (cellen worden langer, de wortel wordt langer) → zone met wortelharen (begint
// bij de eerste wortelhaar; cellen specialiseren; in het midden de vaatbundel). Samen ± 1 cm. Een wortelhaar is
// een uitstulping van één opperhuidcel; jonge haren onderaan kort, hogerop langer. Water gaat de haar in, door de
// schors naar het midden (langs de endodermis, met Caspary-bandje) en omhoog door de houtvaten.
// Bron: OpenStax Biology 30.3 (Lumen-versie: zones, wortelharen, endodermis/Caspary-bandje).
// Bekende fouten: haren op het mutsje of de delingszone; alle haren even lang; vaatbundel tot in de punt.
// Ontwerp: hoogte ± 600 (punt onderaan y 280), breedte ± 420. Aanpak B: celniveau, één wortelpunt met de zones als
// echte cellen; groei verschuift de punt naar beneden en laat haren uitgroeien.
// o: a, t, water (0..1), groei (0..1), zones (0..1 dunne zonestrepen links), hi ('mutsje','deling','strekking','haren','vaatbundel')
// =====================================================================================
function wortelHaren(ctx, x, y, s = 1, o = {}) {
  const { a = 1, t = 0, water = 0, groei = 1, zones = 0, hi = null } = o;
  const g = 0.9 + 0.1 * groei, R = 62; // halve breedte van de wortel
  const yTip = 285, yMuts = 230, yDel = 150, yStr = 40; // grenzen
  const W = (px, py) => [x + px * s, y + py * s];
  const anker = { mutsje: W(0, 262), deling: W(0, 190), strekking: W(0, 95), haren: W(R + 60, -120), vaatbundel: W(0, -200), opperhuid: W(-R, -60) };
  if (a <= 0.01) return anker;
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  const CEL = '#C8D6A8', CELr = '#8FA870', MUTS = '#B9A87A', VAAT = '#9FB0C6';
  const dimF = k => (hi && hi !== k) ? 0.4 : 1;
  // bodem: korrels met waterlaagje
  for (let i = 0; i < 26; i++) { const sd = i % 2 ? 1 : -1; const kx = sd * (R + 40 + hash(i) * 150), ky = -290 + hash(i + 40) * 560, kr = 12 + hash(i + 3) * 18; if (Math.abs(kx) < R + 18) continue;
    ctx.beginPath(); ctx.arc(kx, ky, kr + 5, 0, 6.283); ctx.fillStyle = rgba(C.teal, 0.25); ctx.fill(); ctx.beginPath(); ctx.arc(kx, ky, kr, 0, 6.283); ctx.fillStyle = '#6E5A44'; ctx.fill(); }
  // omtrek van de wortel (gebogen punt)
  const ROMP = [[-R, -300], [-R, yDel], [-R * 0.9, yMuts], [-R * 0.55, yTip - 10], [0, yTip + 4], [R * 0.55, yTip - 10], [R * 0.9, yMuts], [R, yDel], [R, -300]];
  ctx.save(); ctx.beginPath(); bioPad(ctx, ROMP, false); ctx.closePath(); ctx.fillStyle = '#9DB08A'; ctx.fill(); ctx.clip();
  // cellen per zone: hoogte groeit van punt naar boven
  const rij = (y0, y1, h, key) => { ctx.save(); ctx.globalAlpha *= dimF(key); for (let yy = y1; yy > y0; yy -= h) { const cols = 6; const cw = 2 * R / cols; for (let c = 0; c < cols; c++) { const xx = -R + c * cw + (Math.floor(yy / h) % 2 ? cw * 0.5 : 0);
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(xx + 1.5, yy - h + 1.5, cw - 3, h - 3, Math.min(6, h / 3)) : ctx.rect(xx + 1.5, yy - h + 1.5, cw - 3, h - 3); ctx.fillStyle = hi === key ? lighten(CEL, 0.2) : CEL; ctx.fill(); ctx.strokeStyle = CELr; ctx.lineWidth = 1.5; ctx.stroke();
        if (h < 30) { ctx.fillStyle = BIO.kern; ctx.beginPath(); ctx.arc(xx + cw / 2, yy - h / 2, Math.min(5, h * 0.25), 0, 6.283); ctx.fill(); } } } ctx.restore(); };
  rij(-300, yStr, 52 * g, 'haren'); rij(yStr, yDel, 30 * g, 'strekking'); rij(yDel, yMuts, 14, 'deling');
  // mutsje: losse cellen in een kapje
  ctx.save(); ctx.globalAlpha *= dimF('mutsje'); for (let i = 0; i < 14; i++) { const an = Math.PI * (0.12 + 0.76 * (i % 7) / 6), rr = i < 7 ? 34 : 54; const px = Math.cos(an) * rr, py = yMuts + 4 + Math.sin(an) * rr * 0.9;
    ctx.beginPath(); ctx.ellipse(px, py, 11, 8, an, 0, 6.283); ctx.fillStyle = hi === 'mutsje' ? C.goud : MUTS; ctx.fill(); } ctx.restore();
  // vaatbundel in het midden (begint pas boven de strekkingszone), endodermis eromheen
  ctx.save(); ctx.globalAlpha *= dimF('vaatbundel'); ctx.fillStyle = hi === 'vaatbundel' ? C.goud : VAAT; ctx.fillRect(-16, -300, 32, yStr + 300 + 30); ctx.strokeStyle = '#C9A35C'; ctx.lineWidth = 2.5; ctx.strokeRect(-20, -300, 40, yStr + 300 + 30);
  ctx.strokeStyle = rgba('#FFFFFF', 0.4); ctx.lineWidth = 1.5; for (let yy = -295; yy < yStr + 20; yy += 9) { ctx.beginPath(); ctx.moveTo(-8, yy); ctx.lineTo(8, yy + 2); ctx.stroke(); } ctx.restore();
  ctx.restore();
  ctx.strokeStyle = CELr; ctx.lineWidth = 2.5; ctx.beginPath(); bioPad(ctx, ROMP, false); ctx.stroke();
  // wortelharen: pas boven de strekkingszone; hogerop langer
  ctx.save(); ctx.globalAlpha *= dimF('haren'); for (let i = 0; i < 18; i++) { const yy = yStr - 10 - i * 18; const L = clamp((yStr - yy) / 260, 0, 1) * 150 * groei + 6; const sd = i % 2 ? 1 : -1; const kr = Math.sin(i * 1.7) * 10;
    ctx.strokeStyle = hi === 'haren' ? C.goud : CELr; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(sd * (R - 2), yy); ctx.quadraticCurveTo(sd * (R + L * 0.5), yy + kr, sd * (R + L), yy - kr * 0.6); ctx.stroke(); ctx.strokeStyle = CEL; ctx.lineWidth = 4; ctx.stroke(); } ctx.restore();
  // water: de bodem → haar → schors → vaatbundel → omhoog
  if (water > 0.01) { ctx.save(); ctx.globalAlpha *= water; ctx.fillStyle = C.teal; for (let k = 0; k < 16; k++) { const i = (k * 3) % 18; const yy = yStr - 10 - i * 18; const sd = i % 2 ? 1 : -1; const L = clamp((yStr - yy) / 260, 0, 1) * 150 * groei + 6; const u = (t * 0.22 + k / 16) % 1;
      let px, py; if (u < 0.5) { const v = u / 0.5; px = sd * lerp(R + L, R, v); py = yy; } else if (u < 0.75) { const v = (u - 0.5) / 0.25; px = sd * lerp(R, 6, v); py = yy; } else { const v = (u - 0.75) / 0.25; px = sd * 6; py = yy - v * 120; }
      if (py > -292) { ctx.beginPath(); ctx.arc(px, py, 3.6, 0, 6.283); ctx.fill(); } } ctx.restore(); }
  // zones (dunne strepen links)
  if (zones > 0.01) { ctx.save(); ctx.globalAlpha *= zones; ctx.strokeStyle = C.line; ctx.lineWidth = 2; for (const [y0, y1] of [[-300, yStr], [yStr, yDel], [yDel, yMuts], [yMuts, yTip]]) { ctx.beginPath(); ctx.moveTo(-R - 30, y0 + 4); ctx.lineTo(-R - 30, y1 - 4); ctx.stroke(); } ctx.restore(); }
  ctx.restore(); return anker;
}
