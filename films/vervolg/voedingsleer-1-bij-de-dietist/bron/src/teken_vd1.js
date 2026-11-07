// Wat word jij? · Voeding en diëtetiek 1 · Bij de diëtist — eigen tekenfuncties (v1.0, 26 okt 2026).
// Komt in de bundel ná vd/teken_vd.js; gebruikt eten(), schijf(), tafel(), eetdagboek(), telefoonFoto(), weekbord(), gewoonteCurve() uit de reeksbibliotheek.

// ---------- hulpjes (zelfde als l1/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function vereenvoudigd(ctx, a = 1, x = 1840, y = 90) { metaA(ctx, 'VEREENVOUDIGD', x, y, a, C.grain, 'right', 26); }
// terugverwijskaartje naar een andere film (zoals lb3)
function filmKaartje(ctx, x, y, s2, a = 1, w = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = w || ctx.measureText(s2).width + 120; roundRect(ctx, x, y, ww, 56, 12); shape(ctx, rgba('#0D1420', 0.85), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 50, y + 28); ctx.lineTo(x + 26, y + 40); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 62, y + 24, C.text2, 'left', 14); text(ctx, s2, x + 62, y + 46, fTekst(24, 700), C.text, 'left'); ctx.restore(); }
// zoomcirkel die opent of sluit: alles binnen de cirkel (r) zichtbaar, buiten navy; gouden rand
function cirkelOpen(ctx, cx, cy, r, fn) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.clip(); fn(); ctx.restore(); if (r < 1300) { ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.283); ctx.stroke(); ctx.restore(); } }

// ---------- de praktijk ----------
// decor praktijk volgt (ElevenLabs, credits op): tekent nu niets, het navy blijft
function praktijkDecor(ctx, a = 0.6) { vdDecor(ctx, a); }
const VLOER = 870, TAFEL_Y = 700;
// Noor met haar schrift (ze loopt een dag mee)
function schriftHold(c, x, y) { c.save(); c.translate(x, y); c.rotate(-0.15); roundRect(c, -6, -44, 58, 46, 4); shape(c, '#E8E2D2', '#C8C0AC', 1.5); c.strokeStyle = rgba(VD.inkt, 0.5); c.lineWidth = 1.5; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(4, -32 + k * 11); c.lineTo(42, -32 + k * 11); c.stroke(); } c.restore(); }
// telefoon in de hand
function telefoonHold(c, x, y) { roundRect(c, x - 14, y - 50, 32, 56, 6); shape(c, '#2E3442', '#8FA0B5', 1.5); roundRect(c, x - 10, y - 45, 24, 44, 3); c.fillStyle = '#9CC4E0'; c.fill(); }
// persoonX (beeldreview 1, 26 okt 2026): persoon() uit het castboek met twee extra opties, alleen in deze film (castboek zelf ongewijzigd):
//   o.armDoel = { R: {dx, dy, k1, k2}, L: {…} } → die hand naar een doel in kopmaten t.o.v. de schouder (dx naar buiten, dy omlaag), elleboog naar buiten-omlaag;
//   R = arm aan de kijkkant. Werkt ook zittend (overschrijft dan 'handen op tafel'). k1/k2 = verkorting boven-/onderarm.
//   o.knik = hoek (rad): hoofd iets gekanteld en een beetje gezakt (luisteren, meekijken, zich rot voelen).
const persoonX = (function () { try { let s = persoon.toString(); const a = 'const handR = arm(kijk, R), handL = arm(-kijk, L);', b = '  // --- hoofd\n';
  if (!s.includes(a) || !s.includes(b)) return persoon;
  s = s.replace(a, "if (o.armDoel) for (const [kk, ss] of [['R', kijk], ['L', -kijk]]) { const d = o.armDoel[kk]; if (!d) continue; const k1 = d.k1 || 0.85, k2 = d.k2 || 0.75, A1 = hh * 1.32 * (P.armK || 1), A2 = hh * 1.2 * (P.armK || 1); const ik = _ikUit(d.dx * hh, d.dy * hh, A1 * k1, A2 * k2); if (kk === 'R') R = [ik[0], ik[1], k1, k2]; else L = [ik[0], ik[1], k1, k2]; }\n  " + a);
  s = s.replace(b, b + "  if (o.knik) { const _kn = Math.min(1, Math.abs(o.knik) / 0.12); ctx.translate(cx, schouderY + hh * 0.07 * _kn); ctx.rotate(o.knik); ctx.translate(-cx, -schouderY); }\n");
  return (0, eval)('(' + s + ')'); } catch (e) { return persoon; } })();
