// ===== Benchmarkscène (prompt v9, B15) =====
// Eén vaste scène van ± 21 s waarop elke grote animatiemutatie eerst wordt uitgeprobeerd:
// Noor neemt een hap van een broodje kaas → röntgenblik → de hap gaat naar de dunne darm →
// doorlopende zoom tot in de darmwand → in de holte knipt een enzym zetmeel in losse glucose.
// Alle varianten delen dit draaiboek; alleen de manier van tekenen en bewegen verschilt (zie render.js).
//
// Wereld (niveau 1) = 1920×1080 met camera; niveau 2 (darmwand) en 3 (moleculen) in schermmaat, zodat lijnen dun blijven.

const DUUR = 21;
// lib_anatomie verwacht dot() (staat in de films in helpers1.js)
function dot(ctx, x, y, r, fill, stroke, lw = 1.2) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } }
// S = instellingen van de variant (render.js vult ze in)
const S = { anim: 'basis', rijk: false, id: 'nu' };

// ---------- noor en haar lichaam ----------
const NOOR = { x: 700, y: 1000, h: 860 };
function noorMaat() { return rompMaat('noor', NOOR.x, NOOR.y, NOOR.h); }
// anatomie (lib_anatomie) uitgelijnd op Noors romp: schouder en kruis op dezelfde hoogte
function zetBody() { const m = noorMaat(); const HHa = m.hh * 0.93; const top = m.schouder - 1.42 * HHa; BODY = { cx: m.cx, yb: top + 7.3 * HHa, h: 7.3 * HHa }; return HHa; }
var BODY = { cx: 700, yb: 1000, h: 860 };

// ---------- bewegingscurven per variant ----------
// basis = wat we nu doen (smoothstep); pro = animatieprincipes (anticipatie, overshoot, naslingeren)
function rampB(t, t0, d) { return ease((t - t0) / d); }
function veer(u, k = 1) { u = clamp(u, 0, 1); if (u >= 1) return 1; return 1 - Math.exp(-6 * u) * Math.cos(9.5 * u * k); } // overshoot + uitdempen
function antic(u, diep = 0.12) { u = clamp(u, 0, 1); // eerst iets terug, dan door
  if (u < 0.22) { const v = u / 0.22; return -diep * Math.sin(v * Math.PI / 2); } const v = (u - 0.22) / 0.78; return lerp(-diep, 1, 1 - Math.pow(1 - v, 3)) + (v > 0.85 ? 0 : 0); }
function beweeg(t, t0, d, soort = 'zacht') { const u = (t - t0) / d; if (S.anim !== 'pro') return ease(u);
  if (soort === 'veer') return veer(u); if (soort === 'antic') { const a = antic(u); return u >= 1 ? 1 : a; } return ease(u); }

// ---------- camera ----------
// niveau 1: schaal s van 1 tot ZMAX, focus van het midden naar het stukje dunne darm
const ZOOM = { t0: 9.0, t1: 13.2, zmax: 70 };
function darmDoel() { zetBody(); const [x, y] = AP(0.02, 3.36); return [x, y]; }
function camera(t) {
  const [dx, dy] = darmDoel();
  // lichte push-in tijdens de röntgenblik
  const push = 1 + 0.18 * rampB(t, 5.4, 2.6);
  let u = clamp((t - ZOOM.t0) / (ZOOM.t1 - ZOOM.t0), 0, 1);
  if (S.anim === 'pro') u = u < 0.08 ? -0.02 * Math.sin(u / 0.08 * Math.PI) : u; // kleine anticipatie: even terugdeinzen
  const ue = u <= 0 ? u : (1 - Math.cos(Math.PI * clamp(u, 0, 1))) / 2;
  const s = push * Math.exp(Math.log(ZOOM.zmax / push) * Math.max(0, ue)) * (u < 0 ? 1 + u : 1);
  const f = clamp(ue * 1.6, 0, 1); const fx = lerp(lerp(NOOR.x + 40, dx, rampB(t, 5.4, 2.6) * 0.5), dx, f), fy = lerp(lerp(560, dy, rampB(t, 5.4, 2.6) * 0.5), dy, f);
  return { s, fx, fy, sx: 960, sy: 470 };
}
function naarScherm(c, x, y) { return [c.sx + (x - c.fx) * c.s, c.sy + (y - c.fy) * c.s]; }

