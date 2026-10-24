// Film 6 · Hoe één soort er twee wordt — eigen hulpfuncties voor de animatie (laadt na lib_dieren, vóór sb6.js). Niets gedeelds aangepast.
const E6 = {};
E6.fr = (u) => u - Math.floor(u);
// lopen zonder glijden: het dier loopt van tS tot tE en staat dan stil op xE. S = slaglengte (cm per cyclus), s = px per cm, per = s per cyclus.
// x schuift S*s per cyclus; bij tE is de fase precies 0 (overgang naar 'staan').
E6.gang = (t, tS, tE, xE, S, s, per, kijk = 1) => { const tc = clamp(t, tS, tE), f = (tc - tE) / per; return { x: xE + kijk * S * s * f, h: t < tE ? 'lopen' : 'staan', t: E6.fr(f) }; };
// slaglengtes uit de bibliotheek (cm per cyclus)
E6.S = { wolf: 82, herder: 72, chihuahua: 18, paard: 170, ezel: 100, muilezel: 125, muis: 3.6 };
// achtergronden
E6.schema = (ctx) => { ctx.fillStyle = C.bgSchema; ctx.fillRect(0, 0, W, H); };
// populatiestippen van de kaart in hoofdstuk 2 (zelfde als e6s09)
E6.st0 = []; for (let i = 0; i < 18; i++) E6.st0.push([0.12 + hash(i) * 0.76, 0.15 + hash(i + 50) * 0.7, hash(i + 9) < 0.55 ? EVO.a1 : EVO.a2]);
// zwerven: kleine wandeling per stip; elke vierde stip trekt ver heen en weer (genenstroom)
E6.zwerf = (i, t, amp = 1, ver = 1) => { const [x0, y0] = E6.st0[i]; let x = x0 + 0.035 * amp * Math.sin(t * 0.55 + i * 1.7), y = y0 + 0.03 * amp * Math.sin(t * 0.43 + i * 2.3);
  if (i % 4 === 0) { x = 0.5 + (x0 - 0.5) * Math.cos(t * 0.32 + i) * ver + (x - x0) ; y = clamp(y, 0.3, 0.7); }
  return [clamp(x, 0.14, 0.86), clamp(y, 0.18, 0.82)]; };
// doel na de barrière: elke stip schuift weg van de rivier naar zijn eigen kant
E6.kant = (i) => { const x = E6.st0[i][0]; return x < 0.5 ? [clamp(x - 0.13, 0.12, 0.38), E6.st0[i][1]] : [clamp(x + 0.13, 0.62, 0.88), E6.st0[i][1]]; };
// kaart met barrière (zoals kaartBarriere) maar met een rivier die van boven naar beneden groeit (len 0..1) en een breedte (riv 0..1)
E6.kaart = function (ctx, x, y, w, h, o = {}) { const { riv = 0, len = 1, a = 1, stippen = [] } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const land = [[x, y + h * 0.15], [x + w * 0.2, y], [x + w * 0.55, y + h * 0.05], [x + w * 0.85, y], [x + w, y + h * 0.25], [x + w * 0.95, y + h * 0.7], [x + w * 0.75, y + h], [x + w * 0.35, y + h * 0.95], [x + w * 0.05, y + h * 0.8]];
  vul(ctx, land, '#2F4A3A', '#5E7A66', 2.5);
  if (riv > 0.005 && len > 0.005) { ctx.save(); zacht(ctx, land); ctx.clip(); const rw = 10 + 50 * riv; const P = [];
    const n = Math.max(2, Math.ceil(12 * len)); for (let i = 0; i <= n; i++) { const u = (i / n) * len; P.push([x + w * 0.5 + Math.sin(u * 7) * w * 0.05, y - 10 + u * (h + 20)]); }
    lijn(ctx, P, C.water, rw); lijn(ctx, P, _lt(C.water, 0.3), 2); ctx.restore(); }
  for (const [sx, sy, k, al = 1] of stippen) if (al > 0.01) populatieStip(ctx, x + sx * w, y + sy * h, 11, k, al);
  ctx.restore(); };