// spreekballon (uitgesproken zin) met een staartje naar de mond (mx, my); tekst op max. 2 regels
function spreek(ctx, x, y, w, h, s2, a, mx, my, px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const col = '#F2F2EE';
  const onder = my > y + h, bx = clamp(mx, x + 50, x + w - 50), by = onder ? y + h - 4 : y + 4, dx = mx - bx, dy = my - by, L = Math.hypot(dx, dy) || 1, k = Math.max(0, L - 34) / L;
  ctx.beginPath(); ctx.moveTo(bx - 20, by); ctx.lineTo(bx + dx * k, by + dy * k); ctx.lineTo(bx + 20, by); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  roundRect(ctx, x, y, w, h, 24); ctx.fillStyle = col; ctx.fill();
  ctx.font = fTekst(px, 600); const ws = s2.split(' '); let l1 = '', l2 = ''; for (const wd of ws) { if (!l2 && ctx.measureText(l1 ? l1 + ' ' + wd : wd).width < w - 50) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; }
  const cy = y + h / 2 + px * 0.35; if (l2) { text(ctx, l1, x + w / 2, cy - px * 0.62, fTekst(px, 600), '#121A26', 'center'); text(ctx, l2, x + w / 2, cy + px * 0.62, fTekst(px, 600), '#121A26', 'center'); } else text(ctx, l1, x + w / 2, cy, fTekst(px, 600), '#121A26', 'center');
  ctx.restore(); }
// mond van een persoon (uit het ankerpunt hoofd)
function mond(r) { return r && r.hoofd ? [r.hoofd.x, r.hoofd.y + r.hoofd.r * 0.55] : [960, 500]; }
// naam met een donker plaatje erachter (tegen het lichte raam van het decor)
function naamDonker(ctx, name, meta, x, y, a = 1, align = 'center') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(36, 600); let w = ctx.measureText(name).width; if (meta) { ctx.font = fMeta(26); ctx.letterSpacing = '3px'; w = Math.max(w, ctx.measureText(meta.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():''))).width); ctx.letterSpacing = '0px'; }
  const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0 - 18, y - 40, w + 36, meta ? 84 : 54, 12); shape(ctx, rgba('#0D1420', 0.78), null); ctx.restore(); naamBij(ctx, name, meta, x, y, a, align); }
