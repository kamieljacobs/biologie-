// teken_e1.js — eigen hulpfuncties voor de animatie van Ecologie v2 · film 1 (Hoeveel passen er?), 29 okt 2026.
// Laadt na teken_eco1.js en vóór sb1.js. Pas niets aan in /root/eco2 of ecolib; afwijkende versies staan hier.
const ALLES1 = { on: () => 1, at: () => 0, localT: 99 }; // eindstand van een scène (voor vraag-alinea's die de situatie tonen)
function A1(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= Math.min(1, a); fn(); ctx.restore(); }
// rustige golfjes die over het water drijven
function e1Golf(ctx, x0, x1, y0, y1, t, n = 10, v = 16) { const base = ctx.globalAlpha; ctx.save(); ctx.strokeStyle = E1.waterL; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  const w = x1 - x0; for (let i = 0; i < n; i++) { const L = 40 + hash(i * 9.1) * 60; const x = x0 + ((hash(i * 5.3) * w + t * v * (0.7 + hash(i) * 0.6)) % w); const y = y0 + 10 + hash(i * 2.7) * Math.max(4, y1 - y0 - 20);
    ctx.globalAlpha = base * (0.25 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.7 + i * 1.3))); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.min(x1, x + L), y); ctx.stroke(); } ctx.restore(); }
// lopen van x0 naar x1 met snelheid v (px/s) vanaf tijd t0; s = afgelegde afstand (voor de gangfase)
function e1Loop(t, t0, x0, x1, v) { const d = Math.abs(x1 - x0), k = Math.sign(x1 - x0) || 1; const s = clamp((t - t0) * v, 0, d); return { x: x0 + k * s, loopt: t > t0 && s < d - 0.5, s, klaar: s >= d - 0.5 }; }
// bever die loopt zonder te glijden: pas = 24 cm per gangcyclus (pop_eco_klein LOPEN.S)
const E1_BEVERV = 1.4; // gangcycli per seconde
function e1BeverLoop(ctx, t, t0, x0, x1, y, s, o = {}) { const v = 24 * s * E1_BEVERV, L = e1Loop(t, t0, x0, x1, v); const kijk = Math.sign(x1 - x0) || 1;
  ecoBever(ctx, L.x, y, s, Object.assign({ houding: L.loopt ? 'lopen' : (o.rust || 'staan'), t: L.s / (24 * s), kijk }, o.extra || {})); return L; }
// Gerrit loopt van opzij het beeld in en draait naar de kijker als hij er is
function e1GerritLoop(ctx, t, t0, x0, x1, o = {}) { const v = gangSnelheid('gerrit', 330, 'loop'), L = e1Loop(t, t0, x0, x1, v);
  if (L.loopt || t < t0) return persoon(ctx, 'gerrit', L.x, 900, 330, { outfit: 'gewoon', zij: true, kijk: Math.sign(x1 - x0) || 1, gang: t < t0 ? undefined : 'loop', t: Math.max(0, t - t0) });
  return persoon(ctx, 'gerrit', L.x, 900, 330, Object.assign({ outfit: 'gewoon', t }, o)); }