// kleine pictogrammen
E6.sneeuw = (ctx, x, y, r, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#CFE3F0'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const an = k * Math.PI / 3; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * r, y - Math.sin(an) * r); ctx.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); ctx.stroke(); } ctx.restore(); };
E6.dobbel = (ctx, x, y, r, rot, ogen, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); roundRect(ctx, -r, -r, 2 * r, 2 * r, r * 0.3); shape(ctx, rgba(EVO.kracht.drift, 0.25), EVO.kracht.drift, 3);
  const P = { 1: [[0, 0]], 2: [[-0.45, -0.45], [0.45, 0.45]], 3: [[-0.45, -0.45], [0, 0], [0.45, 0.45]], 4: [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]], 5: [[-0.45, -0.45], [0.45, -0.45], [0, 0], [-0.45, 0.45], [0.45, 0.45]], 6: [[-0.45, -0.5], [0.45, -0.5], [-0.45, 0], [0.45, 0], [-0.45, 0.5], [0.45, 0.5]] }[ogen];
  for (const [px, py] of P) circ(ctx, px * r, py * r, r * 0.14, EVO.kracht.drift); ctx.restore(); };
E6.geluid = (ctx, x, y, t, a = 1, kl = C.text) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = kl; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let k = 0; k < 3; k++) { const f = E6.fr(t * 0.9 + k / 3); ctx.globalAlpha = a * (1 - f); ctx.beginPath(); ctx.arc(x, y, 20 + f * 60, -0.6, 0.6); ctx.stroke(); } ctx.restore(); };
// rood kruis (keyframe-stijl)
E6.kruis = (ctx, x, y, r, a = 1, lw = 7) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.koraal; ctx.lineWidth = lw; ctx.lineCap = 'round'; const k = r * ease(a * 1.2);
  ctx.beginPath(); ctx.moveTo(x - k, y - k); ctx.lineTo(x + k, y + k); ctx.moveTo(x + k, y - k); ctx.lineTo(x - k, y + k); ctx.stroke(); ctx.restore(); };
// pijl die groeit (u 0..1)
E6.pijl = (ctx, x1, y1, x2, y2, u, col = C.line, lw = 4) => { if (u <= 0.01) return; pijl(ctx, x1, y1, lerp(x1, x2, u), lerp(y1, y2, u), col, Math.min(1, u * 3), lw); };
// stippellijn die groeit
E6.stippel = (ctx, x1, y1, x2, y2, u, col = C.groen) => { if (u <= 0.01) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, u), lerp(y1, y2, u)); ctx.stroke(); ctx.restore(); };
// klop-houding voor Gerrit (arm iets op en neer op de hals van de muilezel)
E6.klop = (t) => { POSES.e6klop = { R: [1.45 + 0.05 * Math.sin(t * 5), 1.55 + 0.16 * Math.max(0, Math.sin(t * 5))], L: [0.14, 0.06] }; return 'e6klop'; };
// vis die rustig op zijn plek zwemt (geen achteruit): kleine verticale golf
E6.vis = (ctx, x, y, s, vorm, t, o = {}) => cichlide(ctx, x, y + 4 * Math.sin(t * 1.3 + (o.f || 0)), s, Object.assign({ vorm, t: t * 0.9 + (o.f || 0) }, o));
// kalendervak
E6.maand = (ctx, x, y, w, m, a = 1, rand = null) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 80, 10); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5); text(ctx, m, x + w / 2, y + 52, fTekst(36, 600), C.text, 'center');
  if (rand) { roundRect(ctx, x, y, w, 80, 10); ctx.strokeStyle = rand; ctx.lineWidth = 5; ctx.stroke(); } ctx.restore(); };
E6.getal = (g) => g >= 1000 ? Math.floor(g / 1000) + '\u2009' + String(g % 1000).padStart(3, '0') : String(g);