// Noor loopt mee: schrift tegen de borst (hand aan de kijkkant), pen in de andere hand; o.noorKnik = hoofd schuin (meekijken)
function noorMee(ctx, x, t, o = {}) { const kijk = o.noorKijk || -1, hh = 440 * 0.97 / 6.1;
  const r = persoonX(ctx, 'noor', x, VLOER, 440, { t, kijk, uit: o.uitN || 'neutraal', knik: o.noorKnik || 0, armDoel: { R: { dx: -0.8, dy: 0.95, k1: 0.8, k2: 0.75 } } });
  if (r.handL) { ctx.save(); ctx.translate(r.handL.x, r.handL.y); ctx.rotate(-kijk * 0.25); roundRect(ctx, -4, -34, 8, 52, 3); shape(ctx, '#3A6A9A', '#6A9AC8', 1); ctx.beginPath(); ctx.moveTo(-4, 18); ctx.lineTo(0, 27); ctx.lineTo(4, 18); ctx.closePath(); ctx.fillStyle = '#D9C9A8'; ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.ellipse(r.handL.x, r.handL.y, hh * 0.17, hh * 0.14, 0, 0, 6.283); ctx.fillStyle = CAST.noor.huid; ctx.fill(); }
  if (r.handR) { const hx = r.handR.x, hy = r.handR.y; ctx.save(); ctx.translate(hx - kijk * 6, hy - 36); ctx.rotate(kijk * 0.1); roundRect(ctx, -34, -46, 68, 92, 5); shape(ctx, '#5B7FA8', '#7FA0C4', 1.5); roundRect(ctx, -20, -30, 40, 18, 3); ctx.fillStyle = rgba('#F2F2EE', 0.85); ctx.fill(); ctx.fillStyle = rgba('#000', 0.18); ctx.fillRect(-34, -46, 8, 92); ctx.restore();
    ctx.beginPath(); ctx.ellipse(hx, hy, hh * 0.17, hh * 0.14, 0, 0, 6.283); ctx.fillStyle = CAST.noor.huid; ctx.fill(); }
  return r; }
// hand opnieuw tekenen boven een voorwerp (de hand houdt het vast)
function handOp(ctx, id, p, s = 1) { if (!p) return; const hh = 480 / 6.1; ctx.beginPath(); ctx.ellipse(p.x, p.y, hh * 0.18 * s, hh * 0.15 * s, p.ang || 0, 0, 6.283); ctx.fillStyle = CAST[id].huid; ctx.fill(); }
// telefoon in de hand (rot = kanteling), scherm naar de kijker
function telefoonIn(ctx, x, y, rot = 0, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -17, -34, 34, 62, 6); shape(ctx, '#2E3442', '#8FA0B5', 1.5); roundRect(ctx, -13, -29, 26, 50, 3); ctx.fillStyle = '#9CC4E0'; ctx.fill(); ctx.restore(); }
// telefoon aan het oor: de hand (armDoel) staat bij het oor; telefoon schuin langs de wang, hand eroverheen
function belt(ctx, id, r, kijk) { if (!r.handR || !r.hoofd) return; const hx = r.handR.x, hy = r.handR.y; telefoonIn(ctx, hx + kijk * 10, hy - 6, -kijk * 0.18, 0.95); handOp(ctx, id, { x: hx + kijk * 12, y: hy + 10, ang: 1.2 }, 0.95); }
// dagboek plat op tafel (van voren gezien: platgedrukt)
function dagboekPlat(ctx, x, y, s = 0.55) { ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.3); eetdagboek(ctx, 0, 0, s, { iconen: 1 }); ctx.restore(); }
// weegschaal: van bovenaf met leeg display (zoom) of plat op de vloer (persp = platdrukken)
function weegschaalBoven(ctx, x, y, s = 1, persp = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s * persp); roundRect(ctx, -90, -90, 180, 180, 26); shape(ctx, '#C4CCD8', '#E8EEF4', 2);
  roundRect(ctx, -40, -76, 80, 30, 6); ctx.fillStyle = '#2E3442'; ctx.fill(); roundRect(ctx, -34, -71, 68, 20, 3); ctx.fillStyle = '#4A5468'; ctx.fill();
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 36, 22, 24, 46, sx * 0.08, 0, 6.283); ctx.fillStyle = rgba('#9AA6B8', 0.6); ctx.fill(); } ctx.restore(); }
// Hanneke links en Joost rechts aan tafel (zelfde opstelling als keyframe k2); o.cam = {s, tx, ty} = camera (wijd beeld)
// o.opTafel(ctx) tekent wat op de tafel staat; o.noor = x van Noor (staand, schrift tegen de borst) of false; o.optH / o.optJ = extra opties (armDoel, knik)
function praktijk(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  if (o.cam) { ctx.translate(o.cam.tx, o.cam.ty); ctx.scale(o.cam.s, o.cam.s); }
  const r = {};
  if (o.noor && o.noorAchter) r.N = noorMee(ctx, o.noor, t, o);
  if (o.hanneke !== false) r.H = persoonX(ctx, 'hanneke', o.xH || 640, VLOER, 470, Object.assign({ pose: 'zit', stoel: true, kijk: 1, uit: o.uitH || 'blij', tafel: TAFEL_Y, leun: o.leunH, t, hold: o.holdH }, o.optH || {}));
  if (o.joost !== false) r.J = persoonX(ctx, 'joost', o.xJ || 1280, VLOER, 480, Object.assign({ pose: 'zit', stoel: true, kijk: -1, outfit: 'spreekuur', uit: o.uitJ || 'neutraal', tafel: TAFEL_Y, leun: o.leunJ, t, hold: o.holdJ }, o.optJ || {}));
  if (o.achter) o.achter(ctx);
  tafel(ctx, 960, TAFEL_Y, 1000);
  if (o.opTafel) o.opTafel(ctx, r);
  if (o.noor && !o.noorAchter) r.N = noorMee(ctx, o.noor, t, o);
  ctx.restore(); return r; }