// ---------- het broodje ----------
// echt formaat: ± 15 cm tegen 1,65 m → breedte 0,09 × lengte (broodje() is 248 px breed bij s = 1)
function broodjeS() { return NOOR.h * 0.09 / 248; }
function broodjeMetHap(ctx, x, y, s, rot, hap, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  if (hap > 0) { ctx.beginPath(); ctx.rect(-200 * s, -140 * s, 400 * s, 260 * s); ctx.arc(128 * s, -30 * s, 62 * s * hap, 0, 6.283, true); ctx.clip('evenodd'); }
  if (o.schaduw) { ctx.save(); ctx.globalAlpha *= 0.35; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(6 * s, 44 * s, 120 * s, 14 * s, 0, 0, 6.283); ctx.fill(); ctx.restore(); }
  broodje(ctx, 0, 0, s);
  if (S.rijk) broodjeRijk(ctx, s, hap);
  ctx.restore();
}

// ---------- niveau 1: Noor eet, röntgenblik, de hap reist ----------
const T_HAP = 3.0;   // moment van de hap
function eetFase(t) { // 0 = broodje voor de borst, 1 = broodje bij de mond
  const omhoog = beweeg(t, 1.0, 1.7, 'antic'), omlaag = beweeg(t, 4.0, 1.3, 'veer');
  return clamp(omhoog, -0.2, 1.1) * (1 - omlaag);
}
function noorScene(ctx, t, xray) {
  const m = noorMaat(); const hh = m.hh; const sw = m.breed;
  const sx = m.cx + sw * 0.4, sy = m.schouder + hh * 0.25; // rechterarm aan de kant van de kijker (kijk 1)
  const L1 = hh * 1.32, L2 = hh * 1.2;
  const mondX = m.cx + hh * 0.03, mondY = m.hoofd + hh * 0.36;
  const e = eetFase(t);
  // doel van de hand: voor de borst → voor de mond
  let hx = lerp(m.cx + hh * 0.75, mondX + hh * 0.42, e), hy = lerp(m.schouder + hh * 1.75, mondY + hh * 0.18, e);
  if (S.anim === 'pro') { // secundaire beweging: hoofd buigt mee naar de hap, hand trilt na
    const naklank = Math.exp(-4 * Math.max(0, t - T_HAP)) * Math.sin(Math.max(0, t - T_HAP) * 18) * hh * 0.05 * (t > T_HAP ? 1 : 0); hy += naklank; }
  // twee-bot-IK (elleboog naar buiten-onder)
  const dx = hx - sx, dy = hy - sy, d = Math.min(Math.hypot(dx, dy), L1 + L2 - 1);
  const a = Math.atan2(dy, dx), b = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const ex = sx + Math.cos(a - b) * L1, ey = sy + Math.sin(a - b) * L1;
  const a1 = Math.atan2(ex - sx, ey - sy), a2 = Math.atan2(hx - ex, hy - ey);
  POSES.__eet = { R: [a1, a2], L: [0.12, 0.08] };
  // hoofd buigt licht naar de hap (alleen pro): we schuiven het hele lijf niet, alleen een kleine knik via de mond-uitdrukking
  const kauwt = t > T_HAP + 0.15 && t < T_HAP + 2.6;
  const uit = kauwt ? 'praat' : (t > 0.6 && t < T_HAP ? 'blij' : 'neutraal');
  const tt = kauwt ? t * 0.5 : t;
  const shirtA = 1 - 0.55 * xray;
  ctx.save();
  if (S.anim === 'pro') { // squash and stretch: lijf veert heel licht op de hap
    const sq = t > T_HAP ? Math.exp(-5 * (t - T_HAP)) * Math.sin((t - T_HAP) * 14) * 0.012 : 0; ctx.translate(NOOR.x, NOOR.y); ctx.scale(1 + sq, 1 - sq); ctx.translate(-NOOR.x, -NOOR.y); }
  persoon(ctx, 'noor', NOOR.x, NOOR.y, NOOR.h, { pose: '__eet', uit, kijk: 1, t: tt, a: 1 });
  // röntgen: romp wordt doorzichtig, organen verschijnen op hun echte plek
  if (xray > 0.01) {
    ctx.save(); rompPad(ctx, m); ctx.clip();
    ctx.fillStyle = rgba('#0D1420', 0.55 * xray); ctx.fillRect(m.cx - sw, m.schouder - hh, sw * 2, hh * 4);
    const HHa = zetBody(); const oud = window.ctx; window.ctx = ctx;
    ctx.save(); ctx.globalAlpha *= xray; liver(0.85); pancreas(0.85); anDigest(1, t); if (S.rijk) darmRijkL1(ctx, t); ctx.restore();
    window.ctx = oud; ctx.restore();
  }
  // broodje + hand vóór het gezicht
  const s = broodjeS(); const hapNu = t > T_HAP ? 1 : 0;
  const rot = lerp(0.05, -0.55, e);
  if (t < 9.5) { const bx = hx - Math.cos(rot) * 60 * s, by = hy - hh * 0.05;
    ctx.save(); ctx.globalAlpha *= 1 - rampB(t, 6.8, 1.2); broodjeMetHap(ctx, bx, by, s, rot, hapNu * (S.anim === 'pro' ? veer((t - T_HAP) / 0.35) : 1), { schaduw: S.id === 'licht' });
    ctx.fillStyle = CAST.noor.huid; ctx.beginPath(); ctx.ellipse(hx, hy + hh * 0.02, hh * 0.17, hh * 0.13, rot, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba('#5A3A2A', 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(hx, hy + hh * 0.02, hh * 0.17, hh * 0.13, rot, 3.6, 5.6); ctx.stroke();
    ctx.restore(); }
  // kruimels bij de hap
  if (t > T_HAP && t < T_HAP + 1.6) { const k = t - T_HAP; ctx.save(); ctx.fillStyle = '#D9B26A';
    for (let i = 0; i < (S.anim === 'pro' ? 9 : 5); i++) { const vx = (hash(i) - 0.5) * 120, vy = -40 - hash(i + 9) * 80; const px = mondX + hh * 0.3 + vx * k, py = mondY + vy * k + 0.5 * 900 * k * k; if (py > NOOR.y) continue; ctx.globalAlpha = 1 - k / 1.6; ctx.beginPath(); ctx.arc(px, py, 2.4 + hash(i + 3) * 2, 0, 6.283); ctx.fill(); }
    ctx.restore(); }
  ctx.restore();
  return { mondX, mondY };
}
// de hap als bolletje langs slokdarm → maag → dunne darm
function hapPad() { zetBody(); return [[0, 0.95], [0.01, 1.3], [0.02, 1.9], [0.06, 2.2], [0.12, 2.37], [0.3, 2.55], [0.38, 2.75], [0.15, 2.83], [-0.06, 2.84], [-0.2, 3.02], [0.02, 3.1], [-0.34, 3.16], [0.34, 3.26], [0.02, 3.36]].map(p => AP(p[0], p[1])); }
function langsPad(P, u) { const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = clamp(u, 0, 1) * tot; for (let i = 1; i < P.length; i++) { if (r <= L[i - 1]) { const k = r / L[i - 1]; return [lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)]; } r -= L[i - 1]; } return P[P.length - 1]; }

// ---------- labels die in elk niveau terugkomen ----------
function lab(ctx, txt, x, y, a, kant = 'left', kleur = C.text) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(34, 600);
  const w = ctx.measureText(txt).width; const px = kant === 'left' ? x : x - w; ctx.fillStyle = rgba('#0D1420', 0.55); roundRect(ctx, px - 14, y - 34, w + 28, 48, 12); ctx.fill();
  text(ctx, txt, px, y, fTekst(34, 600), kleur); ctx.restore(); }