// punt langs een polylijn op fractie u (0..1); geeft ook de richting
function e1Langs(P, u) { const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = clamp(u, 0, 1) * tot; for (let i = 1; i < P.length; i++) { if (r <= L[i - 1] || i === P.length - 1) { const f = L[i - 1] ? Math.min(1, r / L[i - 1]) : 0; return { x: P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, y: P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f, dx: P[i][0] - P[i - 1][0], dy: P[i][1] - P[i - 1][1], i }; } r -= L[i - 1]; } return { x: P[0][0], y: P[0][1], dx: 1, dy: 0, i: 1 }; }
// deel van een polylijn tot fractie u
function e1Deel(P, u) { if (u <= 0) return [P[0]]; if (u >= 1) return P.slice(); const p = e1Langs(P, u); return P.slice(0, p.i).concat([[p.x, p.y]]); }
// populatiecirkel met vier pijlen, elk met eigen sterkte, en kleine bevers die erin of eruit stromen
function e1PopAnim(ctx, x, y, r, t, al, o = {}) { const { getallen = null, gA = [1, 1, 1, 1], stroom = true } = o;
  A1(ctx, al[0], () => { circ(ctx, x, y, r, rgba(C.fill, 0.9), C.line, 2); text(ctx, 'populatie', x, y + 14, fTekst(44, 700), C.text, 'center'); });
  const pij = [['geboorte', -2.45, C.groen, true], ['immigratie', -0.69, C.groen, true], ['sterfte', 2.45, C.koraal, false], ['emigratie', 0.69, C.koraal, false]];
  pij.forEach(([naam, an, kl, in_], i) => { const a = al[i + 1]; if (a <= 0.01) return; const c = Math.cos(an), s = Math.sin(an), r1 = r + 20, r2 = r + 170;
    A1(ctx, a, () => { if (in_) pijl(ctx, x + c * r2, y + s * r2, x + c * r1, y + s * r1, kl, 1, 7, 24); else pijl(ctx, x + c * r1, y + s * r1, x + c * r2, y + s * r2, kl, 1, 7, 24);
      const lx = x + c * (r2 + 30), ly = y + s * (r2 + 30) + 12; text(ctx, naam, lx, ly, fTekst(40, 600), kl, c < 0 ? 'right' : 'left');
      if (getallen) A1(ctx, gA[i], () => text(ctx, getallen[i], lx, ly + 52, fTekst(40, 800), C.text, c < 0 ? 'right' : 'left'));
      if (stroom) for (let k = 0; k < 2; k++) { const u = ((t * 0.35 + k / 2 + i * 0.13) % 1), rr = in_ ? r2 - 10 - u * (r2 - r1 - 30) : r1 + 30 + u * (r2 - r1 - 50);
        A1(ctx, Math.sin(Math.PI * u), () => e1Icoon(ctx, x + c * rr - s * 26, y + s * rr + c * 26, 11, { kleur: kl, kijk: c < 0 ? (in_ ? 1 : -1) : (in_ ? -1 : 1) })); } }); }); }
// Markermeer met eilanden die verschijnen (eil 0..1) en groen worden (groen 0..1); kopie van e1KaartMarkermeer met animatie
function e1KaartMM(ctx, x, y, s = 1, o = {}) { const { eil = 1, groen = 1 } = o; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  vul(ctx, [[0, 0], [900, 0], [900, 620], [0, 620]], '#3A5540');
  vul(ctx, [[120, 120], [380, 60], [640, 110], [760, 260], [720, 470], [520, 560], [260, 520], [120, 380]], E1.water);
  [[520, 210, 46, 30, 0.3], [585, 250, 30, 20, -0.4], [480, 270, 24, 16, 0.2], [550, 300, 20, 13, 0.5], [610, 205, 16, 11, 0]].forEach(([cx, cy, rx, ry, rot], i) => { const e = ease(eil * 5 - i * 0.8); if (e <= 0.01) return;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(e, e); ctx.fillStyle = i ? '#C9A86A' : '#B8A060'; ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.fill();
    const g = ease(groen * 1.4 - i * 0.1); if (g > 0.01) { ctx.fillStyle = C.groen; ctx.beginPath(); ctx.ellipse(-rx * 0.15, -ry * 0.1, rx * 0.55 * g, ry * 0.5 * g, 0, 0, 6.283); ctx.fill(); } ctx.restore(); });
  ctx.restore(); }
// bewegende stip die langs een pijl reist (zaad, vogel, drijfsel)
function e1Reis(ctx, x1, y1, x2, y2, t, kl, n = 2, v = 0.3) { for (let k = 0; k < n; k++) { const u = (t * v + k / n) % 1; A1(ctx, Math.sin(Math.PI * u), () => circ(ctx, x1 + (x2 - x1) * u, y1 + (y2 - y1) * u, 8, kl, C.bgSchema, 2)); } }
// sneeuwvlokjes
function e1Sneeuw(ctx, t, x0, x1, y0, y1, n = 24) { for (let i = 0; i < n; i++) { const x = x0 + hash(i * 3.7) * (x1 - x0) + Math.sin(t * 0.8 + i) * 12, y = y0 + ((hash(i * 1.9) * (y1 - y0) + t * (30 + hash(i) * 20)) % (y1 - y0)); circ(ctx, x, y, 3 + hash(i * 5) * 2, 'rgba(242,242,238,0.8)'); } }