// camera wijd (cold open en recap): de praktijk links in beeld, ruimte rechts voor de staven
const CAM_WIJD = { s: 0.7, tx: 100 - 0.7 * 460, ty: VLOER - 0.7 * VLOER };
function camMix(u) { u = ease(u); return { s: lerp(CAM_WIJD.s, 1, u), tx: lerp(CAM_WIJD.tx, 0, u), ty: lerp(CAM_WIJD.ty, 0, u) }; }
// rond bord op tafel (vooraanzicht: platte ellips), optioneel met een beetje eten
function bordTafel(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 92 * s, 24 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#F2F2EE', 1.5); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 60 * s, 14 * s, 0, 0, 6.283); ctx.strokeStyle = rgba('#9AA3B2', 0.7); ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
// los vel papier (staat schuin op tafel, zoals het dagboek), lijnen = aantal regels; hl = index van de regel die oplicht
function velPapier(ctx, x, y, w, h, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot); roundRect(ctx, -w / 2, -h / 2, w, h, 6); shape(ctx, VD.papier, VD.papierR, 1.5);
  const n = o.lijnen || 5; for (let k = 0; k < n; k++) { const yy = -h / 2 + h * (k + 1) / (n + 1); ctx.strokeStyle = rgba(VD.inkt, 0.45); ctx.lineWidth = Math.max(1.5, h / 90); ctx.beginPath(); ctx.moveTo(-w * 0.38, yy); ctx.lineTo(-w * 0.38 + w * (0.55 + 0.2 * hash(k * 3.1 + (o.zaad || 0))), yy); ctx.stroke(); }
  ctx.restore(); }
// dicht schrift / dagboek (anoniem), van voren
function dichtBoek(ctx, x, y, s, kleur, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 70 * s, y - 95 * s, 140 * s, 190 * s, 8 * s); shape(ctx, kleur, lighten(kleur, 0.3), 1.5); roundRect(ctx, x - 40 * s, y - 60 * s, 80 * s, 34 * s, 4 * s); shape(ctx, rgba('#F2F2EE', 0.8), null); ctx.fillStyle = rgba('#000', 0.18); ctx.fillRect(x - 70 * s, y - 95 * s, 12 * s, 190 * s); ctx.restore(); }