function schaalbalk(ctx, t, c) { // C8: de schaal loopt mee met de zoom
  const sDarm = c.s; let txt = 'echt formaat'; if (sDarm > 3) txt = 'vergroot ± 5×'; if (sDarm > 12) txt = 'vergroot ± 20×'; if (sDarm > 40) txt = 'vergroot ± 100×'; if (t > 15.2) txt = 'vergroot ± 1 000 000×';
  metaText(ctx, txt, W - 40, H - 30, C.text2, 'right', 26); }

// ---------- niveau 2: darmwand (schermmaat) ----------
// r2 = halve breedte van de holte op het scherm; groeit met de zoom
function darmwandL2(ctx, t, cx, cy, r2, a) { if (a <= 0.01) return; const dikte = r2 * 0.62;
  const sq = (x) => { const g = ((x - cx) / (r2 * 3) - (t - 12) * 0.35); return Math.max(0, Math.cos(g * 2.4)) ** 6; };
  ctx.save(); ctx.globalAlpha *= a;
  ctx.fillStyle = rgba('#3A2A2A', 0.5); ctx.fillRect(-50, cy - r2, W + 100, r2 * 2);
  if (S.rijk) darmwandRijk(ctx, t, cx, cy, r2, dikte, sq); else darmwand(ctx, -40, W + 40, cy, r2, sq, { a: 1, dikte, vlokken: true, t });
  ctx.restore(); }

