// ===== Reeks Hormonen — seriebibliotheek (14 okt 2026) =====
// Uit dnalib.js overgenomen: circ, box, SKINS, personReal (vriendelijke persoon met huidskleur, Part C)
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
function box(ctx,x,y,w,h,r,fill,stroke,lw=1.5){ roundRect(ctx,x,y,w,h,r); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
const SKINS=['#E8C2A4','#C99A78','#A3745A','#7A5440','#5A3C2E'];
function personReal(ctx,x,y,h,alpha=1,o={}){ if(alpha<=0.01) return {}; ctx.save(); ctx.globalAlpha*=alpha;
  const skin=o.skin||SKINS[1], hair=o.hair||'#3B2E28', shirt=o.shirt||'#5A7FA0', trous=o.trousers||'#34425A', shoe=o.shoes||'#262C3A';
  const dark=(hex,k)=>{ const n=parseInt(hex.slice(1),16); let r=n>>16,g=(n>>8)&255,b=n&255; return `rgb(${Math.round(r*(1-k))},${Math.round(g*(1-k))},${Math.round(b*(1-k))})`; };
  const top=y-h, hh=h/6.6, hw=hh*0.86, cx=x;
  const shY=top+hh*1.38, shW=hh*1.85, waistY=top+hh*3.1, hipY=top+hh*3.55, hipW=hh*1.5, footY=y;
  ctx.lineCap='round'; ctx.lineJoin='round';
  // legs: soft capsules, slightly tapered; shoes as rounded pebbles
  for(const s2 of [-1,1]){ const lx=cx+s2*hipW*0.24; ctx.strokeStyle=s2<0?trous:dark(trous,0.1); ctx.lineWidth=hh*0.62; ctx.beginPath(); ctx.moveTo(lx,hipY); ctx.lineTo(lx+s2*hh*0.04,footY-hh*0.35); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(lx+s2*hh*0.1,footY-hh*0.14,hh*0.4,hh*0.17,0,0,6.283); ctx.fillStyle=shoe; ctx.fill(); }
  // torso: one soft rounded shape
  ctx.beginPath(); ctx.moveTo(cx,shY-hh*0.12);
  ctx.bezierCurveTo(cx+shW*0.45,shY-hh*0.14,cx+shW*0.56,shY+hh*0.1,cx+shW*0.5,shY+hh*0.6);
  ctx.bezierCurveTo(cx+shW*0.44,waistY-hh*0.4,cx+hipW*0.5,hipY-hh*0.2,cx+hipW*0.52,hipY+hh*0.2);
  ctx.quadraticCurveTo(cx,hipY+hh*0.36,cx-hipW*0.52,hipY+hh*0.2);
  ctx.bezierCurveTo(cx-hipW*0.5,hipY-hh*0.2,cx-shW*0.44,waistY-hh*0.4,cx-shW*0.5,shY+hh*0.6);
  ctx.bezierCurveTo(cx-shW*0.56,shY+hh*0.1,cx-shW*0.45,shY-hh*0.14,cx,shY-hh*0.12); ctx.closePath();
  ctx.fillStyle=shirt; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle=dark(shirt,0.09); ctx.beginPath(); ctx.ellipse(cx+shW*0.62,waistY,shW*0.34,hh*2.6,0,0,6.283); ctx.fill(); ctx.restore();
  // arms: soft tapered sleeve + forearm + round hand
  const arm=(s2,cfg)=>{ const a1=(cfg&&cfg.a1!=null)?cfg.a1:0.12, a2=(cfg&&cfg.a2!=null)?cfg.a2:a1*0.5; const L1=hh*1.38, L2=hh*1.25; const sx=cx+s2*shW*0.4, sy=shY+hh*0.28;
    const ex=sx+s2*Math.sin(a1)*L1, ey=sy+Math.cos(a1)*L1, hx=ex+s2*Math.sin(a2)*L2, hy=ey+Math.cos(a2)*L2;
    ctx.strokeStyle=skin; ctx.lineWidth=hh*0.3; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(hx,hy); ctx.stroke();
    ctx.strokeStyle=s2<0?shirt:dark(shirt,0.07); ctx.lineWidth=hh*0.44; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey); ctx.lineTo(ex+(hx-ex)*0.15,ey+(hy-ey)*0.15); ctx.stroke();
    const ang=Math.atan2(hy-ey,hx-ex); circ(ctx,hx+Math.cos(ang)*hh*0.06,hy+Math.sin(ang)*hh*0.06,hh*0.2,skin);
    return {hx:hx+Math.cos(ang)*hh*0.08,hy:hy+Math.sin(ang)*hh*0.08,a:ang,cfg}; };
  const rA=arm(1,o.armR), lA=arm(-1,o.armL); for(const A of [rA,lA]) if(A.cfg&&A.cfg.hold) A.cfg.hold(ctx,A.hx,A.hy,A.a);
  // neck + soft collar
  const hy=top+hh*0.56; ctx.fillStyle=dark(skin,0.1); box(ctx,cx-hh*0.17,hy+hh*0.3,hh*0.34,shY-hy-hh*0.25,hh*0.12,dark(skin,0.1));
  ctx.strokeStyle=dark(shirt,0.2); ctx.lineWidth=Math.max(2,hh*0.04); ctx.beginPath(); ctx.moveTo(cx-hh*0.26,shY-hh*0.1); ctx.quadraticCurveTo(cx,shY+hh*0.18,cx+hh*0.26,shY-hh*0.1); ctx.stroke();
  // hair behind
  const st=o.hairStyle||'short'; ctx.fillStyle=hair;
  if(st==='long'){ ctx.beginPath(); ctx.ellipse(cx,hy-hh*0.05,hw*0.62,hh*0.55,0,Math.PI,0); ctx.fill(); for(const s2 of [-1,1]) box(ctx,cx+s2*hw*0.48-hw*0.17,hy-hh*0.15,hw*0.34,hh*1.05,hw*0.17,hair); }
  if(st==='curly'){ for(let k=0;k<11;k++){ const a=Math.PI*(1.0+k/10); circ(ctx,cx+Math.cos(a)*hw*0.56,hy-hh*0.04+Math.sin(a)*hh*0.56,hh*0.2,hair); } }
  if(st==='bun') circ(ctx,cx,hy-hh*0.62,hh*0.22,hair);
  // ears + face (round)
  for(const s2 of [-1,1]) circ(ctx,cx+s2*hw*0.5,hy+hh*0.04,hh*0.11,dark(skin,0.05));
  ctx.beginPath(); ctx.ellipse(cx,hy,hw*0.5,hh*0.52,0,0,6.283); ctx.fillStyle=skin; ctx.fill();
  // hair front: soft cap
  ctx.fillStyle=hair; ctx.beginPath(); ctx.moveTo(cx-hw*0.52,hy-hh*0.02); ctx.bezierCurveTo(cx-hw*0.58,hy-hh*0.66,cx+hw*0.58,hy-hh*0.7,cx+hw*0.52,hy-hh*0.02);
  ctx.bezierCurveTo(cx+hw*0.44,hy-hh*0.26,cx+hw*0.2,hy-hh*0.32,cx-hw*0.05,hy-hh*0.3); ctx.bezierCurveTo(cx-hw*0.3,hy-hh*0.28,cx-hw*0.46,hy-hh*0.2,cx-hw*0.52,hy-hh*0.02); ctx.fill();
  // friendly face: soft brows, round dark eyes with a tiny highlight, small nose, smile, light cheeks
  const ink=dark(skin,0.62); ctx.strokeStyle=ink; ctx.fillStyle=ink;
  for(const s2 of [-1,1]){ ctx.lineWidth=Math.max(1.5,hh*0.035); ctx.beginPath(); ctx.moveTo(cx+s2*hw*0.11,hy-hh*0.13); ctx.quadraticCurveTo(cx+s2*hw*0.2,hy-hh*0.17,cx+s2*hw*0.3,hy-hh*0.13); ctx.stroke();
    circ(ctx,cx+s2*hw*0.2,hy+hh*0.01,hh*0.055,ink); circ(ctx,cx+s2*hw*0.2+hh*0.018,hy-hh*0.012,hh*0.016,rgba('#FFFFFF',0.7));
    circ(ctx,cx+s2*hw*0.3,hy+hh*0.17,hh*0.07,rgba('#E07A5F',0.18)); }
  ctx.lineWidth=Math.max(1.2,hh*0.028); ctx.beginPath(); ctx.moveTo(cx,hy+hh*0.06); ctx.quadraticCurveTo(cx+hw*0.05,hy+hh*0.14,cx-hw*0.01,hy+hh*0.16); ctx.stroke();
  if(o.open){ ctx.beginPath(); ctx.ellipse(cx,hy+hh*0.29,hw*0.11,hh*0.08,0,0,6.283); ctx.fillStyle=dark(skin,0.55); ctx.fill(); } else { ctx.lineWidth=Math.max(1.6,hh*0.034); ctx.beginPath(); ctx.moveTo(cx-hw*0.15,hy+hh*0.25); ctx.quadraticCurveTo(cx,hy+hh*0.35,cx+hw*0.15,hy+hh*0.25); ctx.stroke(); }
  ctx.restore(); return {rHand:{x:rA.hx,y:rA.hy},lHand:{x:lA.hx,y:lA.hy},head:{x:cx,y:hy,r:hh*0.5},hip:{x:cx,y:hipY},knee:{y:top+hh*4.9}}; }