// ---------- cold open en recap: de kloof tussen weten en doen ----------
// o.w, o.d = groei (0..1) van de staven, o.gw = 'gewoontes' (recap), o.kort = korte labels WEET/DOET
function kloofStaven(ctx, x, yb, hMax, o = {}) { const bw = 150, x2 = x + 260, h1 = hMax * 0.91, h2 = hMax * 0.29, w = o.w || 0, d = o.d || 0;
  if (w > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, w * 2); roundRect(ctx, x - bw / 2, yb - h1 * w, bw, h1 * w, 10); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); ctx.restore();
    naamBij(ctx, o.kort ? 'weet' : '9 op de 10', '', x, yb - h1 * w - 22, w, 'center'); }
  if (d > 0.01) { ctx.save(); ctx.globalAlpha *= Math.min(1, d * 2); roundRect(ctx, x2 - bw / 2, yb - h2 * d, bw, h2 * d, 10); shape(ctx, rgba(C.groen, 0.55), C.groen, 2); ctx.restore();
    if (!(o.gw > 0.3)) naamBij(ctx, o.kort ? 'doet' : '± 3 op de 10', '', x2, yb - h2 * d - 22, d, 'center'); }
  const g = o.gw || 0; if (g > 0.01) { const hg = (h1 - h2) * 0.45 * ease(g); ctx.save(); ctx.globalAlpha *= g; roundRect(ctx, x2 - bw / 2, yb - h2 - hg, bw, hg, 8); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.goud, 0.22), C.goud, 2.5); ctx.setLineDash([]); ctx.restore();
    naamBij(ctx, 'gewoontes', '', x2 + bw / 2 + 18, yb - h2 - hg / 2 + 12, g, 'left', C.goud); naamBij(ctx, 'doet', '', x2, yb - h2 / 2 + 12, g, 'center'); }
  if (o.kort) return; // recap: alleen 'weet' en 'doet' boven de staven (geen dubbele mono-labels)
  ctx.save(); ctx.globalAlpha *= Math.min(1, w * 2); ['ZEGT TE WETEN', 'WAT GEZOND IS'].forEach((s2, k) => metaText(ctx, s2, x, yb + 42 + k * 32, C.text2, 'center', 26)); ctx.restore();
  ctx.save(); ctx.globalAlpha *= Math.min(1, d * 2); ['HAALT 200 G', 'GROENTE', 'PER DAG'].forEach((s2, k) => metaText(ctx, s2, x2, yb + 42 + k * 32, C.text2, 'center', 26)); ctx.restore(); }

// ---------- H1: dagboek tegen werkelijkheid ----------
// o.h1 = hoogte 'opgeschreven', o.h2 = hoogte 'wat je echt eet' (null = lege gestippelde staaf met '?'), o.vers = verschil oplichten, o.a2 = zichtbaarheid rechterstaaf
function dagboekStaven(ctx, x, yb, o = {}) { const bw = 150, x2 = x + 280, h1 = o.h1 || 300, a1 = o.a1 == null ? 1 : o.a1, a2 = o.a2 == null ? 1 : o.a2;
  laag(ctx, a1, () => { roundRect(ctx, x - bw / 2, yb - h1, bw, h1, 10); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); metaText(ctx, 'OPGESCHREVEN', x, yb + 40, C.text2, 'center', 26); });
  laag(ctx, a2, () => { const u = o.groei == null ? 0 : o.groei, h2 = lerp(h1, o.h2 || h1, u);
    roundRect(ctx, x2 - bw / 2, yb - h2, bw, h2, 10); if (u < 0.01) { ctx.setLineDash([10, 7]); shape(ctx, rgba(C.fill, 0.3), rgba(C.line, 0.9), 2); ctx.setLineDash([]); text(ctx, '?', x2, yb - h1 / 2 + 26, fTitel(72), C.goud, 'center'); }
    else shape(ctx, rgba(C.oker, 0.3), rgba(C.oker, 0.9), 2);
    const v = o.vers || 0; if (v > 0.01 && h2 > h1 + 4) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x2 - bw / 2, yb - h2, bw, h2 - h1, 10); shape(ctx, rgba(C.oker, 0.75), C.goud, 3); ctx.setLineDash([8, 6]); ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - bw / 2, yb - h1); ctx.lineTo(x2 + bw / 2, yb - h1); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    metaText(ctx, 'WAT JE ECHT EET', x2, yb + 40, C.text2, 'center', 26); metaText(ctx, 'VOORBEELD', x2, yb + 72, C.grain, 'center', 24); }); }