// ---------- niveau 3: zetmeel en enzym (schermmaat) ----------
const KNIP = { t0: 15.6, bind: 16.5, knip: 17.2, los: 17.6 };
function moleculen(ctx, t, a, k3) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const cx = 960, cy = 470; const r = 26 * k3; // glucose-ring
  const losU = S.anim === 'pro' ? veer((t - KNIP.los) / 1.2) : rampB(t, KNIP.los, 1.4);
  const open = rampB(t, KNIP.t0, 0.9);
  const n = 12; const x0 = cx - n * r * 1.15;
  // enzym nadert, sluit, knipt
  const naar = beweeg(t, KNIP.t0, KNIP.bind - KNIP.t0 + 0.2, 'antic');
  const ex = lerp(cx + 760, cx + 40, naar), ey = lerp(cy - 300, cy - 74 * k3, naar) + Math.sin(t * 1.3) * 6;
  const sluit = rampB(t, KNIP.bind, 0.5) * (1 - rampB(t, KNIP.los + 0.3, 0.6));
  let er = 92 * k3; if (S.anim === 'pro') { const imp = t > KNIP.knip ? Math.exp(-6 * (t - KNIP.knip)) * Math.sin((t - KNIP.knip) * 20) * 0.08 : 0; er *= 1 + imp; }
  const pos = zetmeelSpiraal(ctx, x0, cy, n, r, { open, los: losU, t, spreid: 1.05 });
  // één glucose volgen (C8: gouden omlijning)
  if (t > KNIP.los + 0.6) { const p = pos[7]; if (p) { const k = rampB(t, KNIP.los + 0.6, 0.6); ctx.save(); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.globalAlpha *= k; ctx.beginPath(); ctx.arc(p[0], p[1], r * 1.25, 0, 6.283); ctx.stroke(); ctx.restore();
      lab(ctx, 'glucose', p[0] + r * 1.6, p[1] - r * 1.4, k, 'left', C.goud); } }
  const an = -1.9 + (S.anim === 'pro' ? Math.sin(t * 2.1) * 0.05 : 0);
  if (S.rijk) enzymRijk(ctx, ex, ey, er, { an, sluit, t }); else enzymKluwen(ctx, ex, ey, er, { an, sluit });
  // knipflits
  if (t > KNIP.knip && t < KNIP.knip + 0.5) { const k = (t - KNIP.knip) / 0.5; ctx.save(); ctx.globalAlpha *= 1 - k; ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 20 + 70 * k, 0, 6.283); ctx.stroke(); ctx.restore(); }
  lab(ctx, 'zetmeel', x0 - 10, cy - r * 3.4, rampB(t, 14.6, 0.6) * (1 - rampB(t, KNIP.los, 0.6)));
  lab(ctx, 'enzym', ex + er * 0.9, ey - er * 0.8, rampB(t, 15.4, 0.6));
  ctx.restore(); }

