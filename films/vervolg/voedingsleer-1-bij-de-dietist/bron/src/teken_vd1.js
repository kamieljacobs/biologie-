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
// Hanneke links en Joost rechts aan tafel (zelfde opstelling als keyframe k2); o.cam = {s, tx, ty} = camera (wijd beeld)
// o.opTafel(ctx) tekent wat op de tafel staat; o.noor = x van Noor (staand, met schrift) of false
function praktijk(ctx, t, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; ctx.save(); ctx.globalAlpha *= a;
  if (o.cam) { ctx.translate(o.cam.tx, o.cam.ty); ctx.scale(o.cam.s, o.cam.s); }
  const r = {};
  if (o.noor && o.noorAchter) r.N = persoon(ctx, 'noor', o.noor, VLOER, 440, { t, kijk: o.noorKijk || -1, uit: o.uitN || 'neutraal', pose: 'vasthouden', hold: schriftHold });
  if (o.hanneke !== false) r.H = persoon(ctx, 'hanneke', o.xH || 640, VLOER, 470, { pose: 'zit', stoel: true, kijk: 1, uit: o.uitH || 'blij', tafel: TAFEL_Y, leun: o.leunH, t, hold: o.holdH });
  if (o.joost !== false) r.J = persoon(ctx, 'joost', o.xJ || 1280, VLOER, 480, { pose: 'zit', stoel: true, kijk: -1, outfit: 'spreekuur', uit: o.uitJ || 'neutraal', tafel: TAFEL_Y, leun: o.leunJ, t, hold: o.holdJ });
  if (o.achter) o.achter(ctx);
  tafel(ctx, 960, TAFEL_Y, 1000);
  if (o.opTafel) o.opTafel(ctx);
  if (o.noor && !o.noorAchter) r.N = persoon(ctx, 'noor', o.noor, VLOER, 440, { t, kijk: o.noorKijk || -1, uit: o.uitN || 'neutraal', pose: 'vasthouden', hold: schriftHold });
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
    naamBij(ctx, 'gewoontes', '', x2 + bw / 2 + 18, yb - h2 - hg / 2 + 12, g, 'left', C.goud); naamBij(ctx, 'doet', '', x2, yb - h2 + 50, g, 'center'); }
  ctx.save(); ctx.globalAlpha *= Math.min(1, w * 2); (o.kort ? ['WETEN'] : ['ZEGT TE WETEN', 'WAT GEZOND IS']).forEach((s2, k) => metaText(ctx, s2, x, yb + 40 + k * 30, C.text2, 'center', 22)); ctx.restore();
  ctx.save(); ctx.globalAlpha *= Math.min(1, d * 2); (o.kort ? ['DOEN'] : ['HAALT 200 G', 'GROENTE PER DAG']).forEach((s2, k) => metaText(ctx, s2, x2, yb + 40 + k * 30, C.text2, 'center', 22)); ctx.restore(); }

// ---------- H1: dagboek tegen werkelijkheid ----------
// o.h1 = hoogte 'opgeschreven', o.h2 = hoogte 'wat je echt eet' (null = lege gestippelde staaf met '?'), o.vers = verschil oplichten, o.a2 = zichtbaarheid rechterstaaf
function dagboekStaven(ctx, x, yb, o = {}) { const bw = 150, x2 = x + 280, h1 = o.h1 || 300, a1 = o.a1 == null ? 1 : o.a1, a2 = o.a2 == null ? 1 : o.a2;
  laag(ctx, a1, () => { roundRect(ctx, x - bw / 2, yb - h1, bw, h1, 10); shape(ctx, rgba(C.oker, 0.55), C.oker, 2); metaText(ctx, 'OPGESCHREVEN', x, yb + 40, C.text2, 'center', 22); });
  laag(ctx, a2, () => { const u = o.groei == null ? 0 : o.groei, h2 = lerp(h1, o.h2 || h1, u);
    roundRect(ctx, x2 - bw / 2, yb - h2, bw, h2, 10); if (u < 0.01) { ctx.setLineDash([10, 7]); shape(ctx, rgba(C.fill, 0.3), rgba(C.line, 0.9), 2); ctx.setLineDash([]); text(ctx, '?', x2, yb - h1 / 2 + 26, fTitel(72), C.goud, 'center'); }
    else shape(ctx, rgba(C.oker, 0.3), rgba(C.oker, 0.9), 2);
    const v = o.vers || 0; if (v > 0.01 && h2 > h1 + 4) { ctx.save(); ctx.globalAlpha *= v; roundRect(ctx, x2 - bw / 2, yb - h2, bw, h2 - h1, 10); shape(ctx, rgba(C.oker, 0.75), C.goud, 3); ctx.setLineDash([8, 6]); ctx.strokeStyle = rgba(C.goud, 0.9); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - bw / 2, yb - h1); ctx.lineTo(x2 + bw / 2, yb - h1); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
    metaText(ctx, 'WAT JE ECHT EET', x2, yb + 40, C.text2, 'center', 22); metaText(ctx, 'VOORBEELD', x2, yb + 70, C.grain, 'center', 22); }); }
// kaartje met een oorzaak (H1): teken(cx, cy) tekent het beeld
function oorzaakKaart(ctx, x, y, w, h, kop, sub, a, teken) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 18); shape(ctx, rgba('#0D1420', 0.85), rgba(C.oker, 0.85), 2);
  teken(x + w / 2, y + h * 0.42); text(ctx, kop, x + w / 2, y + h - 70, fTekst(40, 700), C.text, 'center'); metaText(ctx, sub, x + w / 2, y + h - 30, C.grain, 'center', 22); ctx.restore(); }
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
  metaText(ctx, 'IDEEËN', x + 30, y + 44, VD.inkt, 'left', 22); const n = o.n == null ? 3 : o.n;
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
  metaText(ctx, 'HOE VANZELF', x, y - 18, C.text2, 'left', 24); metaText(ctx, 'TIJD', x + w, y + h + 36, C.text2, 'right', 24);
  ctx.strokeStyle = C.goud; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - f(tx) * h * 0.85; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  const gr = o.grijs || 0; if (gr > 0.01) [0.14, 0.24, 0.29].forEach(tx => { if (tx > u) return; circ(ctx, x + tx * w, y + h - f(tx) * h * 0.85, 9, rgba('#9AA3B2', gr), rgba('#F2F2EE', 0.6 * gr), 1.5); });
  const tl = o.tel || 0; if (tl > 0.01) { ctx.save(); ctx.globalAlpha *= tl; ctx.setLineDash([10, 8]); ctx.strokeStyle = rgba(C.text2, 0.9); ctx.lineWidth = 3; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - (1 - Math.exp(-tx / 0.3)) * h * 0.25; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.setLineDash([]); ctx.restore(); } }