// kaartje met een oorzaak (H1): teken(cx, cy) tekent het beeld
function oorzaakKaart(ctx, x, y, w, h, kop, sub, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.oker, 0.85), 2);
  teken(x + w / 2, y + h * 0.42); text(ctx, kop, x + w / 2, y + h - 70, fTekst(40, 700), C.text, 'center'); metaText(ctx, sub, x + w / 2, y + h - 28, C.grain, 'center', 24); ctx.restore(); }
function melkWolkje(ctx, x, y, s = 1) { ctx.beginPath(); ctx.ellipse(x, y, 22 * s, 8 * s, 0, 0, 6.283); ctx.fillStyle = '#EDE4D2'; ctx.fill(); ctx.strokeStyle = '#EDE4D2'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 8 * s, y - 2 * s); ctx.quadraticCurveTo(x + 4 * s, y - 18 * s, x + 14 * s, y - 6 * s); ctx.stroke(); }
// melkpakje (klein)
function melkPak(ctx, x, y, s = 1, a = 1, dash = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 22 * s, y + 40 * s); ctx.lineTo(x - 22 * s, y - 24 * s); ctx.lineTo(x, y - 44 * s); ctx.lineTo(x + 22 * s, y - 24 * s); ctx.lineTo(x + 22 * s, y + 40 * s); ctx.closePath();
  if (dash) { ctx.setLineDash([6, 5]); shape(ctx, rgba('#F2F2EE', 0.08), rgba('#F2F2EE', 0.85), 2.5); ctx.setLineDash([]); } else { shape(ctx, '#F2F2EE', '#FFFFFF', 1.2); ctx.fillStyle = '#5B9AC0'; ctx.fillRect(x - 22 * s, y + 4 * s, 44 * s, 18 * s); } ctx.restore(); }
// pen
function pen(ctx, x, y, s = 1, rot = -0.6) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -6 * s, -60 * s, 12 * s, 100 * s, 4 * s); shape(ctx, '#3A6A9A', '#6A9AC8', 1.2); ctx.beginPath(); ctx.moveTo(-6 * s, 40 * s); ctx.lineTo(0, 56 * s); ctx.lineTo(6 * s, 40 * s); ctx.closePath(); ctx.fillStyle = '#D9C9A8'; ctx.fill(); ctx.restore(); }

// ---------- H2: de schijf ----------
const SCH = { cx: 860, cy: 460, R: 280 };
function vakMidden(i, cx = SCH.cx, cy = SCH.cy, R = SCH.R) { const am = -Math.PI / 2 + (i + 0.5) * 2 * Math.PI / 5, rm = (R + R * 0.32) / 2; return [cx + Math.cos(am) * rm, cy + Math.sin(am) * rm]; }
// commissietafel: studies die naast elkaar worden gelegd (vlak, zonder gezichten)
function studieVel(ctx, x, y, s, a, k) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((hash(k * 5.3) - 0.5) * 0.12); roundRect(ctx, -60 * s, -80 * s, 120 * s, 160 * s, 6); shape(ctx, VD.papier, VD.papierR, 1.5);
  ctx.strokeStyle = rgba(VD.inkt, 0.45); ctx.lineWidth = 2; for (let l = 0; l < 3; l++) { ctx.beginPath(); ctx.moveTo(-44 * s, -58 * s + l * 16 * s); ctx.lineTo(-44 * s + (60 + 24 * hash(k + l)) * s, -58 * s + l * 16 * s); ctx.stroke(); }
  for (let b = 0; b < 4; b++) { const hh = (14 + 34 * hash(k * 2.7 + b)) * s; ctx.fillStyle = b === (k % 4) ? rgba(C.groen, 0.85) : rgba(VD.inkt, 0.45); ctx.fillRect(-40 * s + b * 22 * s, 60 * s - hh, 14 * s, hh); } ctx.restore(); }