// series person (12 Oct 2026): every film draws the friendly person; each scenes file may set PERSON_LOOK

// ---------- seriekleuren (Seriebrief Hormonen) ----------
const HK = { hormoon: C.goud, hormoonR: '#F0CC7A', klier: C.oker, klierR: '#E2C38A', bloed: '#B5574A', bloedL: '#D88A7E',
  glucose: C.teal, water: C.teal, receptor: '#AFC0D0', rem: '#9A8FB8', zenuw: C.paars, cel: '#C9B896' };

// ---------- hormonen: elk een eigen vorm, allemaal goud ----------
function hormoonVorm(ctx, x, y, r = 10, kind = 'adrenaline', a = 1, col = HK.hormoon) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath();
  if (kind === 'adrenaline') { ctx.moveTo(x, y - r * 1.35); ctx.bezierCurveTo(x + r * 0.9, y - r * 0.2, x + r, y + r * 0.9, x, y + r); ctx.bezierCurveTo(x - r, y + r * 0.9, x - r * 0.9, y - r * 0.2, x, y - r * 1.35); }
  else if (kind === 'insuline') { roundRect(ctx, x - r * 0.95, y - r * 0.95, r * 1.9, r * 1.9, r * 0.45); }
  else if (kind === 'glucagon') { ctx.moveTo(x, y - r * 1.2); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r * 1.2); ctx.lineTo(x - r, y); ctx.closePath(); }
  else if (kind === 'cortisol') { ctx.arc(x, y, r, 0, 6.283); ctx.moveTo(x + r * 0.5, y); ctx.arc(x, y, r * 0.5, 0, 6.283, true); }
  else if (kind === 'thyroxine') { for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.5 : r * 1.15; i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); }
  else if (kind === 'adh') { ctx.moveTo(x, y - r * 1.1); ctx.lineTo(x + r, y + r * 0.75); ctx.lineTo(x - r, y + r * 0.75); ctx.closePath(); }
  else ctx.arc(x, y, r, 0, 6.283);
  ctx.fillStyle = rgba(col, 0.85); ctx.fill('evenodd'); ctx.strokeStyle = lighten(col, 0.35); ctx.lineWidth = Math.max(1, r * 0.14); ctx.stroke(); ctx.restore();
}