// ---------- de hele scène, laag voor laag ----------
// achtergrond en voorgrond apart, zodat een variant ze los kan bewerken (licht, scherptediepte, shader)
function sceneLagen(t) {
  const c = camera(t); const xray = rampB(t, 5.2, 1.4);
  const l1 = 1 - clamp((c.s - 14) / 14, 0, 1);              // niveau 1 verdwijnt tussen 14× en 28×
  const tubeW = 0.065 * (BODY.h / 7.3) * c.s;                // breedte dunne darm op het scherm
  const r2 = tubeW * 0.36 * (t > ZOOM.t1 ? Math.exp((t - ZOOM.t1) * 0.9) : 1); // na de zoom groeit de holte door
  const l2 = clamp((c.s - 10) / 14, 0, 1) * (1 - rampB(t, 14.6, 1.0));
  const l3 = rampB(t, 14.2, 1.2);
  const k3 = 0.6 + 0.4 * rampB(t, 14.2, 1.8);
  return { c, xray, l1, l2, l3, r2, k3 };
}
function tekenAchter(ctx, t, L) { // achtergrond
  bg(ctx, 'schema');
  if (L.l1 > 0.01) { ctx.save(); ctx.globalAlpha *= L.l1; keukenAchter(ctx, t, L.c); ctx.restore(); }
  if (L.l2 > 0.01) { ctx.save(); ctx.globalAlpha *= L.l2; ctx.fillStyle = '#20141A'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  if (L.l3 > 0.01) { ctx.save(); ctx.globalAlpha *= L.l3; ctx.fillStyle = C.bgMicro; ctx.fillRect(0, 0, W, H); microTextuur(ctx, t, L.l3); ctx.restore(); }
}
function keukenAchter(ctx, t, c) { // eenvoudige keuken: aanrecht en tegels (Schema), meebewegend met de camera
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const [ax, ay] = naarScherm(c, 0, 760); const [bx] = naarScherm(c, 1920, 760); const [, vy] = naarScherm(c, 0, NOOR.y);
  const [tx] = naarScherm(c, 1060, 0); ctx.fillStyle = rgba('#24344F', 1); ctx.fillRect(tx, ay - 380 * c.s, bx - tx, 380 * c.s);
  ctx.strokeStyle = rgba('#30425F', 1); ctx.lineWidth = 1; for (let i = 0; i < 26; i++) { const [x] = naarScherm(c, 1060 + i * 60, 0); ctx.beginPath(); ctx.moveTo(x, ay - 380 * c.s); ctx.lineTo(x, ay); ctx.stroke(); }
  for (let j = 0; j < 7; j++) { const [, y] = naarScherm(c, 0, 380 + j * 60); ctx.beginPath(); ctx.moveTo(naarScherm(c, 1060, 0)[0], y); ctx.lineTo(bx, y); ctx.stroke(); }
  const [kx] = naarScherm(c, 1060, 0); ctx.fillStyle = '#2C3E5C'; ctx.fillRect(kx, ay, bx - kx, 30 * c.s); ctx.fillStyle = '#22314A'; ctx.fillRect(kx, ay + 30 * c.s, bx - kx, vy - ay - 30 * c.s);
  ctx.fillStyle = '#1C2A42'; ctx.fillRect(-10, vy, W + 20, H - vy + 10);
  ctx.restore(); }
function microTextuur(ctx, t, a) { // rustig: alleen een paar deeltjes in de holte (geen korrel)
  ctx.save(); ctx.globalAlpha *= 0.5 * a; for (let i = 0; i < 26; i++) { const w = wander(i + 40, t, 30, 0.2); const x = hash(i * 3.1) * W + w.x, y = hash(i * 5.7) * 880 + w.y; waterMol(ctx, x, y, 6); } ctx.restore(); }
function tekenVoor(ctx, t, L) { // voorgrond
  const c = L.c;
  if (L.l1 > 0.01) { ctx.save(); ctx.globalAlpha *= L.l1; ctx.setTransform(c.s, 0, 0, c.s, c.sx - c.fx * c.s, c.sy - c.fy * c.s);
    noorScene(ctx, t, L.xray);
    // de hap reist
    const u = (t - 6.4) / 2.6; if (u > 0 && u < 1.15) { const P = hapPad(); const [x, y] = langsPad(P, Math.min(1, S.anim === 'pro' ? ease(u) : u)); ctx.save(); ctx.globalAlpha *= 1 - clamp((u - 1) / 0.15, 0, 1);
      const sq = S.anim === 'pro' ? 1 + 0.25 * Math.sin(u * 40) * (1 - u) : 1; ctx.fillStyle = '#E9C27E'; ctx.strokeStyle = C.goud; ctx.lineWidth = 2 / c.s * 1.5; ctx.beginPath(); ctx.ellipse(x, y, 7 * sq, 7 / sq, 0, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= L.l1; const [mx, my] = naarScherm(c, NOOR.x + 120, NOOR.h * 0.19 + 140);
    lab(ctx, 'broodje kaas', 1100, 300, rampB(t, 0.4, 0.5) * (1 - rampB(t, 4.6, 0.5)));
    const [dx, dy] = naarScherm(c, ...darmDoel()); lab(ctx, 'dunne darm', dx + 70, dy - 40, rampB(t, 8.4, 0.6) * (1 - rampB(t, 10.4, 0.6)));
    lab(ctx, 'een paar uur later', 1180, 160, rampB(t, 7.4, 0.5) * (1 - rampB(t, 9.6, 0.5)), 'left', C.text2);
    ctx.restore(); }
  if (L.l2 > 0.01) { darmwandL2(ctx, t, 960, c.sy, L.r2, L.l2); lab(ctx, 'darmwand met darmvlokken', 80, 120, rampB(t, 12.6, 0.6) * (1 - rampB(t, 14.2, 0.5))); }
  if (L.l3 > 0.01) moleculen(ctx, t, L.l3, L.k3);
}

// hulp voor varianten die niets extra's doen
function broodjeRijk() {} function darmRijkL1() {}