// commissietafel in lichte perspectief: tafelblad waar de studies op liggen, voorrand en poten
function commissieTafel(ctx) { ctx.beginPath(); ctx.moveTo(330, 470); ctx.lineTo(1590, 470); ctx.lineTo(1680, 640); ctx.lineTo(240, 640); ctx.closePath(); shape(ctx, lighten(VD.hout, 0.12), VD.houtR, 1.5);
  roundRect(ctx, 240, 640, 1440, 24, 6); shape(ctx, VD.hout, VD.houtR, 1.5); ctx.fillStyle = VD.hout; ctx.fillRect(290, 664, 16, 170); ctx.fillRect(1614, 664, 16, 170); }
// buikomvang in de zoomcirkel: Joosts romp van dichtbij met een meetlint om het middel (geen getallen)
function buikZoom(ctx, cx, cy, t) { const H = 760, hh = H / 6.1; persoon(ctx, 'joost', cx, cy + 10 + hh * 3.1, H, { t, kijk: -1, outfit: 'spreekuur', uit: 'neutraal' });
  const ty = cy + 6; ctx.save(); ctx.lineCap = 'butt'; ctx.strokeStyle = '#E0C860'; ctx.lineWidth = 24; ctx.beginPath(); ctx.moveTo(cx - 175, ty - 10); ctx.quadraticCurveTo(cx, ty + 30, cx + 175, ty - 10); ctx.stroke();
  ctx.strokeStyle = '#4A4E5E'; ctx.lineWidth = 2; for (let k = -12; k <= 12; k++) { const u = (k + 12) / 24, x = cx - 175 + 350 * u, y = (1 - u) * (1 - u) * (ty - 10) + 2 * (1 - u) * u * (ty + 30) + u * u * (ty - 10); ctx.beginPath(); ctx.moveTo(x, y - 12); ctx.lineTo(x, y - (k % 5 ? 4 : -2)); ctx.stroke(); }
  roundRect(ctx, cx + 40, ty - 4, 46, 34, 6); shape(ctx, '#D8B840', '#F0DC88', 1.2); ctx.restore(); }
// ziektekaartje: tekst met een pijl omlaag (minder kans)
function ziekteKaart(ctx, x, y, w, s2, a, dik) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 44, w, 76, 14); shape(ctx, rgba('#0D1420', 0.85), dik ? C.groen : rgba(C.groen, 0.6), dik ? 3 : 1.5);
  text(ctx, '↓', x + 36, y + 10, fTekst(44, 800), C.groen, 'center'); text(ctx, s2, x + 70, y + 8, fTekst(36, 600), C.text, 'left'); ctx.restore(); }

// ---------- H3 ----------
// twee pijlen: tegen elkaar (koraal) of naast elkaar in dezelfde richting (goud)
function pijlPaar(ctx, cx, y, mee, a = 1) { if (a <= 0.01) return; const col = mee ? C.goud : C.koraal;
  if (!mee) { pijl(ctx, cx - 200, y, cx - 14, y, col, a, 8, 30); pijl(ctx, cx + 200, y, cx + 14, y, col, a, 8, 30); }
  else { pijl(ctx, cx - 200, y - 26, cx + 120, y - 26, col, a, 8, 30); pijl(ctx, cx - 120, y + 26, cx + 200, y + 26, col, a, 8, 30); } }