// ---------- receptor: een kommetje in de membraan dat precies om één vorm past ----------
// (x,y) = punt op de membraan, ang = richting naar buiten (radialen); bound 0..1 = hormoon komt aanzetten en zit erin
function receptor(ctx, x, y, ang, kind = 'adrenaline', bound = 0, a = 1, s = 1, col = HK.receptor) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.translate(x, y); ctx.rotate(ang + Math.PI / 2);
  ctx.fillStyle = rgba(col, 0.9); roundRect(ctx, -7 * s, -6 * s, 14 * s, 30 * s, 5 * s); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-22 * s, -10 * s); ctx.lineTo(-22 * s, -42 * s); ctx.lineTo(-11 * s, -42 * s); ctx.lineTo(-11 * s, -22 * s); ctx.lineTo(11 * s, -22 * s); ctx.lineTo(11 * s, -42 * s); ctx.lineTo(22 * s, -42 * s); ctx.lineTo(22 * s, -10 * s); ctx.closePath();
  ctx.fillStyle = rgba(col, 0.9); ctx.fill(); ctx.strokeStyle = lighten(col, 0.3); ctx.lineWidth = 1.2; ctx.stroke();
  if (bound < 0.99) { ctx.save(); ctx.globalAlpha *= 1 - bound; ctx.setLineDash([3 * s, 3 * s]); ctx.strokeStyle = HK.hormoon; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, -32 * s, 9 * s, 0, 6.283); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  if (bound > 0.01) { const d = 32 * s + 70 * s * (1 - ease(bound)); hormoonVorm(ctx, x + Math.cos(ang) * d, y + Math.sin(ang) * d, 9 * s, kind, Math.min(1, bound * 4)); }
  ctx.restore();
}

// ---------- doelcel (Micro): ronde cel met receptoren op de membraan ----------
// o: {n receptoren, kind, bound 0..1, glow 0..1 (reactie), noRec: cel zonder receptoren, kern}
function doelcel(ctx, x, y, r, o = {}) {
  const { a = 1, n = 6, kind = 'adrenaline', bound = 0, glow = 0, noRec = false, kern = true, t = 0, seed = 1, fill = HK.cel, rot = -Math.PI / 2 } = o; if (a <= 0.01) return;
  ctx.save(); ctx.globalAlpha *= a;
  if (glow > 0.01) { const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.5); g.addColorStop(0, rgba(HK.hormoon, 0.28 * glow)); g.addColorStop(1, rgba(HK.hormoon, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.5, 0, 6.283); ctx.fill(); }
  blob(ctx, x, y, r, r * 0.92, 0.035, seed, t); shape(ctx, rgba(fill, 0.16 + 0.1 * glow), rgba(fill, 0.9), 2.5);
  blob(ctx, x, y, r - 8, r * 0.92 - 8, 0.035, seed, t); ctx.strokeStyle = rgba(fill, 0.45); ctx.lineWidth = 1.2; ctx.stroke();
  celTextuur(ctx, (px, py) => Math.hypot(px - x, (py - y) / 0.92) < r - 14, 40, seed * 3 + 1, [x - r, y - r, 2 * r, 2 * r]);
  if (kern) { ctx.beginPath(); ctx.arc(x + r * 0.12, y + r * 0.08, r * 0.3, 0, 6.283); shape(ctx, rgba(C.kern, 0.55), C.kernR, 1.5); }
  if (!noRec) for (let i = 0; i < n; i++) { const an = rot + (i - (n - 1) / 2) * (Math.PI * 1.25 / Math.max(1, n - 1)); const bi = clamp(bound * n - i, 0, 1);
    receptor(ctx, x + Math.cos(an) * r * 0.97, y + Math.sin(an) * r * 0.97 * 0.92, an, kind, bi, 1, r / 170); }
  ctx.restore();
}

// ---------- hartslagmeter ----------
function hartMeter(ctx, x, y, bpm, t, a = 1, w = 420) {
  if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, 150, 16); shape(ctx, rgba(C.bgSchema, 0.92), rgba(HK.bloed, 0.9), 1.5);
  const per = 60 / bpm, ph = (t % per) / per, k = Math.exp(-ph * 9); const hx = x + 70, hy = y + 78, s = 0.42 * (1 + 0.14 * k);
  ctx.beginPath(); ctx.moveTo(hx, hy + 60 * s); ctx.bezierCurveTo(hx - 110 * s, hy - 30 * s, hx - 50 * s, hy - 90 * s, hx, hy - 30 * s); ctx.bezierCurveTo(hx + 50 * s, hy - 90 * s, hx + 110 * s, hy - 30 * s, hx, hy + 60 * s); ctx.closePath(); shape(ctx, rgba(HK.bloed, 0.55 + 0.4 * k), HK.bloedL, 2);
  text(ctx, String(Math.round(bpm)), x + 140, y + 92, fTitel(56), C.text, 'left'); metaText(ctx, 'SLAGEN / MIN', x + 140, y + 128, C.grain, 'left', 22);
  // ECG-lijn
  ctx.strokeStyle = HK.bloedL; ctx.lineWidth = 2.5; ctx.beginPath(); const x0 = x + 280, x1 = x + w - 20, yb = y + 80;
  for (let px = x0; px <= x1; px += 2) { const tt = t - (x1 - px) / 110; const p = ((tt % per) + per) % per / per; let v = 0; if (p < 0.04) v = -8 * Math.sin(p / 0.04 * Math.PI); else if (p < 0.08) v = 34 * Math.sin((p - 0.04) / 0.04 * Math.PI); else if (p < 0.11) v = -12 * Math.sin((p - 0.08) / 0.03 * Math.PI); else if (p > 0.3 && p < 0.42) v = 7 * Math.sin((p - 0.3) / 0.12 * Math.PI);
    px === x0 ? ctx.moveTo(px, yb - v) : ctx.lineTo(px, yb - v); } ctx.stroke(); ctx.restore();
}

// ---------- lichaamskaart met hormoonklieren (Schema) ----------
// lichaam() uit lib_voeding tekent het silhouet; de klieren liggen op vaste plekken t.o.v. (x, y, s)
function KLIERPOS(x, y, s) { return {
  hypothalamus: [x, y - 486 * s, 15 * s, 10 * s], hypofyse: [x, y - 452 * s, 9 * s, 9 * s], schildklier: [x, y - 352 * s, 30 * s, 14 * s],
  bijnierL: [x - 78 * s, y - 2 * s, 20 * s, 12 * s], bijnierR: [x + 78 * s, y - 2 * s, 20 * s, 12 * s],
  alvleesklier: [x + 6 * s, y + 46 * s, 64 * s, 15 * s], eierstokL: [x - 92 * s, y + 210 * s, 18 * s, 13 * s], eierstokR: [x + 92 * s, y + 210 * s, 18 * s, 13 * s] }; }
function nierVorm(ctx, x, y, s, side, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(side * s, s);
  ctx.beginPath(); ctx.moveTo(0, -48); ctx.bezierCurveTo(38, -50, 40, 48, 0, 48); ctx.bezierCurveTo(-22, 48, -24, 18, -12, 8); ctx.bezierCurveTo(-4, 2, -4, -2, -12, -8); ctx.bezierCurveTo(-24, -18, -22, -48, 0, -48); ctx.closePath();
  shape(ctx, rgba('#9C5A50', 0.35), rgba('#C98A7E', 0.8), 2 / s); ctx.restore(); }
// o.lit: {naam: 0..1} licht een klier op; o.labels: true; o.dimKlier: alpha voor niet-opgelichte klieren; o.hersenen
function klierKaart(ctx, x, y, s, o = {}) {
  const { a = 1, lit = {}, base = 0.55, nieren = 1, hersenen = 1, show = {}, armen = 1 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  if (armen > 0.01) for (const d of [-1, 1]) { ctx.save(); ctx.globalAlpha *= armen; ctx.lineCap = 'round'; ctx.strokeStyle = rgba(C.mens, 0.8); ctx.lineWidth = 74 * s; ctx.beginPath(); ctx.moveTo(x + d * 205 * s, y - 300 * s); ctx.quadraticCurveTo(x + d * 290 * s, y - 120 * s, x + d * 300 * s, y + 60 * s); ctx.stroke(); ctx.strokeStyle = rgba(C.mens, 0.22); ctx.lineWidth = 70 * s; ctx.stroke(); ctx.restore(); }
  lichaam(ctx, x, y, s, 1, { darm: 0, hoofd: false }); ctx.beginPath(); ctx.arc(x, y - 470 * s, 90 * s, 0, 6.283); shape(ctx, rgba(C.mens, 0.22), rgba(C.mens, 0.8), 2);
  if (hersenen > 0.01) { ctx.save(); ctx.globalAlpha *= hersenen; ctx.beginPath(); ctx.ellipse(x, y - 498 * s, 64 * s, 40 * s, 0, Math.PI, 0); ctx.closePath(); shape(ctx, rgba(C.paars, 0.18), rgba(C.paars, 0.6), 1.5); ctx.restore(); }
  nierVorm(ctx, x - 82 * s, y + 52 * s, 0.85 * s, -1, nieren); nierVorm(ctx, x + 82 * s, y + 52 * s, 0.85 * s, 1, nieren);
  const K = KLIERPOS(x, y, s);
  for (const [k, v] of Object.entries(K)) { const base2 = k.replace(/[LR]$/, ''); const l = lit[base2] || 0; const sh = show[base2] == null ? 1 : show[base2]; if (sh <= 0.01) continue;
    ctx.save(); ctx.globalAlpha *= sh * (base + (1 - base) * l); if (l > 0.01) { const g = ctx.createRadialGradient(v[0], v[1], 0, v[0], v[1], v[2] * 3); g.addColorStop(0, rgba(HK.klier, 0.5 * l)); g.addColorStop(1, rgba(HK.klier, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(v[0], v[1], v[2] * 3, 0, 6.283); ctx.fill(); }
    ctx.beginPath(); ctx.ellipse(v[0], v[1], v[2], v[3], 0, 0, 6.283); shape(ctx, rgba(HK.klier, 0.75), HK.klierR, 1.5); ctx.restore(); }
  ctx.restore(); return K;
}
// bloedbaan in het lichaam: lus hart → hoofd → hart → benen → hart (punten t.o.v. lichaam(x,y,s))
function bloedLus(x, y, s) { const P = (a, b) => [x + a * s, y + b * s]; return [
  P(14, -210), P(60, -300), P(40, -400), P(20, -540), P(-20, -540), P(-40, -400), P(-60, -300), P(-10, -210),
  P(-150, -120), P(-160, 60), P(-120, 250), P(-110, 300), P(-60, 300), P(-40, 120), P(-10, 0), P(10, -60),
  P(40, 0), P(60, 120), P(110, 300), P(160, 300), P(150, 250), P(160, 60), P(150, -120), P(14, -210)]; }
function bloedNet(ctx, pts, a = 1, col = HK.bloed) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.7; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); gladC(pts).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }
// n hormoondeeltjes die vanaf fractie u0 langs de lus meestromen; spread 0..1 = hoe ver ze al zijn
function hormoonStroom(ctx, pts, n, t, spread, kind = 'adrenaline', a = 1, r = 9, u0 = 0.55) {
  if (a <= 0.01 || spread <= 0.001) return; const G = gladC(pts);
  for (let i = 0; i < n; i++) { const off = hash(i * 17 + 3); const u = (u0 + off * spread + t * 0.04 * (0.6 + 0.4 * hash(i * 5))) % 1; const p = padPunt(G, u, false);
    const w = wander(i, t, 5, 1.2); hormoonVorm(ctx, p[0] + w.x, p[1] + w.y, r, kind, a * clamp(spread * 3, 0, 1)); }
}

// ---------- grafiek met assen (Schema) ----------
// o: {xmax, ymax, xlab, ylab, f: (x)=>y, u 0..1 (hoe ver getekend), ticks:[...], yticks, col, marks:[[x,label]]}
function grafiek(ctx, x, y, w, h, o = {}) {
  const { a = 1, xmax = 10, ymax = 100, xlab = '', ylab = '', f = () => 0, u = 1, xticks = [], yticks = [], col = HK.hormoon, marks = [], xfmt = v => String(v) } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
  for (const v of xticks) { const px = x + v / xmax * w; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, y + h + 10); ctx.stroke(); text(ctx, xfmt(v), px, y + h + 44, fTekst(28), C.text2, 'center'); }
  for (const v of yticks) { const py = y + h - v / ymax * h; ctx.beginPath(); ctx.moveTo(x - 10, py); ctx.lineTo(x, py); ctx.stroke(); text(ctx, String(v), x - 18, py + 10, fTekst(28), C.text2, 'right'); ctx.save(); ctx.strokeStyle = rgba(C.line, 0.15); ctx.beginPath(); ctx.moveTo(x, py); ctx.lineTo(x + w, py); ctx.stroke(); ctx.restore(); }
  if (xlab) metaText(ctx, xlab, x + w, y + h + 86, C.grain, 'right', 24); if (ylab) metaText(ctx, ylab, x, y - 22, C.grain, 'left', 24);
  ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath(); const N = 200; let last = null;
  for (let i = 0; i <= N * u; i++) { const xv = i / N * xmax, yv = f(xv); const px = x + xv / xmax * w, py = y + h - clamp(yv / ymax, 0, 1.05) * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); last = [px, py]; } ctx.stroke();
  if (last && u < 1) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(last[0], last[1], 7, 0, 6.283); ctx.fill(); }
  for (const [xv, lab, al = 1] of marks) { if (al <= 0.01) continue; const px = x + xv / xmax * w, py = y + h - f(xv) / ymax * h; ctx.save(); ctx.globalAlpha *= al; ctx.setLineDash([5, 6]); ctx.strokeStyle = rgba(C.text, 0.5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, y + h); ctx.lineTo(px, py); ctx.lineTo(x, py); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 7, 0, 6.283); ctx.fill(); text(ctx, lab, px + 14, py - 14, fTekst(32, 600), C.text, 'left'); ctx.restore(); }
  ctx.restore();
}

// ---------- bak met kraan en afvoer (Schema-model voor concentratie) ----------
function bakKraan(ctx, x, y, w, h, level, inflow, outflow, t, a = 1, o = {}) {
  if (a <= 0.01) return; const { kind = 'adrenaline', labels = 1, dot = null } = o; const DOT = dot || ((c, px, py, r, al) => hormoonVorm(c, px, py, r, kind, al)); ctx.save(); ctx.globalAlpha *= a;
  // kraan
  ctx.strokeStyle = HK.klierR; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 60, y - 70); ctx.lineTo(x + 70, y - 70); ctx.lineTo(x + 70, y - 34); ctx.stroke();
  ctx.fillStyle = HK.klier; roundRect(ctx, x - 100, y - 96, 56, 52, 10); ctx.fill(); ctx.save(); ctx.translate(x - 72, y - 108); ctx.rotate(inflow * 1.3); ctx.fillStyle = HK.klierR; roundRect(ctx, -32, -6, 64, 12, 6); ctx.fill(); ctx.restore();
  // straal
  if (inflow > 0.02) for (let i = 0; i < Math.round(10 * inflow); i++) { const ph = (t * 2.2 + i / (10 * inflow)) % 1; DOT(ctx, x + 70 + Math.sin(i * 3.1) * 4 * inflow, y - 30 + ph * (h - h * level + 30), 8, inflow); }
  // bak
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y); ctx.stroke();
  const ly = y + h - h * clamp(level, 0, 1); ctx.fillStyle = rgba(HK.bloed, 0.35); ctx.fillRect(x + 2, ly, w - 4, y + h - ly - 2);
  ctx.strokeStyle = HK.bloedL; ctx.lineWidth = 2; ctx.beginPath(); for (let px = x + 2; px < x + w - 2; px += 4) { const py = ly + Math.sin(px * 0.05 + t * 3) * 3; px === x + 2 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
  const nIn = Math.round(40 * clamp(level, 0, 1)); for (let i = 0; i < nIn; i++) { const wv = wander(i, t, 8, 1); const hx = x + 24 + hash(i * 3) * (w - 48) + wv.x, hy = ly + 20 + hash(i * 3 + 1) * Math.max(0, y + h - ly - 40) + wv.y; DOT(ctx, hx, hy, 7, 0.9); }
  // afvoer
  ctx.strokeStyle = C.line; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x + w - 40, y + h); ctx.lineTo(x + w - 40, y + h + 40); ctx.lineTo(x + w + 80, y + h + 40); ctx.stroke();
  if (outflow > 0.02) for (let i = 0; i < Math.round(5 * outflow); i++) { const ph = (t * 1.2 + i / 5) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * outflow; circ(ctx, x + w - 40 + ph * 120, y + h + 40, 5 - ph * 3, C.text2); ctx.restore(); }
  if (labels) { metaText(ctx, 'KLIER = KRAAN', x - 72, y - 140, C.grain, 'center', 24); metaText(ctx, 'AFBRAAK = AFVOER', x + w + 30, y + h + 96, C.grain, 'center', 24); metaText(ctx, 'PEIL = CONCENTRATIE', x + w + 24, ly + 8, C.grain, 'left', 24); }
  ctx.restore();
}
function person(ctx,x,y,h,alpha=1,o={}){ const look=(typeof PERSON_LOOK!=='undefined')?PERSON_LOOK:{}; return personReal(ctx,x,y,h,alpha,Object.assign({},look,o)); }

// ---------- gedeeld vanaf film 2 ----------
function glucoseDeeltje(ctx, x, y, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, rgba(HK.glucose, 0.55), HK.glucose, 1.5, 0); ctx.restore(); }
function klasAchtergrond(ctx) {
  ctx.fillStyle = '#26364F'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#2E4060'; ctx.fillRect(0, 0, W, 640);
  ctx.fillStyle = '#3A3530'; ctx.fillRect(0, 640, W, H - 640);
  for (let i = 0; i < 12; i++) { ctx.strokeStyle = rgba('#000000', 0.12); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(i * 180 - 200, H); ctx.lineTo(i * 180 + 100, 640); ctx.stroke(); }
  roundRect(ctx, 240, 110, 900, 360, 10); shape(ctx, '#2F5246', '#8C6A44', 10);
  ctx.save(); ctx.globalAlpha = 0.6; text(ctx, 'Biologie', 300, 190, fTitel(52), '#E6E1D3', 'left'); ctx.strokeStyle = '#E6E1D3'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(300, 240); ctx.lineTo(760, 240); ctx.moveTo(300, 300); ctx.lineTo(640, 300); ctx.stroke(); ctx.restore();
  roundRect(ctx, 1360, 110, 420, 330, 8); shape(ctx, '#3E5C80', '#8FA0B5', 6); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(1570, 110); ctx.lineTo(1570, 440); ctx.stroke();
}
function schoolbank(ctx, x, y, w) { roundRect(ctx, x - w / 2, y, w, 30, 6); shape(ctx, '#B08A5C', '#8C6A44', 2); ctx.fillStyle = '#8C6A44'; ctx.fillRect(x - w / 2 + 20, y + 30, w - 40, 200); }
// telefoon met glucosegrafiek; vals = functie t→mmol/L, alarm 0..1
function telefoon(ctx, x, y, w, h, o = {}) { const { a = 1, val = 5.4, curve = null, alarm = 0, t = 0, label = 'mmol/L' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x, y, w, h, 28); shape(ctx, '#0D1420', '#5B6B88', 4); roundRect(ctx, x + 14, y + 40, w - 28, h - 70, 12); ctx.fillStyle = alarm > 0.3 && (t * 3 % 1) < 0.5 ? rgba(C.koraal, 0.35) : '#141E30'; ctx.fill();
  text(ctx, val.toFixed(1).replace('.', ','), x + w / 2, y + 150, fTitel(76), alarm > 0.3 ? C.koraal : C.text, 'center'); metaText(ctx, label, x + w / 2, y + 190, C.grain, 'center', 20);
  const gx = x + 30, gw = w - 60, gy = y + 220, gh = h - 290; ctx.fillStyle = rgba(C.groen, 0.14); ctx.fillRect(gx, gy + gh * (1 - 8 / 14), gw, gh * 4 / 14);
  if (curve) { ctx.strokeStyle = C.teal; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const v = curve(i / 60); const px = gx + gw * i / 60, py = gy + gh * (1 - clamp(v / 14, 0, 1)); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); }
  ctx.restore(); }
// rond sensortje op de bovenarm (punt (x,y))
function sensor(ctx, x, y, r = 16, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#E6E1D3', '#9AA3B2', 2); circ(ctx, x, y, r * 0.35, '#9AA3B2'); ctx.restore(); }
function insulinePomp(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 40 * s, y - 26 * s, 80 * s, 52 * s, 10 * s); shape(ctx, '#5B6B88', '#AFC0D0', 2); circ(ctx, x + 20 * s, y, 8 * s, HK.hormoon); ctx.restore(); }

// regelkring-schema: vier knopen rond een lus, pijlen met de klok mee, minteken in het midden
// o.nodes: [{t:'titel', s:'onderschrift', col, a}], o.arr:[a0..a3] (pijl van knoop i naar i+1), o.minus, o.pulse 0..1, o.broken:{i:0..1}, o.thin:{i:0..1}
function kringSchema(ctx, cx, cy, o = {}) {
  const { a = 1, rx = 520, ry = 260, nodes = [], arr = [1, 1, 1, 1], minus = 0, pulse = -1, broken = {}, thin = {}, bw = 400, bh = 120, arrCol = C.line } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  const P = [[cx, cy - ry], [cx + rx, cy], [cx, cy + ry], [cx - rx, cy]];
  for (let i = 0; i < 4; i++) { const al = arr[i] || 0; if (al <= 0.01) continue; const p0 = P[i], p1 = P[(i + 1) % 4]; const mid = [(p0[0] + p1[0]) / 2 + (i === 0 || i === 3 ? 1 : -1) * 0, (p0[1] + p1[1]) / 2];
    const ctrl = [p0[0] + p1[0] - cx, p0[1] + p1[1] - cy]; const b = broken[i] || 0, th = thin[i] || 0;
    ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = b > 0.5 ? rgba(C.koraal, 0.6) : arrCol; ctx.lineWidth = lerp(5, 1.5, th); if (b > 0.01) ctx.setLineDash([10, 10]);
    const s0 = i % 2 === 0 ? [p0[0] + (p1[0] > p0[0] ? bw / 2 : -bw / 2) * 0.9, p0[1]] : [p0[0], p0[1] + (p1[1] > p0[1] ? bh / 2 : -bh / 2) + 6];
    const s1 = i % 2 === 0 ? [p1[0], p1[1] + (p0[1] < p1[1] ? -bh / 2 - 8 : bh / 2 + 8)] : [p1[0] + (p0[0] < p1[0] ? -bw / 2 - 8 : bw / 2 + 8), p1[1]];
    ctx.beginPath(); ctx.moveTo(s0[0], s0[1]); ctx.quadraticCurveTo(ctrl[0], ctrl[1], s1[0], s1[1]); ctx.stroke(); ctx.setLineDash([]);
    const an = Math.atan2(s1[1] - ctrl[1], s1[0] - ctrl[0]); ctx.beginPath(); ctx.moveTo(s1[0] - Math.cos(an - 0.45) * 18, s1[1] - Math.sin(an - 0.45) * 18); ctx.lineTo(s1[0], s1[1]); ctx.lineTo(s1[0] - Math.cos(an + 0.45) * 18, s1[1] - Math.sin(an + 0.45) * 18); ctx.stroke();
    if (b > 0.5) { const m = [(s0[0] + 2 * ctrl[0] + s1[0]) / 4, (s0[1] + 2 * ctrl[1] + s1[1]) / 4]; ctx.strokeStyle = C.koraal; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(m[0] - 22, m[1] - 22); ctx.lineTo(m[0] + 22, m[1] + 22); ctx.moveTo(m[0] + 22, m[1] - 22); ctx.lineTo(m[0] - 22, m[1] + 22); ctx.stroke(); }
    if (pulse >= 0 && Math.floor(pulse * 4) === i && b < 0.5) { const u = pulse * 4 - i; const q1 = [lerp(lerp(s0[0], ctrl[0], u), lerp(ctrl[0], s1[0], u), u), lerp(lerp(s0[1], ctrl[1], u), lerp(ctrl[1], s1[1], u), u)]; circ(ctx, q1[0], q1[1], 10, C.goud); }
    ctx.restore(); }
  nodes.forEach((nd, i) => { const na = nd.a == null ? 1 : nd.a; if (na <= 0.01) return; const [x, y] = P[i]; ctx.save(); ctx.globalAlpha *= na; roundRect(ctx, x - bw / 2, y - bh / 2, bw, bh, 18); shape(ctx, rgba(C.bgSchema, 0.95), nd.col || C.line, 2.5);
    if (nd.rol) metaText(ctx, nd.rol, x, y - bh / 2 - 14, nd.col || C.grain, 'center', 22);
    text(ctx, nd.t, x, y + (nd.s ? -4 : 12), fTekst(36, 700), C.text, 'center'); if (nd.s) text(ctx, nd.s, x, y + 36, fTekst(28), C.text2, 'center'); ctx.restore(); });
  if (minus > 0.01) { ctx.save(); ctx.globalAlpha *= minus; circ(ctx, cx, cy, 54, rgba(HK.rem, 0.25), HK.rem, 3); ctx.fillStyle = C.text; ctx.fillRect(cx - 24, cy - 5, 48, 10); metaText(ctx, 'NEGATIEVE TERUGKOPPELING', cx, cy + 96, C.grain, 'center', 22); ctx.restore(); }
  ctx.restore(); return P;
}
// eilandje van Langerhans (Micro): bètacellen (oker) en alfacellen (groen) rond een haarvat
function eilandje(ctx, x, y, r, o = {}) { const { a = 1, beta = 0, alfa = 0, t = 0, kapot = 0, moe = 0 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  blob(ctx, x, y, r, r * 0.86, 0.05, 5, t); shape(ctx, rgba(HK.klier, 0.12), HK.klierR, 2);
  ctx.strokeStyle = HK.bloed; ctx.lineWidth = r * 0.12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 1.05, y + r * 0.1); ctx.bezierCurveTo(x - r * 0.3, y - r * 0.25, x + r * 0.3, y + r * 0.35, x + r * 1.05, y - r * 0.05); ctx.stroke();
  for (let i = 0; i < 26; i++) { const an = hash(i * 3 + 1) * 6.283, d = Math.sqrt(hash(i * 3 + 2)) * r * 0.78; const cx2 = x + Math.cos(an) * d, cy2 = y + Math.sin(an) * d * 0.86; const isA = i % 4 === 0;
    let col = isA ? C.groen : HK.klierR, glow = isA ? alfa : beta; if (!isA && kapot > 0.01) { ctx.save(); ctx.globalAlpha *= 1 - kapot * 0.85; }
    circ(ctx, cx2, cy2, r * 0.1, rgba(col, 0.3 + 0.5 * glow * (isA ? 1 : 1 - moe * 0.6)), col, 1.5); if (!isA && kapot > 0.01) ctx.restore(); }
  ctx.restore(); }
// cel met glycogeen (lever of spier); fill 0..1
function cel(ctx, x, y, w, h, o = {}) { const { a = 1, naam = '', glyco = 0, col = HK.cel, t = 0, seed = 2 } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  // cel als zachte, ronde vorm (prompt v13 C9: nooit een doos), met rustige textuur binnen
  blob(ctx, x, y, w / 2, h / 2, 0.04, seed, t); shape(ctx, rgba(col, 0.14), rgba(col, 0.9), 2.5); celTextuur(ctx, (px, py) => ((px - x) / (w / 2 - 12)) ** 2 + ((py - y) / (h / 2 - 12)) ** 2 < 1, 40, seed * 5 + 2, [x - w / 2, y - h / 2, w, h]); circ(ctx, x + w * 0.22, y - h * 0.12, Math.min(w, h) * 0.13, rgba(C.kern, 0.5), C.kernR, 1.5);
  if (glyco > 0.01) glycogeenKeten(ctx, x - w * 0.15, y + h * 0.08, 0.55 + 0.6 * glyco, Math.min(1, glyco * 2), glyco);
  if (naam) text(ctx, naam, x, y + h / 2 + 46, fTekst(34, 700), C.text, 'center'); ctx.restore(); }

// glycogeen als vertakte keten van glucose (teal zeshoekjes), zodat het niet op een hormoon lijkt; n 0..1 = hoe vol
function glycogeenKeten(ctx, x, y, s = 1, a = 1, n = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const r = 9 * s, d = 17 * s; const pts = [];
  for (let i = 0; i < 7; i++) pts.push([x - 3 * d + i * d, y]);
  for (const [bi, dir] of [[1, -1], [3, 1], [5, -1]]) for (let k = 1; k <= 3; k++) pts.push([x - 3 * d + bi * d + k * d * 0.5, y + dir * k * d * 0.86]);
  const m = Math.max(1, Math.round(pts.length * clamp(n, 0, 1)));
  ctx.strokeStyle = rgba(HK.glucose, 0.6); ctx.lineWidth = 2; ctx.beginPath(); pts.slice(0, 7).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
  for (let i = 0; i < m; i++) hexagon(ctx, pts[i][0], pts[i][1], r, rgba(HK.glucose, 0.55), HK.glucose, 1.3, 0);
  ctx.restore(); }

// ---------- prompt v13 (28 okt 2026) ----------
function dot(ctx, x, y, r, fill, stroke, lw = 1.2) { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } } // nodig voor lib_anatomie
// rustige textuur in het cytoplasma (alleen binnen een cel; prompt v13 C2): weinig, kleine beige stipjes
function celTextuur(ctx, inside, n = 60, seed = 1, box = [0, 0, 1920, 1080]) { ctx.save(); for (let i = 0; i < n; i++) { const px = box[0] + hash(i * 13 + seed) * box[2], py = box[1] + hash(i * 29 + seed * 7) * box[3]; if (!inside(px, py)) continue; ctx.fillStyle = rgba('#C9B896', 0.1 + 0.05 * hash(i * 3 + seed)); ctx.beginPath(); ctx.arc(px, py, 1.6 + 1.4 * hash(i * 5 + seed), 0, 6.283); ctx.fill(); } ctx.restore(); }
