// Film 8 · Stambomen lezen — eigen hulpfuncties voor de animatie (laadt na lib_dieren, vóór sb8.js). Niets gedeelds aangepast.
const E8 = {};
E8.fr = (u) => u - Math.floor(u);
E8.schema = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
E8.blauw = (ctx) => { ctx.fillStyle = '#1C3A58'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#22466A'; ctx.fillRect(0, 0, W, 180); ctx.fillStyle = '#163048'; ctx.fillRect(0, 760, W, 320); };
// rustige luchtbelletjes in het blauw
E8.bellen = (ctx, t, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.3; ctx.strokeStyle = '#9CC4E0'; ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) { const x = 80 + hash(i + 3) * 1760 + 12 * Math.sin(t * 0.8 + i), per = 9 + hash(i + 7) * 6, u = E8.fr(t / per + hash(i + 11)); const y = 860 - u * 820; ctx.beginPath(); ctx.arc(x, y, 3 + hash(i) * 4, 0, 6.283); ctx.stroke(); } ctx.restore(); };
// stroming: korte streepjes die naar links schuiven (water langs het lijf)
E8.stroom = (ctx, x0, x1, y0, y1, t, a = 1, n = 7) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.3; ctx.strokeStyle = '#B8D4E8'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const y = y0 + hash(i + 21) * (y1 - y0), L = 40 + hash(i + 5) * 70, v = 160 + hash(i + 9) * 120; const x = x1 - E8.fr((t * v) / (x1 - x0) + hash(i + 2)) * (x1 - x0 + L);
    ctx.beginPath(); ctx.moveTo(Math.max(x0, x), y); ctx.lineTo(Math.min(x1, x + L), y); ctx.stroke(); } ctx.restore(); };
// zachte gouden ring om iets aan te lichten (geen wijslijn)
E8.gloed = (ctx, x, y, r, a = 1, kleur = C.goud) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.stroke();
  ctx.globalAlpha *= 0.25; ctx.lineWidth = 12; ctx.stroke(); ctx.restore(); };
// lopen zonder glijden: segs = [[tStart, aantal cycli], …]; per = s per cyclus; stap = px per cyclus. Geeft x, houding en fase.
E8.gang = (t, segs, per, stap, x0, kijk = 1) => { let c = 0, loopt = false; for (const [s0, n] of segs) { const u = clamp((t - s0) / per, 0, n); c += u; if (u > 0 && u < n) loopt = true; }
  return { x: x0 + kijk * c * stap, h: loopt ? 'lopen' : 'staan', t: E8.fr(c) }; };

// ---------- dieren in een tegel (losse tegels zonder maatvergelijking) ----------
// bbox van elk dier bij s = 1 (gemeten): [x0, x1, y0, y1] t.o.v. het anker
E8.BB = { haai: [-240, 252, -102, 96], dolfijn: [-330, 250, -104, 92], ichthyosaurus: [-260, 300, -122, 128], walvis: [-442, 400, -96, 218], krokodil: [-330, 340, -136, 8],
  hagedis: [-306, 182, -68, 4], vogel: [-122, 146, -442, 2], leeuw: [-204, 236, -316, 2], tijger: [-192, 202, -226, -4], huiskat: [-164, 196, -346, -4], koe: [-192, 216, -258, 0],
  nijlpaard: [-162, 290, -208, 10], chimpansee: [-48, 54, -92, 2], mens: [-38, 36, -194, -2] };
E8.teken = (ctx, naam, x, y, s, o = {}) => { const { t = 0, a = 1, rontgen = 0 } = o;
  switch (naam) { case 'haai': haai(ctx, x, y, s, { t, a, rontgen }); if (!rontgen) E8.kieuwen(ctx, x, y, s, a); return; case 'dolfijn': return rontgen ? dolfijn(ctx, x, y, s, { t, a, rontgen }) : E8.dolfijnTegel(ctx, x, y, s, { t, a }); case 'ichthyosaurus': return ichthyosaurus(ctx, x, y, s, { t, a });
    case 'walvis': return bultrug(ctx, x, y, s, { t, a, rontgen, heup: o.heup || 0 }); case 'krokodil': return krokodil(ctx, x, y, s, { a, houding: 'liggen' }); case 'hagedis': return hagedis(ctx, x, y, s, { a, houding: 'staan' });
    case 'vogel': return vogel(ctx, x, y, s, { a }); case 'leeuw': return leeuw(ctx, x, y, s, { a }); case 'tijger': return tijger(ctx, x, y, s, { a }); case 'huiskat': return huiskat(ctx, x, y, s, { a });
    case 'koe': return koe7(ctx, x, y, s, { a }); case 'nijlpaard': return nijlpaard(ctx, x, y, s, { a }); case 'chimpansee': return chimp(ctx, x, y, s, { a }); case 'mens': return persoon(ctx, 'noor', x, y, 200 * s, { a }); } };