// adviesvel: drie keuzes, hl = gekozen regel (0..1), vk = vinkje
const ADVIES = ['tomaatjes bij de tv', 'fruit bij de lunch', 'soep bij het avondeten'];
function adviesVel(ctx, x, y, a, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, 460, 250, 12); shape(ctx, VD.papier, VD.papierR, 2);
  metaText(ctx, 'IDEEËN', x + 30, y + 44, VD.inkt, 'left', 24); const n = o.n == null ? 3 : o.n;
  ADVIES.forEach((s2, k) => { const u = clamp(n - k, 0, 1); if (u <= 0.01) return; const yy = y + 100 + k * 56; ctx.save(); ctx.globalAlpha *= u;
    if (k === 0 && (o.hl || 0) > 0.01) { roundRect(ctx, x + 18, yy - 38, 424, 52, 10); ctx.fillStyle = rgba(C.goud, 0.35 * o.hl); ctx.fill(); ctx.strokeStyle = rgba(C.goud, o.hl); ctx.lineWidth = 3; ctx.stroke(); }
    text(ctx, '· ' + s2, x + 34, yy, fTekst(32, 600), '#1A2740', 'left'); ctx.restore(); });
  if ((o.vk || 0) > 0.01) vink_(ctx, x + 410, y + 86, 18, o.vk, '#3E8A50'); ctx.restore(); }

// ---------- H4 ----------
function tvIcoon(ctx, x, y, s = 1, a = 1, aan = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80 * s, y - 56 * s, 160 * s, 104 * s, 10 * s); shape(ctx, '#2E3442', '#8FA0B5', 2);
  roundRect(ctx, x - 68 * s, y - 45 * s, 136 * s, 82 * s, 4 * s); ctx.fillStyle = aan > 0.5 ? rgba(C.teal, 0.55) : '#1E232C'; ctx.fill(); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 70 * s); ctx.lineTo(x, y + 48 * s); ctx.lineTo(x + 30 * s, y + 70 * s); ctx.stroke(); ctx.restore(); }
function bakjeTomaatjes(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; [[-26, -16], [0, -26], [24, -14], [-10, -8], [12, -6]].forEach(p => eten(ctx, 'tomaat', x + p[0] * s, y + p[1] * s, 0.42 * s));
  ctx.beginPath(); ctx.moveTo(x - 58 * s, y - 10 * s); ctx.quadraticCurveTo(x, y + 56 * s, x + 58 * s, y - 10 * s); ctx.closePath(); shape(ctx, '#D9D2C2', '#F2F2EE', 1.5); ctx.restore(); }
// als-dan-kaart: tv → bakje tomaatjes
function alsDanKaart(ctx, x, y, w, regel1, regel2, a, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 200, 18); shape(ctx, rgba('#0D1420', 0.88), C.goud, 2.5);
  text(ctx, regel1, x + 34, y + 76, fTekst(36, 700), C.text, 'left'); text(ctx, regel2, x + 34, y + 136, fTekst(36, 700), C.goud, 'left');
  if (o.teken) o.teken(x + w - 120, y + 100); ctx.restore(); }
// rustige gewoontecurve met overgeslagen avonden (H4): loopt gewoon door; tel = 'telkens overslaan' (stippellijn die laag blijft)
function doorloopCurve(ctx, x, y, w, h, o = {}) { const u = o.u == null ? 1 : o.u, f = tx => 1 - Math.exp(-tx / 0.3);
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  metaText(ctx, 'HOE VANZELF', x, y - 18, C.text2, 'left', 26); metaText(ctx, 'TIJD', x + w, y + h + 38, C.text2, 'right', 26);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - f(tx) * h * 0.85; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  const gr = o.grijs || 0; if (gr > 0.01) [0.14, 0.24, 0.29].forEach(tx => { if (tx > u) return; circ(ctx, x + tx * w, y + h - f(tx) * h * 0.85, 9, rgba('#9AA3B2', gr), rgba('#F2F2EE', 0.6 * gr), 1.5); });
  const tl = o.tel || 0; if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.text2, 0.9); ctx.lineWidth = 3; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - (1 - Math.exp(-tx / 0.3)) * h * 0.25; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }
