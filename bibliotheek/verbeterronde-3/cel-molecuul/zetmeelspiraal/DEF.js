// ---------- ZETMEEL: AMYLOSE + (nieuw) AMYLOPECTINE (verbeterronde 3) ----------
// =====================================================================================
// MOLECULEN (voeding). Kleurtaal van de reeks: koolhydraat V.kh (zeshoek), eiwit V.ew (kraal), vet V.vt.
// ZETMEEL: amylose = keten van glucoseringen die een spiraal vormt, ± 6 glucose per winding (helix, linksdraaiend
// gezien langs de as, in 2D: een golf met diepte; ringen achteraan kleiner en donkerder). Bij vertering wikkelt
// de keten zich af en knippen enzymen hem in losse glucose. Bron: Berg, Biochemistry h. 11. Bekende fout: een rechte
// rij zeshoeken (dat is eerder cellulose).
// =====================================================================================
// AMYLOPECTINE (verbeterronde 3, 28 okt 2026; Kamiel: 'huidige versie blijft, extra stand amylopectine'): o.vertakt.
// Recept (LibreTexts Chemistry 20.7: amylopectine heeft 'occasional α-1,6-glycosidic bonds, which are responsible for the branching',
// 'about every 25–30 units'; ChEBI CHEBI:28057: 'The branches in amylopectin typically contain 24 to 30 glucose residues';
// Pesek & Silaghi-Dumitrescu 2024: amylose onvertakt, α-1,4, zes glucose per winding; amylopectine vertakt via α(1→6)):
//  - o.vertakt = true (of een getal: glucose tussen twee vertakkingen, standaard 26; houd 24–30 aan) → de hoofdketen is dezelfde
//    α-1,4-schroef als amylose, en om de o.vertakt glucose begint een zijketen via een α-1,6-binding: een kort haakje vanaf de
//    CH2OH-kant (C6) van die glucose, met het zuurstofbruggetje als teal stipje (zelfde teal als bij cellulose).
//  - het vertakkingspunt schuift naar de dichtstbijzijnde glucose aan de buitenkant van de schroef (om en om boven en onder).
//  - elke zijketen is weer een α-1,4-schroef van o.takN glucose (standaard = o.vertakt, dus ook 24–30), schuin weg van de
//    hoofdketen, om en om naar boven en naar onder. open/los/t werken op hoofd- en zijketens (vertering: alles wikkelt af en valt
//    uiteen in glucose; de α-1,6-haakjes verdwijnen mee).
//  - zonder o.vertakt tekent de functie precies als voorheen (amylose).
// Bekende fouten (amylopectine): vertakkingen om de paar glucose (dat is glycogeen, 8–12); rechte zijtakken zonder schroef.
// Geeft bij o.vertakt de posities van de hoofdketen terug, met .takken = [[x, y] … per zijketen] en .knopen = α-1,6-punten.
function zetmeelSpiraal(ctx, x, y, n, r, o = {}) {
  if (o.vertakt) return _zetmeelVertakt(ctx, x, y, n, r, o);
  const { a = 1, angle = 0, open = 0, los = 0, t = 0, fill = V.kh, spreid = 1 } = o; if (a <= 0.01) return []; /* spreid: hoe ver de losse glucose uit elkaar gaat (1 = 3,7 r per stuk) */ ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(angle);
  const per = 6, R = r * 1.75, pas = r * 0.9; const pos = [];
  for (let i = 0; i < n; i++) { const ph = i / per * 6.283; const hz = Math.cos(ph), hx = i * pas + hz * R * 0.62, hy = Math.sin(ph) * R;
    const ox = i * r * 2.3, oy = Math.sin(i * 0.8) * r * 0.3; const w = wander(i + 300, t, r * 0.6, 0.5);
    const px = lerp(lerp(hx, ox, open), (ox + i * r * 1.4) * spreid + w.x * 2, los), py = lerp(lerp(hy, oy, open), oy + w.y * 2 + (hash(i) - 0.5) * r * 3, los);
    pos.push([px, py, lerp(hz, 0, Math.max(open, los))]); }
  ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = 2;
  const items = []; pos.forEach((p, i) => { items.push({ z: p[2], ring: i }); if (i) items.push({ z: (p[2] + pos[i - 1][2]) / 2 - 0.01, lijn: i }); });
  items.sort((A, B) => A.z - B.z).forEach(it => { const lf = 1 - clamp(los / 0.6, 0, 1);
    if (it.lijn) { if (lf <= 0.01) return; const p = pos[it.lijn], q = pos[it.lijn - 1]; ctx.save(); ctx.globalAlpha *= lf * (0.55 + 0.45 * (it.z + 1) / 2); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); return; }
    const p = pos[it.ring]; const k = 0.66 + 0.4 * (p[2] + 1) / 2; ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * (p[2] + 1) / 2; hexagon(ctx, p[0], p[1], r * k, p[2] < -0.3 ? lighten(fill, -0.18) : fill, lighten(fill, 0.35)); ctx.restore(); });
  ctx.restore(); return pos.map(p => { const c = Math.cos(angle), s2 = Math.sin(angle); return [x + p[0] * c - p[1] * s2, y + p[0] * s2 + p[1] * c]; });
}
function _zetmeelVertakt(ctx, x, y, n, r, o) {
  const { a = 1, angle = 0, open = 0, los = 0, fill = (typeof V !== 'undefined' ? V.kh : C.oker) } = o; if (a <= 0.01) return [];
  const tak = Math.max(6, o.vertakt === true ? 26 : Math.round(o.vertakt)), takN = Math.max(3, Math.round(o.takN || tak)), basis = Object.assign({}, o, { vertakt: false });
  const R = r * 1.75, ux = Math.cos(angle), uy = Math.sin(angle), nx = -uy, ny = ux, lf = 1 - clamp(Math.max(open, los) / 0.6, 0, 1);
  // vertakkingspunten om de 'tak' glucose; elk punt schuift naar de glucose die aan de goede kant van de schroef ligt
  // (om en om boven/onder), zodat de zijketen niet door de hoofdketen loopt
  const punten = []; for (let i0 = Math.floor(tak / 3), k = 0; i0 < n - 3; i0 += tak, k++) { const op = k % 2 ? 1 : -1; let i = i0; while (i < n - 1 && Math.sin(i / 6 * 6.283) * op < 0.8) i++; if (i < n - 1) punten.push([i, op]); }
  const hoofd = zetmeelSpiraal(ctx, x, y, n, r, basis), takken = [], knopen = [];
  punten.forEach(([i, op]) => { const p = hoofd[i], zh = angle + op * 0.62, zx = Math.cos(zh), zy = Math.sin(zh);
    const S = [p[0] + nx * op * R * 1.25 + ux * r * 0.4 - zx * R * 0.62, p[1] + ny * op * R * 1.25 + uy * r * 0.4 - zy * R * 0.62];
    const T = zetmeelSpiraal(ctx, S[0], S[1], takN, r, Object.assign({}, basis, { angle: zh })); takken.push(T);
    // α-1,6-haakje: van de glucose (kant C6) via het zuurstofbruggetje (teal) naar de eerste glucose van de zijketen
    const k0 = [p[0] + nx * op * r * 0.7, p[1] + ny * op * r * 0.7], k1 = [p[0] + nx * op * R * 0.75 + ux * r * 0.35, p[1] + ny * op * R * 0.75 + uy * r * 0.35], k2 = T[0]; knopen.push(k1);
    if (lf > 0.01) { ctx.save(); ctx.globalAlpha *= a * lf; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = lighten(fill, 0.3); ctx.lineWidth = Math.max(1.5, r * 0.28);
      ctx.beginPath(); ctx.moveTo(k0[0], k0[1]); ctx.lineTo(k1[0], k1[1]); ctx.lineTo(k2[0], k2[1]); ctx.stroke();
      ctx.beginPath(); ctx.arc(k1[0], k1[1], Math.max(1.6, r * 0.3), 0, 6.283); ctx.fillStyle = C.teal; ctx.fill(); ctx.restore(); } });
  hoofd.takken = takken; hoofd.knopen = knopen; return hoofd;
}