// tegel-pictogrammen met herkenbare kenmerken (review): dolfijn met HORIZONTALE staartvin (van opzij een smalle platte vin), haai met duidelijke kieuwspleten
E8.dolfijnTegel = (ctx, x, y, s, o = {}) => { const { a = 1, t = 0 } = o; if (a <= 0.01) return; _bd(ctx, x, y, s, 1, a, 0);
  const rug = '#5E6C7A', buik = '#C9D0D8'; const sl = Math.sin(t * 2.6) * 0.06;
  ctx.save(); ctx.translate(-222, 4); ctx.rotate(sl); vul(ctx, [[8, -7], [-30, -9], [-70, -12], [-96, -10], [-104, -3], [-90, 0], [-104, 4], [-96, 10], [-70, 11], [-30, 9], [8, 8]], rug, _lt(rug, 0.2), 2); ctx.restore();
  vul(ctx, [[30, -44], [0, -88], [-24, -104], [-28, -94], [-30, -42]], rug, _lt(rug, 0.2), 2);
  const R = [[250, 10], [236, 2], [196, 0], [172, -20], [140, -40], [60, -50], [-40, -44], [-140, -24], [-226, -2], [-226, 10], [-140, 24], [-40, 40], [60, 44], [150, 32], [196, 18], [236, 16]];
  vul(ctx, R, rug, _lt(rug, 0.18), 2); binnen(ctx, R, () => vul(ctx, [[260, 12], [200, 12], [120, 6], [0, 10], [-200, 6], [-200, 60], [260, 60]], buik));
  lijn(ctx, [[248, 12], [214, 12], [190, 10]], '#2A3038', 2); circ(ctx, 150, -40, 5, '#2A3038'); dierOog(ctx, 176, -2, 6, '#1A1C20');
  ctx.save(); ctx.translate(120, 30); vul(ctx, [[14, -6], [-8, 20], [-46, 52], [-58, 54], [-40, 22], [-14, -4]], _dk(rug, 0.1)); ctx.restore();
  ctx.restore(); };
E8.kieuwen = (ctx, x, y, s, a = 1) => { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#2E363E'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(152 - i * 14, -20); ctx.quadraticCurveTo(146 - i * 14, 0, 152 - i * 14, 18); ctx.stroke(); } ctx.restore(); };
E8.TW = 210; E8.TH = 130;
// tegel met het dier erin; (x, yb) = midden onderkant van de tegel; o.rand = 0..1 goud, o.naam = naam erboven
E8.tegel = (ctx, naam, x, yb, a = 1, o = {}) => { if (a <= 0.01) return; const { w = E8.TW, h = E8.TH, rand = 0, t = 0, rontgen = 0, label = true, randKleur = C.goud } = o; // losse tegel: het dier past in de tegel, geen maatvergelijking
  ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - w / 2, yb - h, w, h, 16); ctx.fillStyle = rgba(C.fill, 0.55); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); roundRect(ctx, x - w / 2 + 3, yb - h + 3, w - 6, h - 6, 14); ctx.clip(); const B = E8.BB[naam], bw = B[1] - B[0], bh = B[3] - B[2];
  const s = Math.min((w - 30) / bw, (h - 26) / bh) * 0.92; E8.teken(ctx, naam, x - (B[0] + B[1]) / 2 * s, yb - h / 2 - (B[2] + B[3]) / 2 * s, s, { t, rontgen, heup: o.heup }); ctx.restore();
  if (rand > 0.01) { roundRect(ctx, x - w / 2, yb - h, w, h, 16); ctx.globalAlpha *= rand; ctx.strokeStyle = randKleur; ctx.lineWidth = 4; ctx.stroke(); }
  ctx.restore(); if (label) naamBij(ctx, o.titel || naam, o.meta || null, x, yb - h - (o.meta ? 46 : 14), a, 'center', rand > 0.5 ? randKleur : C.text); };

// ---------- takken ----------
E8.tak = (ctx, p, q, u = 1, o = {}) => { if (u <= 0.005) return; tak(ctx, p[0], p[1], lerp(p[0], q[0], u), lerp(p[1], q[1], u), o); };
E8.knoop = (ctx, p, a = 1, kleur = C.line, r = 9) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; knoop(ctx, p[0], p[1], kleur, r); ctx.restore(); };
E8.mix = (k1, k2, u) => { const h = (c) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; const A = h(k1), B = h(k2); u = clamp(u, 0, 1);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); };
// streepje langs een polylijn: P = punten, u = 0..1 over de hele lijn
E8.langs = (P, u) => { const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = clamp(u, 0, 1) * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const f = L[i] ? r / L[i] : 0; return [P[i], P[i + 1], clamp(f, 0, 1)]; } r -= L[i]; } };

// ---------- cladogram met scharnieren (lay-out zoals cladogram() uit lib_evo; rot = {sleutel: hoek}) ----------
E8.sleutel = (b) => Array.isArray(b) ? b.map(E8.sleutel).join('+') : b;
E8.layout = (boom, x, y, w, h, rot = {}) => { const bl = []; (function tel(b) { if (Array.isArray(b)) b.forEach(tel); else bl.push(b); })(boom);
  const dx = w / Math.max(1, bl.length - 1); let bi = 0; const diepte = (b) => Array.isArray(b) ? 1 + Math.max(...b.map(diepte)) : 0; const D = diepte(boom);
  function plaats(b) { if (!Array.isArray(b)) return { x: x + (bi++) * dx, y: y - h, naam: b }; const kids = b.map(plaats);
    return { x: kids.reduce((s, k) => s + k.x, 0) / kids.length, y: y - h + (diepte(b) / D) * h, kids, key: E8.sleutel(b) }; }
  const top = plaats(boom);
  const alle = (p, f) => { f(p); if (p.kids) p.kids.forEach(k => alle(k, f)); };
  (function draai(p) { if (!p.kids) return; const th = rot[p.key] || 0; if (th) { const c = Math.cos(th), sn = Math.sin(th); p.kids.forEach(k => alle(k, d => { const dx = d.x - p.x; d.x = p.x + dx * c; d.y = d.y - dx * sn * 0.32; })); } p.kids.forEach(draai); })(top);
  // na het draaien van de wortel weer op de oorspronkelijke plek: schuif mee
  const th0 = rot[top.key] || 0; if (th0) { const sh = (2 * x + w - 2 * top.x) * (1 - Math.cos(th0)) / 2; alle(top, d => { d.x += sh; }); }
  const L = {}, N = []; alle(top, d => { if (d.kids) N.push(d); else L[d.naam] = d; }); return { top, L, N }; };
E8.tekenLayout = (ctx, B, o = {}) => { const { a = 1, kleur = C.line, lw = 5, stomp = 50, knoopKleur = {} } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  tak(ctx, B.top.x, B.top.y, B.top.x, B.top.y + stomp, { kleur, lw });
  (function t(p) { if (!p.kids) return; for (const k of p.kids) { tak(ctx, p.x, p.y, k.x, k.y, { kleur, lw }); t(k); } })(B.top);
  for (const n of B.N) knoop(ctx, n.x, n.y, knoopKleur[n.key] || kleur, knoopKleur[n.key] ? 12 : 9); ctx.restore(); };

// ---------- boekje (Linnaeus) ----------
E8.boek = (ctx, open, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x0 = 520, x1 = 1400, xm = 960, y0 = 240, h = 560;
  roundRect(ctx, xm, y0, x1 - xm, h, 18); shape(ctx, '#E8E0CC', '#B8A888', 3);
  if (open >= 0.5) { const w = (x1 - xm) * (open - 0.5) * 2; roundRect(ctx, xm - w, y0, w, h, 18); shape(ctx, '#E8E0CC', '#B8A888', 3); }
  else { const w = (x1 - xm) * (1 - open * 2); roundRect(ctx, xm, y0 - 6, Math.max(4, w), h + 12, 14); shape(ctx, '#6A3A24', '#4A2818', 3);
    if (w > 200) { ctx.save(); ctx.font = '700 40px "Fraunces", serif'; ctx.fillStyle = rgba('#E0C88A', clamp((w - 200) / 200, 0, 1)); ctx.textAlign = 'center'; ctx.fillText('Systema Naturae', xm + w / 2, y0 + 220); ctx.restore(); } }
  ctx.strokeStyle = '#B8A888'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xm, y0 + 10); ctx.lineTo(xm, y0 + h - 10); ctx.stroke(); ctx.restore(); };

// geslachtsnaam + soortaanduiding schuin; geeft de breedte van de geslachtsnaam (+spatie) terug
E8.naam2 = (ctx, x, y, g, s2, kg, ks, a = 1, px = 88) => { ctx.save(); ctx.globalAlpha *= a; ctx.font = `italic 600 ${px}px "Source Sans 3", sans-serif`; ctx.textAlign = 'left'; ctx.fillStyle = kg; ctx.fillText(g, x, y);
  const w = ctx.measureText(g + ' ').width; ctx.fillStyle = ks; ctx.fillText(s2, x + w, y); ctx.restore(); return w; };

// gouden lijn langs een polylijn tot fractie u
E8.pad = (ctx, P, u, kleur = C.goud, lw = 8, a = 1) => { if (u <= 0.005 || a <= 0.01) return; const [p, q, f] = E8.langs(P, u); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kleur; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) { if (P[i - 1] === p) { ctx.lineTo(lerp(p[0], q[0], f), lerp(p[1], q[1], f)); break; } ctx.lineTo(P[i][0], P[i][1]); } ctx.stroke(); ctx.restore(); };
// gestippeld kader (groep omcirkelen)
E8.kader = (ctx, x, y, w, h, a = 1, kleur = C.goud) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 22); ctx.strokeStyle = kleur; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); };
// H2-boom: wortel r, knoop k, drie bladeren
E8.R = [760, 800]; E8.K = [1060, 580]; E8.BX = [420, 860, 1300]; E8.BY = 320; E8.STOMP = [760, 870];
