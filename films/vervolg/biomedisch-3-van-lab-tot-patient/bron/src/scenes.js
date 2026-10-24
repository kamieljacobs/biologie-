
function tag(ctx, s, x, y, col, a = 1, align = 'center', px = 32) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 600); const w = ctx.measureText(s).width + 40; const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; roundRect(ctx, x0, y - px - 6, w, px + 22, (px + 22) / 2); shape(ctx, rgba(col, 0.16), col, 1.5); text(ctx, s, x0 + w / 2, y, fTekst(px, 600), C.text, 'center'); ctx.restore(); }
function regel(ctx, s, x, y, a = 1, col = C.text, px = 32, align = 'left', w = 600) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, s, x, y, fTekst(px, w), col, align); ctx.restore(); }
function vraagteken(ctx, x, y, a = 1, px = 120) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; text(ctx, '?', x, y, fTitel(px), C.goud, 'center'); ctx.restore(); }
function kruis(ctx, x, y, s, a = 1, col = C.koraal) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); }
function vink_(ctx, x, y, s, a = 1, col = C.groen) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * 0.3, y + s * 0.7); ctx.lineTo(x + s, y - s * 0.8); ctx.stroke(); ctx.restore(); }
function pijl(ctx, x1, y1, x2, y2, col, a = 1, lw = 4, kop = 16) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const an = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - kop * Math.cos(an - 0.45), y2 - kop * Math.sin(an - 0.45)); ctx.lineTo(x2 - kop * Math.cos(an + 0.45), y2 - kop * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }
function wolk(ctx, x, y, w, h, s, a = 1, col = '#F2F2EE', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, 6.283); shape(ctx, rgba(col, 0.95), null); circ(ctx, x + 30, y + h + 12, 10, rgba(col, 0.95)); circ(ctx, x + 10, y + h + 34, 6, rgba(col, 0.95)); ctx.font = fTekst(px, 600); ctx.fillStyle = '#121A26'; ctx.textAlign = 'center'; const words = s.split(' '); let l1 = '', l2 = ''; for (const wd of words) { if (ctx.measureText(l1 + ' ' + wd).width < w - 50 && !l2) l1 = l1 ? l1 + ' ' + wd : wd; else l2 = l2 ? l2 + ' ' + wd : wd; } if (l2) { ctx.fillText(l1, x + w / 2, y + h / 2 - 4); ctx.fillText(l2, x + w / 2, y + h / 2 + px + 2); } else ctx.fillText(l1, x + w / 2, y + h / 2 + 10); ctx.textAlign = 'left'; ctx.restore(); }


function paneel(ctx, x, y, w, h, titel, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba(C.fill, 0.45), C.line, 1.5); if (titel) regel(ctx, titel, x + w / 2, y + 44, 1, C.text2, 26, 'center', 700); ctx.restore(); }
function zon(ctx, x, y, r, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 10; i++) { const an = i * 0.628 + t * 0.2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3); ctx.lineTo(x + Math.cos(an) * r * 1.65, y + Math.sin(an) * r * 1.65); ctx.stroke(); } circ(ctx, x, y, r, '#F2C94C'); ctx.restore(); }

// ---------- tekeningen ----------
function figuur(ctx, x, y, h, col = '#5A6478', o = {}) { const { a = 1, jas = null, hoofd = '#C9A688' } = o; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const s = h / 300; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-18, -110); ctx.moveTo(20, 0); ctx.lineTo(18, -110); ctx.stroke();
  roundRect(ctx, -48, -230, 96, 130, 30); shape(ctx, jas || col, null); circ(ctx, 0, -262, 34, hoofd); ctx.restore(); }
function bubbel(ctx, x, y, s2, col = '#F2F2EE', a = 1, px = 34) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(px, 800); const w = Math.max(56, ctx.measureText(s2).width + 30); roundRect(ctx, x - w / 2, y - px - 12, w, px + 24, 14); shape(ctx, col, null); ctx.beginPath(); ctx.moveTo(x - 8, y + 12); ctx.lineTo(x, y + 26); ctx.lineTo(x + 8, y + 12); ctx.fillStyle = col; ctx.fill(); text(ctx, s2, x, y, fTekst(px, 800), '#121A26', 'center'); ctx.restore(); }
function lijnenKaart(ctx, x, y, w, h, a = 1, hl = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 12); shape(ctx, '#F2F2EE', '#9AA3B2', 2); ctx.strokeStyle = '#121A26'; ctx.lineWidth = 8; ctx.lineCap = 'butt';
  const base = y + h - 50, L = [h * 0.5, h * 0.62, h * 0.38]; ctx.beginPath(); ctx.moveTo(x + w * 0.16, base); ctx.lineTo(x + w * 0.16, base - h * 0.62); ctx.stroke();
  ['A', 'B', 'C'].forEach((l, i) => { const xx = x + w * (0.45 + i * 0.18); ctx.strokeStyle = i === 1 && hl > 0.5 ? C.groen : '#121A26'; ctx.beginPath(); ctx.moveTo(xx, base); ctx.lineTo(xx, base - L[i]); ctx.stroke(); text(ctx, l, xx, base + 36, fTekst(30, 800), '#121A26', 'center'); }); ctx.restore(); }
function stippen(ctx, x, y, n, k, col, a = 1, per = 10, r = 14, gap = 36) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) circ(ctx, x + (i % per) * gap, y + Math.floor(i / per) * gap, r, i < k ? col : '#3A4458'); ctx.restore(); }
function balk(ctx, x, y, w, frac, col, label, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 40, 10); shape(ctx, '#2A3446', C.line, 1.5); if (frac > 0.005) { roundRect(ctx, x, y, Math.max(20, w * frac), 40, 10); shape(ctx, rgba(col, 0.75), col, 2); } if (label) regel(ctx, label, x, y - 14, 1, C.text, 24, 'left', 700); ctx.restore(); }
function schakelaars(ctx, x, y, n, aan, a = 1, max = 30) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20, y - 40, n * 44 + 30, 150, 12); shape(ctx, '#3A3E46', '#6A7080', 2); for (let i = 0; i < n; i++) { const on = i < aan; roundRect(ctx, x + i * 44, y, 28, 50, 6); shape(ctx, on ? C.koraal : '#8A8E96', null); circ(ctx, x + i * 44 + 14, y - 16, 6, on ? '#F2C94C' : '#5A5E66'); if (i % 5 === 0 || i === n - 1) text(ctx, String(15 * (i + 1)), x + i * 44 + 14, y + 84, fTekst(16, 700), '#C9CED6', 'center'); } ctx.restore(); }
function marshmallow(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#E8E2D8'; ctx.fill(); ctx.fillStyle = '#F8F4EE'; ctx.fillRect(x - 28 * s, y - 36 * s, 56 * s, 36 * s); ctx.beginPath(); ctx.ellipse(x, y - 36 * s, 28 * s, 10 * s, 0, 0, 6.283); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore(); }
function bord(ctx, x, y, s = 1, n = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, 90 * s, 26 * s, 0, 0, 6.283); shape(ctx, '#D8DEE4', '#9AA3B2', 2); for (let i = 0; i < n; i++) marshmallow(ctx, x + (i - (n - 1) / 2) * 60 * s, y + 4 * s, s); ctx.restore(); }
function klokje(ctx, x, y, r, frac, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, '#F2F2EE', '#9AA3B2', 3); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r - 6, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fillStyle = rgba(C.goud, 0.6); ctx.fill(); ctx.restore(); }
function stempel(ctx, x, y, s2, col, a = 1, rot = -0.15) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.font = fTekst(40, 800); const w = ctx.measureText(s2).width + 50; roundRect(ctx, -w / 2, -38, w, 70, 10); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.stroke(); text(ctx, s2, 0, 12, fTekst(40, 800), col, 'center'); ctx.restore(); }
function map_(ctx, x, y, a = 1, lab = 'archief') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#C9A35C'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 80, y); ctx.lineTo(x + 100, y + 20); ctx.lineTo(x + 240, y + 20); ctx.lineTo(x + 240, y + 180); ctx.lineTo(x, y + 180); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#F2EAD8'; ctx.fillRect(x + 20, y + 40, 200, 120); ctx.strokeStyle = '#9A8A6A'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + 36, y + 64 + i * 20); ctx.lineTo(x + 200 - (i % 2) * 40, y + 64 + i * 20); ctx.stroke(); } text(ctx, lab, x + 120, y + 214, fTekst(22, 700), C.text2, 'center'); ctx.restore(); }
function assen(ctx, x, y, w, h, xl, yl) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); if (xl) metaText(ctx, xl, x + w, y + h + 34, C.text2, 'right', 18); metaText(ctx, yl, x, y - 16, C.text2, 'left', 18); }

function chip(ctx, s, x, y, col, a = 1, px = 24) { tag(ctx, s, x, y, col, a, 'center', px); }
const SCENES = {};
// castboek heeft circ() nodig
function circ(ctx,x,y,r,fill,stroke,lw=1.5){ ctx.beginPath(); ctx.arc(x,y,r,0,6.283); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();} }
// ===== Anatomie — realistisch lichaam met organen (21 okt 2026) =====
// Vervangt het oude 'poppetje' (rond hoofd, blokkenlijf) in lichaamskaarten. Vooraanzicht van een tiener,
// echte verhoudingen (hoofd = 1/7,3 van de lengte), organen op hun echte plek (hart en maag links in het lichaam
// = rechts in beeld, lever rechts in het lichaam = links in beeld).
// Gebruik: zet BODY = {cx, yb, h} (midden, voeten, lengte) en roep bodyOrgans({...}) aan, zelfde sleutels als vroeger:
//   sil (lichaam), zenuw, spijs, adem, bloed, uitsch, skelet, spier, afweer, hormoon, voortpl (0..1), t, beat, breath
// Losse organen (met gloed als ze oplichten): liver, pancreas, mouth, skull, skin, eyes, nose, testes, spleen.
// AP(x,y): hoofdhoogte-coördinaten (x vanaf het midden, y vanaf de kruin, voeten op 7,3) → pixels.

const ANA = { huid:'#D9A982', huidS:'#BF8C66', haar:'#4A2E1E', ink:'#3A2418', short:'#3F5F86',
  brein:'#E7B2BC', breinS:'#C98C99', long:'#E8A2A8', longS:'#C9787F', hart:'#B8333B', hartL:'#D9555B',
  slag:'#D04A44', ader:'#5677C2', lever:'#8E3B32', leverL:'#A84E43', gal:'#6E9A4A', maag:'#E39C8A', maagS:'#C67D6C',
  darm:'#EDB79F', darmS:'#C98C74', dik:'#D9967A', dikS:'#B67459', alv:'#E9C27E', milt:'#7D3A52', nier:'#9B3D3A', nierL:'#B85450',
  blaas:'#E6C878', urine:'#F0D66A', bot:'#ECE5D3', botS:'#BDB49E', spier:'#B9524C', spierL:'#D47A70', zenuw:'#B79AE6', lymf:'#7CC48A',
  klier:'#E8B84A', baar:'#D9868A', slok:'#D98C80', lucht:'#E6D3C3' };
const AN_H = 7.3;
function AB(){ const HH=BODY.h/AN_H; return { HH, top:BODY.yb-BODY.h, cx:BODY.cx }; }
function AP(x,y){ const b=AB(); return [b.cx+x*b.HH, b.top+y*b.HH]; }
function APs(pts){ return pts.map(p=>AP(p[0],p[1])); }
function AHH(){ return AB().HH; }
// vloeiend pad door punten (Catmull-Rom → Bézier)
function anPath(ctx,P,closed=true){ const n=P.length; ctx.beginPath(); ctx.moveTo(P[0][0],P[0][1]); const N=closed?n:n-1;
  for(let i=0;i<N;i++){ const p0=P[(i-1+n)%n], p1=P[i], p2=P[(i+1)%n], p3=P[(i+2)%n]; const a0=(!closed&&i===0)?p1:p0, a3=(!closed&&i===n-2)?p2:p3;
    ctx.bezierCurveTo(p1[0]+(p2[0]-a0[0])/6, p1[1]+(p2[1]-a0[1])/6, p2[0]-(a3[0]-p1[0])/6, p2[1]-(a3[1]-p1[1])/6, p2[0], p2[1]); }
  if(closed) ctx.closePath(); }
// rechterhelft (x ≥ 0, van boven naar beneden) → hele omtrek, gespiegeld
function anSym(R){ const L=R.slice().reverse().filter(p=>p[0]!==0).map(p=>[-p[0],p[1]]); return R.concat(L); }
function anMir(pts,s){ return pts.map(p=>[p[0]*s,p[1]]); }
function anGlow(color,g){ if(g>0.01){ ctx.shadowColor=color; ctx.shadowBlur=26*g; } }
function anShape(pts,fill,stroke,lw=1.5,closed=true,glow=0){ ctx.save(); anGlow(fill,glow); anPath(ctx,APs(pts),closed); ctx.fillStyle=fill; ctx.fill(); ctx.shadowBlur=0; if(stroke){ ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); } ctx.restore(); }
function anLine(pts,color,w,closed=false,dash=null){ ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round'; if(dash) ctx.setLineDash(dash); anPath(ctx,APs(pts),closed); ctx.stroke(); ctx.restore(); }
// punt op een polylijn (in px) op fractie u, met lengtes
function anAlong(P,u){ let L=0; const seg=[]; for(let i=1;i<P.length;i++){ const d=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]); seg.push(d); L+=d; }
  let r=clamp(u,0,1)*L; for(let i=0;i<seg.length;i++){ if(r<=seg[i]||i===seg.length-1){ const k=seg[i]?Math.min(1,r/seg[i]):0; return [lerp(P[i][0],P[i+1][0],k), lerp(P[i][1],P[i+1][1],k)]; } r-=seg[i]; } return P[P.length-1]; }
// dichte versie van een vloeiend pad (voor bewegende deeltjes)
function anDense(pts,n=60){ const P=APs(pts), out=[]; const m=P.length; for(let i=0;i<m-1;i++){ const p0=P[Math.max(0,i-1)], p1=P[i], p2=P[i+1], p3=P[Math.min(m-1,i+2)];
  for(let k=0;k<n/m+2;k++){ const s=k/(n/m+2); const s2=s*s, s3=s2*s; const f=(a,b,c,d)=>0.5*((2*b)+(-a+c)*s+(2*a-5*b+4*c-d)*s2+(-a+3*b-3*c+d)*s3); out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])]); } } out.push(P[m-1]); return out; }

// ---------- het lichaam zelf ----------
const AN_BODY=[[0.15,0.9],[0.17,1.16],[0.3,1.3],[0.6,1.37],[0.86,1.45],[0.99,1.6],[1.06,1.9],[1.1,2.35],[1.14,2.8],[1.2,3.2],[1.25,3.65],[1.27,3.98],[1.33,4.2],[1.34,4.46],[1.27,4.66],[1.17,4.63],[1.12,4.38],[1.09,4.05],[1.03,3.62],[0.97,3.18],[0.93,2.82],[0.89,2.35],[0.85,2.02],[0.79,1.88],[0.73,2.05],[0.7,2.55],[0.63,2.98],[0.68,3.35],[0.76,3.72],[0.75,4.25],[0.66,4.85],[0.56,5.28],[0.57,5.55],[0.6,5.92],[0.52,6.45],[0.42,6.92],[0.48,7.1],[0.47,7.3],[0.2,7.3],[0.17,7.08],[0.22,6.9],[0.16,6.35],[0.13,5.85],[0.13,5.3],[0.1,4.8],[0.07,4.3],[0,4.04]];
const AN_HEAD=[[0,-0.01],[0.22,0.03],[0.36,0.18],[0.39,0.42],[0.36,0.66],[0.28,0.86],[0.14,0.98],[0,1.01]];
const AN_TRUNK=[[0,1.36],[0.55,1.5],[0.64,2.1],[0.6,2.95],[0.65,3.5],[0.45,3.9],[0,3.98]];
function anFigure(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  const body=APs(anSym(AN_BODY)), head=APs(anSym(AN_HEAD));
  // lijf: schaduwtint, dan de lichte kant er bovenop (licht van links)
  const fillBody=(col,dx)=>{ ctx.save(); ctx.translate(dx,0); anPath(ctx,body); ctx.fillStyle=col; ctx.fill(); anPath(ctx,head); ctx.fill(); ctx.restore(); };
  fillBody(ANA.huidS,0); ctx.save(); anPath(ctx,body); ctx.clip(); fillBody(ANA.huid,-0.07*HH); ctx.restore();
  ctx.save(); anPath(ctx,head); ctx.clip(); fillBody(ANA.huid,-0.06*HH); ctx.restore();
  // oren
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.385,0.53); ctx.beginPath(); ctx.ellipse(ex,ey,0.06*HH,0.12*HH,0,0,6.283); ctx.fillStyle=s<0?ANA.huid:ANA.huidS; ctx.fill(); }
  // kaaklijn-schaduw, sleutelbeenderen, navel, knieën (zachte lijntjes)
  ctx.save(); ctx.globalAlpha*=0.5; anShape([[-0.2,1.0],[0,1.08],[0.2,1.0],[0.17,1.12],[0,1.17],[-0.17,1.12]],ANA.huidS,null);
  anLine([[-0.62,1.42],[-0.3,1.47],[-0.08,1.43]],ANA.huidS,0.025*HH); anLine([[0.62,1.42],[0.3,1.47],[0.08,1.43]],ANA.huidS,0.025*HH);
  const [nx,ny]=AP(0,3.12); dot(ctx,nx,ny,0.03*HH,ANA.huidS);
  for(const s of [-1,1]) anLine([[s*0.24,5.2],[s*0.33,5.27],[s*0.42,5.2]],ANA.huidS,0.02*HH); ctx.restore();
  // zwembroek
  const SH=[[0,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.13,4.36],[0.09,4.12],[0,4.07]];
  ctx.save(); anPath(ctx,body); ctx.clip(); anShape(anSym(SH),ANA.short,null); ctx.globalAlpha*=0.35; anShape([[0.45,3.48],[0.66,3.44],[0.75,3.72],[0.76,4.0],[0.73,4.32],[0.5,4.34]],'#1E2E44',null); ctx.restore();
  // haar
  const HR=[[0,-0.07],[0.24,-0.04],[0.4,0.12],[0.43,0.34],[0.39,0.47],[0.36,0.3],[0.3,0.22],[0.22,0.25],[0.16,0.19],[0.08,0.24],[0,0.2]];
  anShape(anSym(HR),ANA.haar,null); ctx.save(); ctx.globalAlpha*=0.35; anLine([[-0.1,0.0],[0.05,0.08],[0.2,0.04]],'#7A5236',0.02*HH); anLine([[0.12,-0.03],[0.28,0.06],[0.36,0.2]],'#7A5236',0.018*HH); ctx.restore();
  // gezicht (iets sterker dan het lijf, zodat het een mens blijft)
  ctx.save(); ctx.globalAlpha=Math.min(1,ctx.globalAlpha*1.6);
  for(const s of [-1,1]){ const [bx,by]=AP(s*0.15,0.4); ctx.strokeStyle=ANA.haar; ctx.lineWidth=0.03*HH; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx-s*0.07*HH,by+0.01*HH); ctx.quadraticCurveTo(bx,by-0.025*HH,bx+s*0.07*HH,by+0.005*HH); ctx.stroke();
    const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.072*HH,0.042*HH,0,0,6.283); ctx.fillStyle='#FBF7F0'; ctx.fill(); dot(ctx,ex+0.008*HH,ey,0.034*HH,'#5A3A26'); dot(ctx,ex+0.008*HH,ey,0.018*HH,'#1E140E'); dot(ctx,ex+0.02*HH,ey-0.012*HH,0.009*HH,'#FFFFFF');
    const [cx2,cy2]=AP(s*0.24,0.7); dot(ctx,cx2,cy2,0.06*HH,rgba('#E07A5F',0.18)); }
  ctx.strokeStyle=ANA.huidS; ctx.lineWidth=0.022*HH; ctx.lineCap='round'; const [n1x,n1y]=AP(0.02,0.55), [n2x,n2y]=AP(0.05,0.69); ctx.beginPath(); ctx.moveTo(n1x,n1y); ctx.quadraticCurveTo(n2x+0.02*HH,n2y-0.04*HH,n2x,n2y); ctx.lineTo(n2x-0.07*HH,n2y+0.005*HH); ctx.stroke();
  const [mx,my]=AP(0,0.81); ctx.strokeStyle='#A85E50'; ctx.lineWidth=0.028*HH; ctx.beginPath(); ctx.moveTo(mx-0.1*HH,my-0.01*HH); ctx.quadraticCurveTo(mx,my+0.05*HH,mx+0.1*HH,my-0.01*HH); ctx.stroke();
  ctx.restore(); ctx.restore(); }
// lichaamsholte: iets donkerder in de romp, zodat organen eruit springen
function anCavity(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a*0.6; ctx.filter='blur('+Math.round(0.08*AHH())+'px)'; anShape(anSym(AN_TRUNK),'#1A1220',null); ctx.restore(); }

// ---------- skelet ----------
function anBone(x1,y1,x2,y2,w,a=1){ const HH=AHH(); const [p,q]=[AP(x1,y1),AP(x2,y2)]; ctx.save(); ctx.globalAlpha*=a; ctx.lineCap='round';
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=w*HH+3; ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke();
  ctx.strokeStyle=ANA.bot; ctx.lineWidth=w*HH; ctx.stroke(); for(const e of [p,q]){ ctx.beginPath(); ctx.arc(e[0],e[1],w*HH*0.95,0,6.283); ctx.fillStyle=ANA.bot; ctx.fill(); ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; ctx.stroke(); } ctx.restore(); }
function anSkeleton(a,o={}){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  if(o.schedel!==false) anSkull(1,0);
  // wervelkolom
  for(let i=0;i<24;i++){ const y=1.05+i*0.118; const w=(i<7?0.05:i<19?0.06:0.075); const [x0,y0]=AP(-w,y); roundRect(ctx,x0,y0,2*w*HH,0.085*HH,0.02*HH); shape(ctx,ANA.bot,ANA.botS,1); }
  // bekken
  for(const s of [-1,1]) anShape([[s*0.08,3.42],[s*0.4,3.2],[s*0.66,3.28],[s*0.64,3.55],[s*0.48,3.72],[s*0.32,3.92],[s*0.06,3.98],[s*0.1,3.78]],ANA.bot,ANA.botS,1.2);
  anShape([[-0.1,3.4],[0.1,3.4],[0.07,3.75],[0,3.85],[-0.07,3.75]],ANA.botS,null);
  // ribbenkast + borstbeen + sleutelbeenderen
  ctx.save(); ctx.lineCap='round'; for(let i=0;i<10;i++){ const y=1.58+i*0.105, w=0.42+Math.min(i,5)*0.045-Math.max(0,i-6)*0.02; for(const s of [-1,1]){ const P=APs([[s*0.06,y],[s*w*0.7,y-0.02],[s*w,y+0.12],[s*(w+0.02),y+0.28+i*0.01]]); ctx.strokeStyle=ANA.botS; ctx.lineWidth=0.05*HH; anPath(ctx,P,false); ctx.stroke(); ctx.strokeStyle=ANA.bot; ctx.lineWidth=0.034*HH; ctx.stroke(); } }
  anShape([[-0.06,1.48],[0.06,1.48],[0.05,2.3],[0,2.42],[-0.05,2.3]],ANA.bot,ANA.botS,1.2);
  for(const s of [-1,1]){ anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.botS,0.05*HH); anLine([[s*0.07,1.42],[s*0.35,1.47],[s*0.8,1.42]],ANA.bot,0.034*HH); } ctx.restore();
  // armen en benen
  for(const s of [-1,1]){ anBone(s*0.88,1.55,s*1.03,2.82,0.07); anBone(s*1.04,2.92,s*1.16,3.98,0.045); anBone(s*1.0,2.92,s*1.1,3.98,0.04);
    for(let k=0;k<4;k++){ const fx=s*(1.15+k*0.035); anBone(s*1.17,4.05,fx,4.45+(k===1||k===2?0.05:0),0.022); }
    anBone(s*0.4,3.75,s*0.33,5.15,0.09); const [px2,py2]=AP(s*0.33,5.2); dot(ctx,px2,py2,0.07*HH,ANA.bot,ANA.botS,1.2);
    anBone(s*0.31,5.3,s*0.3,6.92,0.07); anBone(s*0.42,5.33,s*0.4,6.92,0.035);
    anShape([[s*0.24,6.98],[s*0.42,6.98],[s*0.47,7.22],[s*0.22,7.24]],ANA.bot,ANA.botS,1.2); }
  ctx.restore(); }
// schedel als losse laag (ook voor 'schedel'-label); g = gloed
function anSkull(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anShape(anSym([[0,0.0],[0.22,0.03],[0.35,0.17],[0.38,0.42],[0.33,0.63],[0.24,0.72],[0,0.74]]),ANA.bot,ANA.botS,1.5,true,g);
  anShape(anSym([[0,0.7],[0.24,0.7],[0.27,0.84],[0.18,0.98],[0,1.0]]),ANA.bot,ANA.botS,1.5);
  for(const s of [-1,1]){ const [ex,ey]=AP(s*0.15,0.5); ctx.beginPath(); ctx.ellipse(ex,ey,0.1*HH,0.085*HH,0,0,6.283); ctx.fillStyle='#3A3442'; ctx.fill(); }
  anShape([[0,0.58],[0.05,0.68],[0,0.7],[-0.05,0.68]],'#3A3442',null);
  ctx.strokeStyle=ANA.botS; ctx.lineWidth=1.2; for(let k=-3;k<=3;k++){ const [tx,ty]=AP(k*0.04,0.76); ctx.strokeRect(tx-0.018*HH,ty,0.036*HH,0.06*HH); }
  ctx.restore(); }

// ---------- spieren ----------
function anMuscle(pts,a=1,fib=null){ anShape(pts,ANA.spier,ANA.spierL,1.2); if(fib){ ctx.save(); ctx.globalAlpha*=0.45; fib.forEach(f=>anLine(f,ANA.spierL,1.2)); ctx.restore(); } }
function anMuscles(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ const M=p=>anMir(p,s);
    anMuscle(M([[0.06,1.55],[0.5,1.5],[0.78,1.62],[0.66,1.98],[0.3,2.12],[0.07,2.05]]),1,[M([[0.1,1.7],[0.6,1.68]]),M([[0.1,1.88],[0.62,1.82]])]); // borstspier
    anMuscle(M([[0.72,1.44],[0.92,1.48],[1.04,1.72],[0.98,2.05],[0.84,1.85]])); // schouder
    anMuscle(M([[0.9,2.0],[1.02,2.05],[1.08,2.5],[1.04,2.82],[0.94,2.75],[0.9,2.35]]),1,[M([[0.97,2.1],[1.0,2.75]])]); // biceps
    anMuscle(M([[0.97,2.92],[1.12,2.92],[1.2,3.35],[1.2,3.8],[1.12,3.8],[1.02,3.35]])); // onderarm
    anMuscle(M([[0.56,2.2],[0.66,2.6],[0.6,3.0],[0.62,3.35],[0.4,3.4],[0.42,2.7]])); // schuine buikspier
    anMuscle(M([[0.34,3.75],[0.72,3.8],[0.7,4.4],[0.56,5.05],[0.38,5.1],[0.3,4.5]]),1,[M([[0.45,3.9],[0.48,5.0]]),M([[0.6,3.95],[0.55,4.9]])]); // dijbeen
    anMuscle(M([[0.14,4.15],[0.3,4.3],[0.36,5.0],[0.2,4.95],[0.12,4.6]])); // binnenkant dij
    anMuscle(M([[0.42,5.35],[0.56,5.45],[0.6,5.9],[0.52,6.35],[0.44,6.1]])); // kuit
    anMuscle(M([[0.26,5.4],[0.34,5.38],[0.36,6.2],[0.3,6.6],[0.24,6.0]])); // scheenbeenspier
  }
  // rechte buikspier met 'blokjes'
  anMuscle([[-0.3,2.3],[0.3,2.3],[0.32,3.1],[0.24,3.75],[0,3.85],[-0.24,3.75],[-0.32,3.1]]);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0,2.3],[0,3.82]],ANA.spierL,2); [2.55,2.82,3.1].forEach(y=>anLine([[-0.3,y],[0.3,y+0.01]],ANA.spierL,2)); ctx.restore();
  ctx.restore(); }

// ---------- spijsvertering ----------
const AN_SLOK=[[0.0,0.92],[0.01,1.3],[0.02,1.9],[0.06,2.2],[0.12,2.37]];
const AN_MAAG=[[0.1,2.38],[0.26,2.29],[0.46,2.32],[0.58,2.47],[0.59,2.71],[0.48,2.89],[0.27,2.96],[0.06,2.91],[-0.07,2.82],[-0.06,2.74],[0.08,2.77],[0.22,2.74],[0.31,2.63],[0.27,2.49],[0.16,2.45]];
const AN_LEVER=[[-0.67,2.3],[-0.4,2.2],[-0.12,2.23],[0.08,2.27],[0.2,2.32],[0.06,2.42],[-0.1,2.52],[-0.34,2.67],[-0.58,2.7],[-0.69,2.55]];
const AN_ALV=[[-0.16,2.79],[-0.06,2.75],[0.18,2.72],[0.38,2.66],[0.52,2.64],[0.54,2.7],[0.38,2.75],[0.16,2.82],[-0.04,2.87],[-0.14,2.91]];
const AN_DIK=[[-0.44,3.72],[-0.5,3.42],[-0.52,3.05],[-0.46,2.84],[-0.22,2.98],[0.1,3.04],[0.38,2.92],[0.54,2.76],[0.57,3.05],[0.54,3.5],[0.42,3.8],[0.2,3.74],[0.07,3.82],[0.0,3.98]];
function anDunPts(){ const P=[[-0.06,2.76],[-0.18,2.84],[-0.2,3.02],[0.02,3.1]]; const rows=5; for(let r=0;r<rows;r++){ const y=3.16+r*0.1, dir=r%2?-1:1; for(let k=0;k<=6;k++){ const u=k/6; P.push([dir*(-0.34+0.68*u),y+Math.sin(u*Math.PI*3)*0.025]); } } P.push([-0.38,3.66],[-0.44,3.7]); return P; }
const AN_GUT=()=>{ const d=anDunPts(); return [[0,0.8],[0,0.95]].concat(AN_SLOK.slice(1)).concat([[0.25,2.47],[0.38,2.57],[0.36,2.75],[0.15,2.83]]).concat(d.slice(0)).concat(AN_DIK.slice(1)); };
function anTube(pts,w,col,colS,t=0,amp=0){ const HH=AHH(); const P=anDense(pts,Math.max(60,pts.length*10)); ctx.save(); ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.strokeStyle=colS; ctx.lineWidth=w*HH+3; ctx.beginPath(); P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke();
  if(amp>0){ for(let i=1;i<P.length;i++){ const k=1+amp*Math.sin(i*0.35-t*4); ctx.strokeStyle=col; ctx.lineWidth=w*HH*k; ctx.beginPath(); ctx.moveTo(P[i-1][0],P[i-1][1]); ctx.lineTo(P[i][0],P[i][1]); ctx.stroke(); } }
  else { ctx.strokeStyle=col; ctx.lineWidth=w*HH; ctx.stroke(); }
  ctx.restore(); return P; }
function anDigest(a,t=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  anTube(AN_SLOK,0.05,ANA.slok,'#A8625A');
  // dikke darm met haustra-insnoeringen
  const D=anTube(AN_DIK,0.12,ANA.dik,ANA.dikS,t,0.04); ctx.strokeStyle=ANA.dikS; ctx.lineWidth=1.5; for(let i=6;i<D.length-8;i+=6){ const p=D[i], q=D[i+1]; const dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy)||1; const nx=-dy/L*0.055*HH, ny=dx/L*0.055*HH; ctx.beginPath(); ctx.moveTo(p[0]-nx,p[1]-ny); ctx.lineTo(p[0]+nx,p[1]+ny); ctx.stroke(); }
  anLine([[-0.42,3.74],[-0.4,3.83],[-0.36,3.86]],ANA.dikS,0.035*HH); // blindedarm/appendix
  // dunne darm: kronkelende buis
  anTube(anDunPts(),0.065,ANA.darm,ANA.darmS,t,0.06);
  // maag met plooien
  anShape(AN_MAAG,ANA.maag,ANA.maagS,2); ctx.save(); ctx.globalAlpha*=0.5; anLine([[0.2,2.37],[0.38,2.45],[0.45,2.65]],ANA.maagS,1.5); anLine([[0.12,2.81],[0.3,2.8],[0.42,2.73]],ANA.maagS,1.5); ctx.restore();
  ctx.restore(); }
function liver(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_LEVER,ANA.lever,ANA.leverL,2,true,g); ctx.globalAlpha*=0.6; anLine([[0.05,2.26],[-0.02,2.4],[-0.1,2.54]],ANA.leverL,1.5); anShape([[-0.3,2.6],[-0.22,2.62],[-0.2,2.72],[-0.28,2.72]],ANA.gal,null); ctx.restore(); }
function pancreas(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape(AN_ALV,ANA.alv,'#C99E58',1.5,true,g); ctx.globalAlpha*=0.5; for(let k=0;k<7;k++){ const [x,y]=AP(-0.08+k*0.08,2.79-k*0.017); dot(ctx,x,y,1.8,'#C99E58'); } ctx.restore(); }
function spleen(a,g=0){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; anShape([[0.5,2.46],[0.6,2.4],[0.68,2.53],[0.66,2.76],[0.57,2.76],[0.55,2.62]],ANA.milt,'#9A5470',1.5,true,g); ctx.restore(); }
function mouth(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.oker,a); const [x,y]=AP(0,0.82); ctx.beginPath(); ctx.ellipse(x,y,0.11*HH,0.045*HH,0,0,6.283); ctx.fillStyle='#7A2E30'; ctx.fill(); ctx.shadowBlur=0; ctx.beginPath(); ctx.ellipse(x,y+0.012*HH,0.06*HH,0.025*HH,0,0,6.283); ctx.fillStyle='#D9787A'; ctx.fill(); ctx.fillStyle='#F4EFE4'; ctx.fillRect(x-0.08*HH,y-0.045*HH,0.16*HH,0.022*HH); ctx.restore(); }

// ---------- ademhaling ----------
const AN_LONG_R=[[-0.24,1.48],[-0.42,1.6],[-0.6,1.9],[-0.69,2.24],[-0.7,2.5],[-0.55,2.5],[-0.34,2.42],[-0.14,2.36],[-0.1,2.15],[-0.11,1.8],[-0.16,1.56]];
const AN_LONG_L=[[0.24,1.48],[0.42,1.6],[0.6,1.9],[0.69,2.24],[0.7,2.52],[0.55,2.52],[0.38,2.46],[0.3,2.36],[0.2,2.22],[0.12,2.02],[0.12,1.76],[0.17,1.56]];
function anLungs(a,breath=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const k=1+0.06*Math.sin(breath);
  for(const [L,s] of [[AN_LONG_R,-1],[AN_LONG_L,1]]){ const [ox,oy]=AP(s*0.4,1.75); ctx.save(); ctx.translate(ox,oy); ctx.scale(k,1+0.07*Math.sin(breath)); ctx.translate(-ox,-oy);
    anShape(L,ANA.long,ANA.longS,2,true,g);
    ctx.save(); anPath(ctx,APs(L)); ctx.clip(); ctx.globalAlpha*=0.35; for(let i=0;i<40;i++){ const [x,y]=AP(s*(0.18+hash(i*3.1+s)*0.5),1.6+hash(i*5.7+s)*0.9); dot(ctx,x,y,1.6+hash(i)*2.2,ANA.longS); } ctx.restore();
    ctx.save(); ctx.globalAlpha*=0.7; s<0?anLine([[-0.68,2.05],[-0.4,2.15],[-0.2,2.3]],ANA.longS,1.5):anLine([[0.66,1.95],[0.4,2.15],[0.27,2.3]],ANA.longS,1.5); if(s<0) anLine([[-0.67,1.86],[-0.4,1.92]],ANA.longS,1.5); ctx.restore();
    // vertakkende luchtwegen
    ctx.save(); ctx.globalAlpha*=0.8; const b0=[s*0.06,1.85]; const tree=(p,ang,len,d)=>{ if(d>3) return; const q=[p[0]+Math.cos(ang)*len*s,p[1]+Math.sin(ang)*len]; anLine([p,q],ANA.lucht,(0.035-d*0.007)*HH); tree(q,ang-0.45,len*0.66,d+1); tree(q,ang+0.45,len*0.66,d+1); }; tree(b0,0.75,0.24,0); ctx.restore();
    ctx.restore(); }
  ctx.restore(); }
function anTrachea(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const [x0,y0]=AP(-0.035,1.02); ctx.fillStyle=ANA.lucht; roundRect(ctx,x0,y0,0.07*HH,0.84*HH,0.03*HH); ctx.fill(); ctx.strokeStyle='#BBA898'; ctx.lineWidth=1.2; for(let i=0;i<10;i++){ const [a1,b1]=AP(-0.035,1.08+i*0.08), [a2]=AP(0.035,0); ctx.beginPath(); ctx.moveTo(a1,b1); ctx.lineTo(a2,b1); ctx.stroke(); } ctx.restore(); }
function nose(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(C.teal,a); anLine([[0.04,0.68],[0.02,0.58],[-0.02,0.6],[-0.03,0.72],[-0.01,0.92],[0,1.05]],C.teal,0.04*HH); ctx.restore(); anTrachea(a); }

// ---------- bloed ----------
const AN_SLAG={ aorta:[[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.1,2.05],[0.06,2.4],[0.05,2.9],[0.04,3.38]],
  hals:s=>[[s*0.06,1.82],[s*0.09,1.4],[s*0.12,1.0],[s*0.2,0.78],[s*0.28,0.5],[s*0.24,0.28]],
  arm:s=>[[s*0.12,1.8],[s*0.42,1.58],[s*0.82,1.68],[s*0.92,2.2],[s*1.0,2.85],[s*1.08,3.42],[s*1.16,4.02],[s*1.26,4.48]],
  been:s=>[[s*0.04,3.38],[s*0.2,3.66],[s*0.34,3.96],[s*0.37,4.62],[s*0.34,5.22],[s*0.31,5.82],[s*0.3,6.52],[s*0.32,7.02],[s*0.4,7.22]],
  nier:s=>[[s*0.05,2.86],[s*0.26,2.86]] };
const AN_ADER={ hol:[[-0.09,2.06],[-0.09,1.74],[-0.12,1.4],[-0.16,0.98],[-0.24,0.7]], holO:[[-0.04,2.3],[-0.05,2.9],[-0.02,3.38]], hals2:[[0.12,1.74],[0.16,1.4],[0.18,0.98],[0.24,0.7]],
  arm:s=>[[s*0.1,1.74],[s*0.46,1.64],[s*0.86,1.76],[s*0.96,2.28],[s*1.05,2.88],[s*1.13,3.44],[s*1.21,4.02],[s*1.3,4.44]],
  been:s=>[[s*0.0,3.4],[s*0.15,3.72],[s*0.27,4.0],[s*0.3,4.62],[s*0.27,5.22],[s*0.25,5.82],[s*0.24,6.52],[s*0.26,7.02],[s*0.33,7.24]] };
function anVesselList(){ const A=[AN_SLAG.aorta], V=[AN_ADER.hol,AN_ADER.holO,AN_ADER.hals2]; for(const s of [-1,1]){ A.push(AN_SLAG.hals(s),AN_SLAG.arm(s),AN_SLAG.been(s),AN_SLAG.nier(s)); V.push(AN_ADER.arm(s),AN_ADER.been(s)); } return {A,V}; }
function anVessels(a,t=0,flow=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const {A,V}=anVesselList();
  V.forEach(p=>anLine(p,ANA.ader,0.042*HH)); A.forEach(p=>anLine(p,ANA.slag,0.036*HH));
  // haarvaatjes in handen en voeten
  ctx.save(); ctx.globalAlpha*=0.7; for(const s of [-1,1]){ for(let k=0;k<4;k++){ anLine([[s*1.24,4.42],[s*(1.18+k*0.045),4.58]],ANA.slag,1.2); anLine([[s*0.38,7.2],[s*(0.26+k*0.06),7.28]],ANA.slag,1.2); } } ctx.restore();
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; A.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<4;i++){ const u=((t*0.35+i/4+j*0.13)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#FFB3A8'); } });
    V.forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<3;i++){ const u=1-((t*0.28+i/3+j*0.17)%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,'#B9C8F2'); } }); ctx.restore(); }
  ctx.restore(); }
function anHeart(a,beat=0,g=0){ if(a<=0.01) return; const HH=AHH(); const p=Math.pow(Math.max(0,Math.sin(beat)),3); const k=1+0.09*p; const [ox,oy]=AP(0.09,2.22);
  ctx.save(); ctx.globalAlpha*=a; ctx.translate(ox,oy); ctx.scale(k,k); ctx.translate(-ox,-oy);
  anLine([[0.04,2.02],[0.02,1.84],[0.1,1.76],[0.17,1.84],[0.12,1.98]],ANA.slag,0.07*HH); anLine([[-0.08,1.76],[-0.08,2.06]],ANA.ader,0.075*HH); anLine([[0.06,2.0],[0.14,1.88],[0.24,1.9]],'#3E5FA8',0.055*HH);
  anShape([[-0.13,1.99],[0.04,1.95],[0.2,2.02],[0.33,2.2],[0.33,2.36],[0.28,2.48],[0.12,2.46],[-0.04,2.38],[-0.15,2.22],[-0.16,2.08]],p>0.5?ANA.hartL:ANA.hart,'#7E1E26',2,true,g+0.4*p);
  ctx.save(); ctx.globalAlpha*=0.7; anLine([[0.06,1.98],[0.12,2.2],[0.22,2.42]],'#E8C27A',1.6); anLine([[-0.1,2.05],[-0.06,2.25],[0.06,2.4]],'#E8C27A',1.4); ctx.restore();
  ctx.restore(); }

// ---------- zenuwstelsel ----------
const AN_ZEN={ merg:[[0,0.62],[0,1.0],[0,2.0],[0,3.32]],
  arm:s=>[[s*0.02,1.3],[s*0.4,1.5],[s*0.86,1.62],[s*0.97,2.3],[s*1.06,2.95],[s*1.14,3.5],[s*1.21,4.05],[s*1.25,4.42]],
  been:s=>[[s*0.01,3.25],[s*0.2,3.7],[s*0.35,4.0],[s*0.38,4.7],[s*0.37,5.15],[s*0.32,6.0],[s*0.29,6.9],[s*0.33,7.2]],
  been2:s=>[[s*0.37,5.15],[s*0.45,5.5],[s*0.43,6.2],[s*0.39,6.95]] };
function anNerveList(){ const N=[AN_ZEN.merg]; for(const s of [-1,1]) N.push(AN_ZEN.arm(s),AN_ZEN.been(s),AN_ZEN.been2(s)); return N; }
function anBrain(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const B=anSym([[0,0.1],[0.17,0.1],[0.29,0.18],[0.33,0.32],[0.31,0.45],[0.22,0.5],[0.1,0.47],[0,0.44]]);
  anShape(B,ANA.brein,ANA.breinS,2,true,g); ctx.save(); anPath(ctx,APs(B)); ctx.clip(); ctx.globalAlpha*=0.8;
  for(let i=0;i<9;i++){ const s=i%2?1:-1, y=0.14+i*0.04; const pts=[]; for(let k=0;k<=8;k++){ const u=k/8; pts.push([s*(0.03+u*0.3),y+Math.sin(u*14+i)*0.025+u*0.05]); } anLine(pts,ANA.breinS,1.5); }
  anLine([[0,0.1],[0,0.46]],ANA.breinS,2.5); ctx.restore(); anLine([[0,0.46],[0,0.7]],ANA.breinS,0.06*HH); ctx.restore(); }
function anNerves(a,t=0,imp=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; const N=anNerveList();
  anLine(AN_ZEN.merg,ANA.zenuw,0.05*HH); N.slice(1).forEach(p=>anLine(p,ANA.zenuw,0.022*HH));
  ctx.save(); ctx.globalAlpha*=0.6; for(let i=0;i<6;i++){ const y=1.72+i*0.2; for(const s of [-1,1]) anLine([[s*0.01,y],[s*0.3,y+0.02],[s*0.6,y+0.12]],ANA.zenuw,1.2); }
    for(const s of [-1,1]){ for(let k=0;k<4;k++) anLine([[s*1.25,4.42],[s*(1.17+k*0.04),4.6]],ANA.zenuw,1.1); for(let k=0;k<4;k++) anLine([[s*0.33,7.2],[s*(0.24+k*0.07),7.28]],ANA.zenuw,1.1); anLine([[s*0.04,0.48],[s*0.15,0.5]],ANA.zenuw,1.5); } ctx.restore();
  anBrain(1); if(imp>0.01) anImpulses(t,imp); ctx.restore(); }
function anImpulses(t,a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anNerveList().forEach((p,j)=>{ const P=anDense(p,40); for(let i=0;i<2;i++){ const u=((t*0.55+i/2+j*0.21)%1); const [x,y]=anAlong(P,j===0?u:(j%2?u:1-u)); ctx.save(); ctx.shadowColor='#E6D8FF'; ctx.shadowBlur=12; dot(ctx,x,y,0.026*HH,'#F2EAFF'); ctx.restore(); } }); ctx.restore(); }
function eyes(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.15,0.5); ctx.save(); anGlow(C.teal,1); ctx.strokeStyle=C.teal; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y,0.1*HH,0.065*HH,0,0,6.283); ctx.stroke(); ctx.restore(); } anLine([[-0.15,0.5],[-0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); anLine([[0.15,0.5],[0.06,0.5],[0,0.52]],C.teal,1.5,false,[4,4]); ctx.restore(); }

// ---------- uitscheiding ----------
function anKidney(s,a=1,g=0){ const cx=s*0.37, cy=s<0?2.9:2.84;
  // nier: bolle kant naar buiten, inham (hilus) naar het midden
  const P=[[0,-0.15],[0.09,-0.12],[0.12,0.0],[0.09,0.12],[0,0.15],[-0.06,0.1],[-0.035,0.0],[-0.06,-0.1]].map(p=>[cx+p[0]*s,cy+p[1]]);
  anShape(P,ANA.nier,ANA.nierL,1.8,true,g); ctx.save(); ctx.globalAlpha*=0.5; anShape([[cx+0.04*s,cy-0.09],[cx+0.07*s,cy],[cx+0.04*s,cy+0.09],[cx-0.0*s,cy]],ANA.nierL,null); ctx.restore(); }
function anUrinary(a,t=0,flow=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anKidney(s,1,g); anLine(AN_URL(s),'#E0C070',0.022*HH); }
  anShape([[0,3.72],[0.14,3.76],[0.17,3.88],[0.08,3.97],[0,3.98],[-0.08,3.97],[-0.17,3.88],[-0.14,3.76]],ANA.blaas,'#C9A84E',1.8,true,g);
  if(flow>0.01){ ctx.save(); ctx.globalAlpha*=flow; for(const s of [-1,1]){ const P=anDense(AN_URL(s),30); for(let i=0;i<3;i++){ const u=((t*0.45+i/3+(s>0?0.15:0))%1); const [x,y]=anAlong(P,u); dot(ctx,x,y,0.022*HH,ANA.urine); } } ctx.restore(); }
  ctx.restore(); }
function AN_URL(s){ return [[s*0.31,2.88],[s*0.24,3.2],[s*0.2,3.55],[s*0.12,3.78]]; }
function anAdrenal(a){ if(a<=0.01) return; ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const cx=s*0.37, cy=(s<0?2.9:2.84)-0.17; anShape([[cx-0.07,cy+0.03],[cx,cy-0.05],[cx+0.07,cy+0.03]],ANA.klier,'#B88A2A',1.2); } ctx.restore(); }

// ---------- afweer ----------
const AN_LYMF=[[-0.15,1.12],[0.15,1.12],[-0.2,1.22],[0.2,1.22],[-0.72,1.86],[-0.66,1.92],[-0.74,1.95],[0.72,1.86],[0.66,1.92],[0.74,1.95],[-0.3,3.86],[-0.36,3.92],[0.3,3.86],[0.36,3.92],[0.12,3.4],[-0.1,3.46],[0.02,3.3]];
function anLymph(a,t=0,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  ctx.save(); ctx.globalAlpha*=0.55; anLine([[0.02,3.25],[0.03,2.4],[0.04,1.6],[0.12,1.32]],ANA.lymf,1.5); for(const s of [-1,1]){ anLine([[s*0.2,1.22],[s*0.46,1.6],[s*0.7,1.9],[s*0.95,2.5],[s*1.1,3.4],[s*1.22,4.2]],ANA.lymf,1.2); anLine([[s*0.33,3.9],[s*0.33,4.6],[s*0.3,5.6],[s*0.27,6.8]],ANA.lymf,1.2); } ctx.restore();
  spleen(1,g); anShape([[-0.08,1.52],[0.08,1.52],[0.07,1.72],[0,1.78],[-0.07,1.72]],'#9CD0A6',null); // thymus
  AN_LYMF.forEach(([x,y],i)=>{ const [px2,py2]=AP(x,y); ctx.save(); anGlow(ANA.lymf,g); ctx.beginPath(); ctx.ellipse(px2,py2,0.035*HH,0.026*HH,hash(i)*3,0,6.283); ctx.fillStyle=ANA.lymf; ctx.fill(); ctx.strokeStyle='#3E8A50'; ctx.lineWidth=1; ctx.stroke(); ctx.restore(); });
  ctx.restore(); }

// ---------- hormoonklieren ----------
function anGlands(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; anGlow(ANA.klier,g);
  const [hx,hy]=AP(0,0.55); dot(ctx,hx,hy,0.035*HH,ANA.klier,'#B88A2A',1.2);
  anShape([[0,1.2],[0.06,1.12],[0.11,1.15],[0.11,1.3],[0.06,1.33],[0,1.26],[-0.06,1.33],[-0.11,1.3],[-0.11,1.15],[-0.06,1.12]],ANA.klier,'#B88A2A',1.2,true,g);
  ctx.shadowBlur=0; anAdrenal(1); ctx.restore(); }

// ---------- voortplanting ----------
function anRepro(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a;
  for(const s of [-1,1]){ anLine([[s*0.07,3.62],[s*0.17,3.55],[s*0.24,3.58]],ANA.baar,0.02*HH); const [ox,oy]=AP(s*0.27,3.62); ctx.save(); anGlow(ANA.baar,g); ctx.beginPath(); ctx.ellipse(ox,oy,0.045*HH,0.03*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.restore(); }
  anShape([[0,3.56],[0.08,3.58],[0.07,3.7],[0.03,3.78],[0,3.8],[-0.03,3.78],[-0.07,3.7],[-0.08,3.58]],ANA.baar,'#B86468',1.5,true,g);
  ctx.restore(); }
function testes(a,g=0){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; for(const s of [-1,1]){ const [x,y]=AP(s*0.06,4.1); ctx.save(); anGlow(ANA.baar,g||a); ctx.beginPath(); ctx.ellipse(x,y,0.04*HH,0.055*HH,0,0,6.283); ctx.fillStyle='#E9B3A6'; ctx.fill(); ctx.strokeStyle='#B86468'; ctx.lineWidth=1.2; ctx.stroke(); ctx.restore(); } ctx.restore(); }

// ---------- huid ----------
function skin(a){ if(a<=0.01) return; const HH=AHH(); ctx.save(); ctx.globalAlpha*=a; ctx.shadowColor='#F0C9A0'; ctx.shadowBlur=18; ctx.strokeStyle='#F0C9A0'; ctx.lineWidth=0.045*HH; ctx.lineJoin='round';
  anPath(ctx,APs(anSym(AN_BODY))); ctx.stroke(); anPath(ctx,APs(anSym(AN_HEAD))); ctx.stroke(); ctx.restore(); }
function skull(a){ anSkull(a,a); }

// ---------- alles samen (zelfde sleutels als het oude bodyOrgans) ----------
function bodyOrgans(o={}){ const A=k=>o[k]===undefined?0:o[k]; const t=o.t||0; const sil=o.sil===undefined?0.3:o.sil;
  const figA=Math.min(1,0.25+sil*1.0);
  anFigure(figA,t); anCavity(0.35*Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('hormoon'),A('afweer'),A('voortpl'),A('zenuw'),0.4)*Math.min(1,sil*3));
  const rest=Math.max(A('spijs'),A('adem'),A('bloed'),A('uitsch'),A('zenuw'),A('afweer'),A('hormoon'),A('voortpl'));
  anSkeleton(A('skelet'),{schedel:A('skelet')>0.5});
  anMuscles(A('spier')*(1-0.55*rest));
  anVessels(A('bloed')*0.9,t,A('bloed')>0.5?A('bloed'):0);
  anNerves(A('zenuw'),t,o.impuls||0);
  anUrinary(A('uitsch'),t,o.urine||0);
  anRepro(A('voortpl'));
  pancreas(A('spijs')*0.9); anDigest(A('spijs'),t);
  anTrachea(A('adem')); anLungs(A('adem'),o.breath||0);
  anHeart(A('bloed'),o.beat||0);
  anLymph(A('afweer'),t);
  anGlands(A('hormoon'));
}
// mens = vaste personage uit het castboek in plaats van het oude poppetje (Kamiel 20 okt 2026)
function human(ctx,x,y,h,a=1,color,o={}){ persoon(ctx,o.wie||'lotte',x,y,h,Object.assign({a},o)); }
// hersenen in zijaanzicht, voorkant links
function brein(ctx, x, y, s, a = 1, o = {}) { if (a <= 0.01) return; const { amy = 0, pfc = 0, rem = 0, gloed = 0, t = 0 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-300, 40); ctx.bezierCurveTo(-330, -120, -170, -230, 10, -220); ctx.bezierCurveTo(200, -215, 320, -110, 300, 20); ctx.bezierCurveTo(290, 100, 220, 130, 150, 120); ctx.bezierCurveTo(100, 170, 20, 160, -40, 120); ctx.bezierCurveTo(-140, 140, -260, 120, -300, 40); ctx.closePath(); shape(ctx, '#3A3550', '#8C7BBF', 2.5);
  ctx.strokeStyle = rgba('#8C7BBF', 0.5); ctx.lineWidth = 2; [[-200, -120, -120, -40], [-60, -190, -20, -80], [80, -190, 60, -60], [180, -130, 200, -30], [-230, 20, -120, 40], [20, 40, 140, 30]].forEach(([a1, b1, a2, b2]) => { ctx.beginPath(); ctx.moveTo(a1, b1); ctx.quadraticCurveTo((a1 + a2) / 2 + 30, (b1 + b2) / 2, a2, b2); ctx.stroke(); });
  // cerebellum + hersenstam
  ctx.beginPath(); ctx.ellipse(210, 120, 80, 45, 0.2, 0, 6.283); shape(ctx, '#34304A', rgba('#8C7BBF', 0.7), 2); roundRect(ctx, 90, 110, 50, 130, 20); shape(ctx, '#34304A', rgba('#8C7BBF', 0.7), 2);
  if (pfc > 0.01) { ctx.save(); ctx.globalAlpha *= pfc; ctx.beginPath(); ctx.ellipse(-230, 40, 70, 50, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.55), C.teal, 2.5); ctx.restore(); }
  if (amy > 0.01) { ctx.save(); ctx.globalAlpha *= amy; const pulse = gloed ? 1 + 0.25 * Math.sin(t * 6) * gloed : 1; if (gloed) { circ(ctx, -40, 70, 40 * pulse, rgba(C.koraal, 0.18 * gloed)); circ(ctx, -40, 70, 62 * pulse, rgba(C.koraal, 0.08 * gloed)); } ctx.beginPath(); ctx.ellipse(-40, 70, 26, 18, 0, 0, 6.283); shape(ctx, C.koraal, lighten(C.koraal, 0.4), 2); ctx.restore(); }
  if (rem > 0.01) { ctx.save(); ctx.globalAlpha *= rem; ctx.strokeStyle = C.teal; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-175, 60); ctx.quadraticCurveTo(-120, 100, -78, 72); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-74, 52); ctx.lineTo(-82, 92); ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
// Wat word jij? · Psychologie 2 / Neurowetenschappen · Kijken in een denkend brein — eigen tekeningen (v1.0, 20 okt 2026).
// Rode draad: het methodenbord (WAAR · WANNEER · OORZAAK?). Elke rij komt erbij, het bord wordt nooit vervangen.

// ---------- methodenbord ----------
// rows: [{n, waar (0..1), wanneer (0..1), oorzaak: 'ja'|'nee'|'?', a (0..1), hi (0..1)}]
const BORD_RIJEN = {
  laesie:  { n: 'laesie',        waar: 0.5,  wanneer: 0.05, oorzaak: 'ja?' },
  cel:     { n: 'elektrode bij één cel', waar: 0.95, wanneer: 0.97, oorzaak: 'nee' },
  eeg:     { n: 'EEG',           waar: 0.22, wanneer: 0.95, oorzaak: 'nee' },
  fmri:    { n: 'fMRI',          waar: 0.8,  wanneer: 0.2,  oorzaak: 'nee' },
  tms:     { n: 'TMS',           waar: 0.55, wanneer: 0.85, oorzaak: 'ja' },
  opto:    { n: 'optogenetica',  waar: 0.95, wanneer: 0.97, oorzaak: 'ja' }
};
function methodenBord(ctx, x, y, s, rij, a = 1, o = {}) { if (a <= 0.01) return; const { hi = null, groei = {} } = o; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, 0, 0, 840, 120 + rij.length * 92, 16); shape(ctx, rgba(C.fill, 0.75), C.line, 1.5);
  metaText(ctx, 'METHODE', 28, 52, C.grain, 'left', 28); metaText(ctx, 'WAAR', 330, 52, C.grain, 'left', 28); metaText(ctx, 'WANNEER', 500, 52, C.grain, 'left', 28); metaText(ctx, 'OORZAAK?', 672, 52, C.grain, 'left', 28);
  ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(20, 74); ctx.lineTo(820, 74); ctx.stroke();
  rij.forEach((k, i) => { const R = BORD_RIJEN[k]; if (!R) return; const g = groei[k] == null ? 1 : groei[k]; if (g <= 0.01) return; const yy = 120 + i * 92; ctx.save(); ctx.globalAlpha *= Math.min(1, g * 1.5);
    const on = hi === k; if (on) { roundRect(ctx, 10, yy - 46, 820, 80, 10); shape(ctx, rgba(C.goud, 0.12), C.goud, 2); }
    text(ctx, R.n, 28, yy + 6, fTekst(R.n.length > 14 ? 26 : 32, 700), on ? C.goud : C.text, 'left');
    const bar = (bx, v, col) => { roundRect(ctx, bx, yy - 14, 130, 22, 8); shape(ctx, '#2A3A58', rgba(C.line, 0.6), 1); const w = 130 * v * clamp(g * 1.4 - 0.3, 0, 1); if (w > 16) { roundRect(ctx, bx, yy - 14, w, 22, 8); shape(ctx, rgba(col, 0.8), col, 1.5); } };
    bar(330, R.waar, C.teal); bar(500, R.wanneer, C.oker);
    const oz = R.oorzaak, oa = clamp(g * 2 - 1, 0, 1); if (oa > 0.01) { ctx.save(); ctx.globalAlpha *= oa;
      if (oz === 'nee') { kruis(ctx, 740, yy - 4, 30, 1, C.koraal); }
      else if (oz === 'ja') { vink_(ctx, 740, yy - 4, 34, 1, C.groen); }
      else { vink_(ctx, 730, yy - 4, 28, 1, rgba(C.groen, 0.7)); text(ctx, '?', 762, yy + 8, fTekst(30, 800), C.groen, 'left'); }
      ctx.restore(); }
    ctx.restore(); });
  ctx.restore(); }

// ---------- hersenen van boven / zij ----------
// gebruikt brein() uit de therapiefilm (zijaanzicht, voorkant links) voor de basisvorm
function vlek(ctx, x, y, r, col, a = 1, t = 0, puls = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const p = 1 + puls * 0.08 * Math.sin(t * 5); ctx.beginPath(); ctx.ellipse(x, y, r * p, r * 0.75 * p, 0.2, 0, 6.283); shape(ctx, rgba(col, 0.75), lighten(col, 0.35), 2); ctx.restore(); }
// schets van de schedel met de baan van de staaf (Gage), voorkant links
function schedelStaaf(ctx, x, y, s, a = 1, u = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, 60); ctx.bezierCurveTo(-200, -120, -60, -230, 60, -215); ctx.bezierCurveTo(190, -200, 230, -60, 200, 40); ctx.bezierCurveTo(190, 100, 140, 120, 120, 150); ctx.lineTo(60, 160); ctx.lineTo(40, 210); ctx.lineTo(-60, 210); ctx.bezierCurveTo(-110, 200, -150, 160, -170, 60); ctx.closePath(); shape(ctx, '#E8E2D2', '#B8B0A0', 2.5);
  // oogkas
  ctx.beginPath(); ctx.ellipse(-110, 10, 34, 26, 0, 0, 6.283); shape(ctx, '#3A3550', null);
  // staaf: van onder de wang schuin omhoog door de voorkant van de schedel
  const x0 = -150, y0 = 300, x1 = 60, y1 = -300; const xe = lerp(x0, x1, u), ye = lerp(y0, y1, u);
  ctx.strokeStyle = '#6E6A66'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe, ye); ctx.stroke();
  ctx.strokeStyle = '#9A958E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 - 4, y0); ctx.lineTo(xe - 4, ye); ctx.stroke();
  ctx.restore(); }

// ---------- lab en apparaten ----------
// EEG-kap: elektroden als stipjes op een halve boog boven een hoofd op (x, y = kruin)
function eegKap(ctx, x, y, r, a = 1, t = 0, act = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  ctx.beginPath(); ctx.arc(x, y + r * 0.85, r, Math.PI * 1.08, Math.PI * 1.92); ctx.strokeStyle = rgba(C.line, 0.9); ctx.lineWidth = 3; ctx.stroke();
  for (let i = 0; i < 9; i++) { const an = Math.PI * (1.12 + i * 0.095); const px = x + Math.cos(an) * r, py = y + r * 0.85 + Math.sin(an) * r; const on = act > 0 && (Math.sin(t * 3 + i) > 0.3); circ(ctx, px, py, 9, on ? C.teal : '#AFC0D0', '#121A26', 1.5); }
  ctx.restore(); }
// golflijn (EEG-spoor): freq in Hz, amp in px, piek = extra uitslag rond tPiek (s)
function golf(ctx, x, y, w, amp, a = 1, o = {}) { if (a <= 0.01) return; const { freq = 10, t = 0, col = C.teal, piek = 0, tPiek = 0.6, seed = 1, schaal = 1 } = o; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i <= w; i += 3) { const tt = i / w * schaal; let v = Math.sin((tt + t * 0.25) * freq * 6.283) * 0.6 + Math.sin((tt * 3.7 + seed) * freq * 2.1) * 0.25 + (hash(Math.floor(i / 3) + seed * 97) - 0.5) * 0.35; if (piek) v -= piek * Math.exp(-Math.pow((tt - tPiek) / 0.05, 2)) * 2.2; const py = y + v * amp; if (i === 0) ctx.moveTo(x + i, py); else ctx.lineTo(x + i, py); }
  ctx.stroke(); ctx.restore(); }
// één neuron met elektrode; spikes = pulsjes langs het axon
function neuronElektrode(ctx, x, y, s, a = 1, t = 0, vuurt = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = rgba(C.teal, 0.8); ctx.lineWidth = 4; ctx.lineCap = 'round';
  [[-1.1, 120], [-2.3, 110], [-2.9, 90], [2.6, 100], [-0.5, 90]].forEach(([an, l]) => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(an) * l * 0.5 + 10, Math.sin(an) * l * 0.5 - 10, Math.cos(an) * l, Math.sin(an) * l); ctx.stroke(); });
  ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(120, 30, 220, -20, 380, 20); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, 0, 44, 36, 0.3, 0, 6.283); shape(ctx, rgba(C.teal, 0.3), C.teal, 2.5);
  if (vuurt > 0.01) { for (let k = 0; k < 3; k++) { const u = ((t * 1.3 + k * 0.33) % 1); const px = lerp(40, 380, u), py = Math.sin(u * 3.2) * 12; circ(ctx, px, py, 9, rgba(C.goud, vuurt), lighten(C.goud, 0.4), 1.5); } }
  // elektrode: dunne naald van rechtsboven naar de cel
  ctx.strokeStyle = '#D4D8DE'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(260, -260); ctx.lineTo(48, -30); ctx.stroke(); roundRect(ctx, 250, -300, 40, 60, 6); shape(ctx, '#8A8E96', null);
  ctx.restore(); }
// spike-spoor: verticale streepjes op tijden (s) binnen venster w
function spikeSpoor(ctx, x, y, w, tijden, a = 1, nu = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = rgba(C.line, 0.7); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; tijden.forEach(tt => { if (tt > nu) return; const px = x + tt * w; ctx.beginPath(); ctx.moveTo(px, y + 10); ctx.lineTo(px, y - 46); ctx.stroke(); }); ctx.restore(); }
// lichtstreepje op een scherm, onder hoek an (rad)
function streepScherm(ctx, x, y, s, an, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 70 * s, 180 * s, 140 * s, 8); shape(ctx, '#121A26', C.line, 2); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#F2F2EE'; roundRect(ctx, -50 * s, -6 * s, 100 * s, 12 * s, 4); ctx.fill(); ctx.restore(); }
// MRI-scanner van opzij: ring + bed; inhoud = callback die tekent wat er op het bed ligt
function scanner(ctx, x, y, s, a = 1, bedIn = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -560, 120, 1100, 40, 12); shape(ctx, '#3A4A66', rgba(C.line, 0.7), 1.5); // bed
  roundRect(ctx, -160, -230, 380, 420, 60); shape(ctx, '#C9D2DE', '#8FA0B5', 2.5); // ring
  ctx.beginPath(); ctx.ellipse(30, 0, 120, 150, 0, 0, 6.283); shape(ctx, '#1A2740', '#8FA0B5', 2);
  metaText(ctx, 'MRI-SCANNER', 30, -260, C.grain, 'center', 28);
  ctx.restore(); }
// bloedvat met rode bloedcellen; zuurstofrijk (koraal, vol) vs zuurstofarm (donkerder); stroom = extra toevoer
function bloedvat(ctx, x, y, w, a = 1, t = 0, extra = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y - 60, w, 120, 60); shape(ctx, rgba(C.koraal, 0.12), rgba(C.koraal, 0.7), 2);
  const n = 10 + Math.round(extra * 8); for (let i = 0; i < n; i++) { const u = ((t * (0.08 + extra * 0.12) + hash(i + 11)) % 1); const px = x + 40 + u * (w - 80), py = y + (hash(i + 40) - 0.5) * 70; const rijk = hash(i + 77) < 0.55 + extra * 0.35; ctx.beginPath(); ctx.ellipse(px, py, 22, 13, 0, 0, 6.283); shape(ctx, rijk ? C.koraal : '#7A3B4A', lighten(rijk ? C.koraal : '#7A3B4A', 0.3), 1.5); }
  ctx.restore(); }
// raster van blokjes (voxels) over een vlak
function voxelRaster(ctx, x, y, w, h, n, a = 1, kleur = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const dx = w / n, dy = h / Math.round(n * h / w); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 1;
  for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.moveTo(x + i * dx, y); ctx.lineTo(x + i * dx, y + h); ctx.stroke(); }
  for (let j = 0; j * dy <= h + 0.1; j++) { ctx.beginPath(); ctx.moveTo(x, y + j * dy); ctx.lineTo(x + w, y + j * dy); ctx.stroke(); }
  if (kleur) kleur.forEach(([i, j, col, aa]) => { ctx.save(); ctx.globalAlpha *= aa; ctx.fillStyle = col; ctx.fillRect(x + i * dx + 1, y + j * dy + 1, dx - 2, dy - 2); ctx.restore(); });
  ctx.restore(); }
// zalm in zijaanzicht (Macro-silhouet), kop rechts
function zalm(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-220, 0); ctx.lineTo(-290, -50); ctx.lineTo(-280, 0); ctx.lineTo(-290, 50); ctx.closePath(); shape(ctx, '#8C9AAE', '#B8C0D0', 1.5);
  ctx.beginPath(); ctx.moveTo(-230, 0); ctx.bezierCurveTo(-150, -80, 120, -95, 230, -10); ctx.bezierCurveTo(240, 0, 240, 10, 230, 18); ctx.bezierCurveTo(120, 80, -150, 70, -230, 0); ctx.closePath(); shape(ctx, '#9AA8BC', '#C8D0DC', 1.5);
  ctx.beginPath(); ctx.moveTo(-100, 10); ctx.bezierCurveTo(0, 40, 120, 30, 200, 12); ctx.lineTo(200, 22); ctx.bezierCurveTo(100, 60, -20, 60, -100, 10); ctx.closePath(); ctx.fillStyle = '#E3A08A'; ctx.fill(); // roze buik
  ctx.beginPath(); ctx.moveTo(-20, -62); ctx.lineTo(30, -110); ctx.lineTo(60, -66); ctx.closePath(); shape(ctx, '#8C9AAE', null);
  circ(ctx, 190, -8, 5, '#121A26'); ctx.restore(); }
// TMS-spoel: acht-vormige spoel aan een handvat
function spoel(ctx, x, y, s, a = 1, puls = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -14, -200, 28, 150, 10); shape(ctx, '#5A6478', '#8FA0B5', 1.5);
  [-58, 58].forEach(dx => { ctx.beginPath(); ctx.arc(dx, 0, 56, 0, 6.283); shape(ctx, '#3A4458', '#AFC0D0', 3); ctx.beginPath(); ctx.arc(dx, 0, 30, 0, 6.283); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2; ctx.stroke(); });
  if (puls > 0.01) { for (let k = 1; k <= 3; k++) { ctx.save(); ctx.globalAlpha *= puls * (1 - k * 0.25) * (0.6 + 0.4 * Math.sin(t * 8 - k)); ctx.beginPath(); ctx.ellipse(0, 70 + k * 26, 90 - k * 18, 16, 0, 0, 6.283); ctx.strokeStyle = C.teal; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore(); } }
  ctx.restore(); }
// muis van opzij met lichtvezel op de kop
function muis(ctx, x, y, s, a = 1, licht = 0, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#B08A7A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-110, 10); ctx.bezierCurveTo(-180, 20, -200, -30, -240, -10); ctx.stroke(); // staart
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 60, 0, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  ctx.beginPath(); ctx.ellipse(110, -10, 56, 40, -0.2, 0, 6.283); shape(ctx, '#B8B0A8', '#D8D2CC', 1.5);
  circ(ctx, 92, -50, 22, '#C9A6A0', '#D8D2CC', 1.5); circ(ctx, 132, -16, 4, '#121A26'); circ(ctx, 166, -4, 5, '#C98A8A');
  // lichtvezel
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(110, -46); ctx.bezierCurveTo(120, -160, 40, -220, -40, -300); ctx.stroke(); roundRect(ctx, 100, -58, 22, 16, 4); shape(ctx, '#8A8E96', null);
  if (licht > 0.01) { ctx.save(); ctx.globalAlpha *= licht * (0.7 + 0.3 * Math.sin(t * 9)); circ(ctx, 111, -40, 16, rgba(C.teal, 0.6)); ctx.restore(); }
  ctx.restore(); }
// lichtgevoelig kanaaltje in een membraan: open = ionen erdoor
function lichtKanaal(ctx, x, y, s, open = 0, a = 1, t = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 700, 700, -Math.PI / 2 - 0.47, -Math.PI / 2 + 0.47); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 740, 700, -Math.PI / 2 - 0.47, -Math.PI / 2 + 0.47); ctx.stroke();
  const g = 18 + open * 26; roundRect(ctx, -g - 40, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5); roundRect(ctx, g, -40, 40, 120, 14); shape(ctx, '#7A8BA8', '#AFC0D0', 1.5);
  if (open > 0.05) { for (let k = 0; k < 4; k++) { const u = (t * 0.9 + k * 0.25) % 1; circ(ctx, Math.sin(k * 2) * 6, lerp(-110, 150, u), 9, rgba(C.goud, open), lighten(C.goud, 0.4), 1); } }
  ctx.restore(); }
function fiets(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = '#2E3A55'; ctx.lineWidth = 4 * s; circ(ctx, x - 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); circ(ctx, x + 40 * s, y, 26 * s, null, '#2E3A55', 4 * s); ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 5 * s, y - 34 * s); ctx.lineTo(x + 28 * s, y - 34 * s); ctx.stroke(); ctx.restore(); }
function auto(ctx, x, y, s, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 90 * s, y - 50 * s, 180 * s, 44 * s, 12 * s); shape(ctx, C.koraal, null); roundRect(ctx, x - 50 * s, y - 84 * s, 100 * s, 40 * s, 12 * s); shape(ctx, lighten(C.koraal, 0.2), null); circ(ctx, x - 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); circ(ctx, x + 50 * s, y - 4 * s, 18 * s, '#2A2F3E'); ctx.restore(); }
function gezichtIcoon(ctx, x, y, s, a = 1, id = 'noor') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 44 * s, y - 50 * s, 88 * s, 100 * s, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); ctx.beginPath(); ctx.rect(x - 40 * s, y - 46 * s, 80 * s, 92 * s); ctx.clip(); const L = (CAST[id] && CAST[id].lengte) || 1; persoon(ctx, id, x, y + s * (360 * L - 44), 360 * s, {}); ctx.restore(); }
function vraagKaartje(ctx, x, y, w, tekst, a = 1, stempelT = '', stCol = C.koraal, goed = false) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 90, 12); shape(ctx, '#F2EEE4', goed ? C.groen : '#B8B0A0', goed ? 3 : 2); ctx.font = fTekst(28, 700); ctx.fillStyle = '#1A2740'; wrap(ctx, tekst, x + 20, y + 38, w - 40, 32); ctx.restore(); if (stempelT) stempel(ctx, x + w - 90, y + 70, stempelT, stCol, a); }
function document_(ctx, x, y, s, col, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 20 * s, y - 26 * s, 40 * s, 52 * s, 4); shape(ctx, '#F2EEE4', col, 2); ctx.fillStyle = col; ctx.fillRect(x - 12 * s, y - 14 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y - 2 * s, 24 * s, 4 * s); ctx.fillRect(x - 12 * s, y + 10 * s, 16 * s, 4 * s); ctx.restore(); }
// Wat word jij? · Biomedische wetenschappen 3 · Van lab tot patiënt — eigen tekeningen (24 okt 2026)

function zacht(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }


// kweekplaat met 8 × 12 putjes; hits = putjes die oplichten (een stof die werkt)
function kweekPlaat(ctx, x, y, w, a = 1, lit = 0, t = 0) { zacht(ctx, a, () => {
  const h = w * 0.66; roundRect(ctx, x, y, w, h, 18); shape(ctx, '#2C3B57', '#AFC0D0', 2.5);
  const dx = (w - 60) / 12, dy = (h - 50) / 8, r = Math.min(dx, dy) * 0.36;
  for (let i = 0; i < 8; i++) for (let j = 0; j < 12; j++) { const px = x + 30 + dx * (j + 0.5), py = y + 25 + dy * (i + 0.5); const k = (i * 12 + j) * 37 % 97;
    const hit = lit > 0.01 && (k === 11 || k === 64 || k === 30);
    circ(ctx, px, py, r, hit ? rgba(C.goud, 0.35 + 0.6 * lit) : rgba('#E07A9A', 0.22 + 0.25 * ((k % 5) / 5)), '#6A7A94', 1.2); } }); }

// robotarm boven de plaat met een rij pipetpunten die op en neer gaat
function robotArm(ctx, x, y, s, a = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const sx = Math.sin(t * 0.8) * 120, dip = Math.max(0, Math.sin(t * 2.4)) * 30;
  ctx.fillStyle = '#4A5670'; ctx.fillRect(-340, -40, 680, 26); roundRect(ctx, sx - 70, -60, 140, 70, 10); shape(ctx, '#8A94A8', '#C8D0DC', 2);
  ctx.fillStyle = '#C8D0DC'; ctx.fillRect(sx - 14, 10, 28, 70 + dip);
  roundRect(ctx, sx - 90, 74 + dip, 180, 30, 6); shape(ctx, '#6A7488', '#C8D0DC', 1.5);
  for (let k = 0; k < 8; k++) { const px = sx - 77 + k * 22; ctx.beginPath(); ctx.moveTo(px - 6, 104 + dip); ctx.lineTo(px, 150 + dip); ctx.lineTo(px + 6, 104 + dip); ctx.closePath(); shape(ctx, '#E8E4D8', '#AFC0D0', 1); }
  ctx.restore(); }); }

// eiwit als opgevouwen kralenketting met een holte; u 0..1 = stof schuift de holte in
function eiwitSlot(ctx, x, y, s, a = 1, u = 0, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const N = 46, pts = [];
  for (let i = 0; i < N; i++) { const f = i / N, an = f * 6.283 + 0.35; let r = 150 + 18 * Math.sin(f * 37) + 10 * Math.sin(f * 11);
    pts.push([Math.cos(an) * r, Math.sin(an) * r]); }
  // holte rechts: kralen rond x = +150 inwaarts
  pts.forEach(p => { const an = Math.atan2(p[1], p[0]); const k = Math.exp(-an * an * 7); p[0] -= 85 * k * Math.cos(an); p[1] -= 85 * k * Math.sin(an); });
  ctx.strokeStyle = rgba(C.teal, 0.7); ctx.lineWidth = 6; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke();
  const kl = [C.teal, '#7FB8D8', C.paars, '#5A8FB0']; pts.forEach((p, i) => circ(ctx, p[0], p[1], 15, kl[i % 4], '#DCE6F0', 1.5));
  // stof: zeshoekje met staartje
  const sx = 330 - u * 245, sy = 0; ctx.save(); ctx.translate(sx, sy); hexagon(ctx, 0, 0, 30, C.goud, '#F4D98A', 2.5); hexagon(ctx, 46, -12, 22, C.goud, '#F4D98A', 2.5); ctx.restore();
  ctx.restore(); }); }

// trechter: veel stipjes boven, er komen er maar een paar onderuit
function trechter(ctx, x, y, a = 1, u = 0, t = 0) { zacht(ctx, a, () => {
  ctx.beginPath(); ctx.moveTo(x - 300, y); ctx.lineTo(x + 300, y); ctx.lineTo(x + 40, y + 260); ctx.lineTo(x + 40, y + 360); ctx.lineTo(x - 40, y + 360); ctx.lineTo(x - 40, y + 260); ctx.closePath(); shape(ctx, rgba(C.fill, 0.6), C.line, 3);
  for (let i = 0; i < 140; i++) { const px = x - 280 + ((i * 53) % 560), py = y - 24 - ((i * 29) % 120) + Math.sin(t * 2 + i) * 3; circ(ctx, px, py, 7, rgba(C.text2, 0.75)); }
  const k = ease(u); circ(ctx, x - 12, y + 330 + k * 140, 12, C.goud, '#F4D98A', 2); circ(ctx, x + 16, y + 300 + k * 160, 12, C.goud, '#F4D98A', 2); }); }

// petrischaal met een laagje cellen
function petri(ctx, x, y, r, a = 1) { zacht(ctx, a, () => { ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.42, 0, 0, 6.283); shape(ctx, rgba('#CFE4F0', 0.12), '#AFC0D0', 3);
  for (let i = 0; i < 22; i++) { const an = i * 2.4, rr = r * 0.75 * Math.sqrt((i + 1) / 22); circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.4, r * 0.09, rgba('#E8A0B4', 0.75), '#F4C8D4', 1.2); circ(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.4, r * 0.03, '#8C7BBF'); }
  ctx.beginPath(); ctx.ellipse(x, y + 10, r, r * 0.42, 0, 0.1, 3.04); ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.stroke(); }); }

// kijkje in de romp van een castpersonage (r = ankerpunten van persoon()), organen uit personages/lib_anatomie.js op hun echte plek
// w = {hart, lever, nieren} 0..1; namen direct naast het orgaan (links in beeld = rechts in het lichaam)
let BODY = { cx: 960, yb: 880, h: 700 };
function rompKijkje(ctx, r, a = 1, w = {}, t = 0, namen = true) { if (a <= 0.01 || !r || !r.hoofd) return;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0, 2.5), wr = 0.82 * HHn;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.clip();
  ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9);
  const H = w.hart || 0, L = w.lever || 0, N = w.nieren || 0;
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * L; liver(1, 0.7 * L); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * N; for (const sd of [-1, 1]) anKidney(sd, 1, 0.7 * N); ctx.restore();
  ctx.save(); ctx.globalAlpha *= 0.25 + 0.75 * H; anHeart(1, t * 7, 0.6 * H); ctx.restore();
  ctx.restore();
  ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke();
  ctx.restore();
  if (namen) { const xr = wx + wr + 24, xl = wx - wr - 24;
    naamBij(ctx, 'hart', '', xr, AP(0, 2.24)[1] + 12, a * H, 'left');
    naamBij(ctx, 'lever', '', xl, AP(0, 2.48)[1] + 12, a * L, 'right');
    naamBij(ctx, 'nieren', '', xr, AP(0, 2.88)[1] + 12, a * N, 'left'); } }

// rat van opzij (kijk = 1 naar rechts)
function rat(ctx, x, y, s, a = 1, kijk = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s * kijk, s);
  ctx.strokeStyle = '#C9A0A0'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-100, 20); ctx.bezierCurveTo(-190, 40, -230, -10, -270, 10 + 6 * Math.sin(t * 3)); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(-10, 0, 115, 62, 0, 0, 6.283); shape(ctx, '#E8E4DC', '#FFFFFF', 2);
  ctx.beginPath(); ctx.moveTo(70, -40); ctx.quadraticCurveTo(150, -40, 175, 10); ctx.quadraticCurveTo(130, 34, 70, 30); ctx.closePath(); shape(ctx, '#E8E4DC', '#FFFFFF', 2);
  circ(ctx, 92, -50, 20, '#E8C4C4', '#FFFFFF', 2); circ(ctx, 126, -12, 6, '#C8423A'); circ(ctx, 176, 8, 6, '#E0A0A0');
  ctx.strokeStyle = '#E0D8D0'; ctx.lineWidth = 9; [-60, 40].forEach(fx => { ctx.beginPath(); ctx.moveTo(fx, 50); ctx.lineTo(fx + 8, 70); ctx.stroke(); });
  ctx.restore(); }); }

// hond van opzij (tweede diersoort, geen knaagdier)
function hond(ctx, x, y, s, a = 1, t = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const bruin = '#B48654', licht = '#D8B07E';
  ctx.strokeStyle = bruin; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-120, -50); ctx.quadraticCurveTo(-170, -90 + 8 * Math.sin(t * 5), -160, -120); ctx.stroke();
  ctx.lineWidth = 20; [-95, -60, 70, 100].forEach(fx => { ctx.beginPath(); ctx.moveTo(fx, 0); ctx.lineTo(fx, 90); ctx.stroke(); });
  ctx.beginPath(); ctx.ellipse(0, -20, 140, 60, 0, 0, 6.283); shape(ctx, bruin, licht, 2);
  ctx.beginPath(); ctx.ellipse(150, -90, 52, 44, 0, 0, 6.283); shape(ctx, bruin, licht, 2); ctx.beginPath(); ctx.ellipse(196, -76, 30, 20, 0, 0, 6.283); shape(ctx, licht, licht, 1);
  ctx.beginPath(); ctx.ellipse(124, -100, 18, 40, 0.3, 0, 6.283); shape(ctx, '#7A5634', null); circ(ctx, 162, -102, 6, '#1A1418'); circ(ctx, 222, -80, 8, '#1A1418');
  ctx.restore(); }); }

// vergunningsdocument met stempel
function vergunning(ctx, x, y, a = 1, stamp = 0, titel = 'projectvergunning', st = 'CCD') { zacht(ctx, a, () => {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.04); roundRect(ctx, -150, -190, 300, 380, 10); shape(ctx, '#F2EEE4', '#B8B0A0', 2);
  text(ctx, titel, 0, -140, fTekst(28, 800), '#2A3446', 'center'); ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 7; i++) ctx.fillRect(-110, -100 + i * 32, i % 3 === 2 ? 140 : 220, 8);
  ctx.restore(); if (stamp > 0.01) { const k = 1 + (1 - ease(stamp)) * 0.6; ctx.save(); ctx.translate(x + 40, y + 120); ctx.scale(k, k); stempel(ctx, 0, 0, st, C.groen, ease(stamp)); ctx.restore(); } }); }

// weegschaal; tilt > 0 = rechts zwaarder
function weegschaal(ctx, x, y, s, a = 1, tilt = 0, links = '', rechts = '', cl = C.groen, cr = C.koraal) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(-8, -160, 16, 260); roundRect(ctx, -90, 96, 180, 24, 8); shape(ctx, '#6A7A94', null); circ(ctx, 0, -160, 14, C.goud);
  const an = tilt * 0.22; const lx = -200 * Math.cos(an), ly = -160 - 200 * Math.sin(an) * -1, rx = 200 * Math.cos(an), ry = -160 + 200 * Math.sin(an);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, -160 - 200 * Math.sin(an)); ctx.lineTo(rx, ry); ctx.stroke();
  [[lx, -160 - 200 * Math.sin(an), links, cl], [rx, ry, rechts, cr]].forEach(([px, py, lab, col]) => { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 70, py + 90); ctx.moveTo(px, py); ctx.lineTo(px + 70, py + 90); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(px, py + 92, 92, 18, 0, 0, 6.283); shape(ctx, rgba(col, 0.5), col, 2); if (lab) text(ctx, lab, px, py + 150, fTekst(34, 700), C.text, 'center'); });
  ctx.restore(); }); }

// kaartje met een V; aan = oplichten
function vKaart(ctx, x, y, w, titel, sub, col, a = 1, aan = 1) { zacht(ctx, a, () => { roundRect(ctx, x, y, w, 120, 16); shape(ctx, rgba(col, 0.08 + 0.2 * aan), rgba(col, 0.35 + 0.65 * aan), 2.5);
  circ(ctx, x + 60, y + 60, 34, rgba(col, 0.3 + 0.5 * aan)); text(ctx, 'V', x + 60, y + 74, fTitel(40), C.text, 'center'); text(ctx, titel, x + 112, y + (sub ? 56 : 72), fTekst(36, 800), C.text, 'left'); if (sub) text(ctx, sub, x + 112, y + 96, fTekst(24, 500), C.text2, 'left'); }); }

// spuitje (pijnstilling)
function spuit(ctx, x, y, s, a = 1, rot = -0.6) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  roundRect(ctx, -60, -14, 110, 28, 5); shape(ctx, rgba('#CFE4F0', 0.5), '#E8EEF4', 2); ctx.fillStyle = rgba(C.teal, 0.7); ctx.fillRect(-20, -10, 66, 20);
  ctx.fillStyle = '#AFC0D0'; ctx.fillRect(-100, -4, 40, 8); ctx.fillRect(-106, -18, 8, 36); ctx.strokeStyle = '#E8EEF4'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(96, 0); ctx.stroke(); ctx.restore(); }); }

// vis (pictogram)
function visje(ctx, x, y, s, a = 1, col = '#7FB8D8') { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.ellipse(0, 0, 60, 26, 0, 0, 6.283); shape(ctx, col, '#DCE6F0', 2); ctx.beginPath(); ctx.moveTo(-54, 0); ctx.lineTo(-92, -24); ctx.lineTo(-92, 24); ctx.closePath(); shape(ctx, col, '#DCE6F0', 2); circ(ctx, 34, -6, 5, '#1A1418'); ctx.restore(); }); }

// trap met drie treden: u = [0..1] per trede
function faseTrap(ctx, x, y, w, a = 1, u = [1, 1, 1], hl = -1) { zacht(ctx, a, () => {
  const tw = w / 3, kl = [C.teal, C.paars, C.goud];
  for (let i = 0; i < 3; i++) { const h = 110 + i * 110, k = ease(u[i]); if (k <= 0.01) continue; zacht(ctx, k, () => { roundRect(ctx, x + i * tw, y - h, tw - 12, h, 10); shape(ctx, rgba(kl[i], hl === i ? 0.55 : 0.28), kl[i], hl === i ? 4 : 2); text(ctx, 'fase ' + (i + 1), x + i * tw + tw / 2 - 6, y - h + 54, fTekst(40, 800), C.text, 'center'); }); } }); }

// groepje telpoppetjes (pictogram in een telling)
function popjes(ctx, x, y, n, per, gap, r, kleur, a = 1) { zacht(ctx, a, () => { for (let i = 0; i < n; i++) { const px = x + (i % per) * gap, py = y + Math.floor(i / per) * gap * 1.3; ctx.fillStyle = typeof kleur === 'function' ? kleur(i) : kleur; ctx.beginPath(); ctx.arc(px, py - r * 1.5, r * 0.62, 0, 6.283); ctx.fill(); roundRect(ctx, px - r * 0.8, py - r * 0.8, r * 1.6, r * 1.8, r * 0.6); ctx.fill(); } }); }

// potje met alleen een code; open 0..1 = etiket draait om en toont de inhoud
function potje(ctx, x, y, s, a = 1, open = 0, inhoud = 'nieuwe stof', col = C.goud) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -60, -120, 120, 150, 18); shape(ctx, '#E8EEF4', '#AFC0D0', 2); roundRect(ctx, -66, -150, 132, 40, 8); shape(ctx, '#5A6A84', '#8FA0B5', 2);
  roundRect(ctx, -50, -84, 100, 70, 6); shape(ctx, '#F2EEE4', '#B8B0A0', 1.5);
  if (open < 0.5) text(ctx, 'code 4172', 0, -40, fTekst(22, 800), '#2A3446', 'center'); else text(ctx, inhoud, 0, -40, fTekst(18, 800), col === C.goud ? '#8A6A1A' : '#2A3446', 'center');
  ctx.restore(); }); }

function pil(ctx, x, y, s, col = '#F2EEE4', a = 1, rot = 0.5) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); roundRect(ctx, -40, -18, 80, 36, 18); shape(ctx, col, '#B8B0A0', 2); ctx.strokeStyle = '#B8B0A0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(0, 18); ctx.stroke(); ctx.restore(); }); }

// slotje (code dicht/open)
function slot(ctx, x, y, s, a = 1, open = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#C8D0DC'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -30 - open * 26, 30, Math.PI, 0); ctx.lineTo(30, -30 - open * 26 + (open > 0.5 ? -4 : 0)); ctx.stroke(); roundRect(ctx, -46, -30, 92, 76, 10); shape(ctx, C.goud, '#F4D98A', 2); circ(ctx, 0, 0, 9, '#5A4A1A'); ctx.restore(); }); }

// blinddoek over de ogen van een persoon (x,y = midden hoofd, r = hoofdbreedte/2)
function blinddoek(ctx, x, y, r, a = 1) { zacht(ctx, a, () => { roundRect(ctx, x - r * 1.05, y - r * 0.2, r * 2.1, r * 0.42, r * 0.2); shape(ctx, '#2A3446', '#5A6A84', 2); }); }

// krans van twaalf sterren (Europa)
function sterren(ctx, x, y, r, a = 1, t = 0) { zacht(ctx, a, () => { circ(ctx, x, y, r * 1.35, '#1E3A8A', '#3A5AAA', 2); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; ster(ctx, x + Math.cos(an) * r, y + Math.sin(an) * r, r * 0.13, '#F4D24A'); } }); }
function ster(ctx, x, y, r, col) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const an = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }

// vergadertafel: twee castfiguranten (Erik, Joost) achter de tafel; ervoor een rij van 27 landbordjes; nl = het Nederlandse bordje (CBG) licht op
function tafel(ctx, x, y, a = 1, nl = 0, t = 0) { zacht(ctx, a, () => {
  persoon(ctx, 'erik', x - 170, y + 150, 260, { t, kijk: 1, uit: 'neutraal' }); persoon(ctx, 'joost', x + 170, y + 150, 260, { t, kijk: -1, uit: 'neutraal' });
  roundRect(ctx, x - 400, y + 40, 800, 40, 8); shape(ctx, '#6A5440', '#8A7058', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x - 400, y + 80, 800, 70);
  const L = ['BE','BG','CZ','DK','DE','EE','IE','EL','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'];
  L.forEach((c, i) => { const px = x - 378 + (i % 14) * 58, py = y + 90 + Math.floor(i / 14) * 30, isNL = c === 'NL'; roundRect(ctx, px - 24, py, 48, 24, 4); shape(ctx, isNL ? rgba(C.koraal, 0.35 + 0.65 * nl) : '#F2EEE4', isNL ? C.koraal : '#B8B0A0', 1.2); text(ctx, c, px, py + 18, fTekst(15, 800), '#2A3446', 'center'); }); }); }

// toestemmingsformulier met handtekening die verschijnt (u 0..1)
function formulier(ctx, x, y, a = 1, u = 0) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(0.05);
  roundRect(ctx, -90, -110, 180, 220, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'toestemming', 0, -76, fTekst(22, 800), '#2A3446', 'center');
  ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 4; i++) ctx.fillRect(-64, -50 + i * 24, i === 3 ? 80 : 128, 6);
  ctx.strokeStyle = '#2A3446'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); const N = 40 * clamp(u, 0, 1);
  for (let k = 0; k <= N; k++) { const f = k / 40, px = -60 + f * 120, py = 70 + Math.sin(f * 19) * 10 - f * 8; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.fillStyle = '#8FA0B5'; ctx.fillRect(-64, 86, 128, 2); ctx.restore(); }); }

// dossierdoos
function dossier(ctx, x, y, s, a = 1) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 4; i++) { roundRect(ctx, -110 + i * 8, -150 + i * 10, 220, 290, 8); shape(ctx, i === 3 ? '#F2EEE4' : '#D8D2C4', '#B8B0A0', 2); }
  text(ctx, 'dossier', 24, -60, fTekst(34, 800), '#2A3446', 'center'); ctx.fillStyle = '#B8B0A0'; for (let i = 0; i < 5; i++) ctx.fillRect(-60, -20 + i * 30, 160, 8); ctx.restore(); }); }

// vaccinflacon
function flacon(ctx, x, y, s, a = 1, col = C.teal) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); roundRect(ctx, -50, -80, 100, 160, 16); shape(ctx, rgba('#CFE4F0', 0.25), '#E8EEF4', 2.5); ctx.fillStyle = rgba(col, 0.5); ctx.fillRect(-46, -10, 92, 86);
  roundRect(ctx, -34, -116, 68, 36, 6); shape(ctx, '#8FA0B5', '#C8D0DC', 2); roundRect(ctx, -40, 0, 80, 46, 4); shape(ctx, '#F2EEE4', null); ctx.restore(); }); }

// bloedvat in lengtedoorsnede met een stolsel en weinig bloedplaatjes
function vatStolsel(ctx, x, y, w, a = 1, u = 1, t = 0) { zacht(ctx, a, () => { const h = 150;
  roundRect(ctx, x, y, w, h, 20); shape(ctx, '#5A1E22', '#C06A5A', 4);
  for (let i = 0; i < 18; i++) { const px = x + 40 + ((i * 97 + t * 60) % (w - 80)), py = y + 30 + (i * 41) % (h - 60); ctx.beginPath(); ctx.ellipse(px, py, 18, 10, 0.3, 0, 6.283); shape(ctx, '#C8423A', '#E07A70', 1.2); }
  const k = ease(u); if (k > 0.01) { ctx.beginPath(); ctx.ellipse(x + w * 0.62, y + h / 2, 90 * k, (h / 2 - 6) * k, 0, 0, 6.283); shape(ctx, '#7A1E1E', '#B23A3A', 2); ctx.strokeStyle = rgba('#F2EEE4', 0.5); ctx.lineWidth = 2; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x + w * 0.62 - 80 * k, y + 20 + i * 14); ctx.lineTo(x + w * 0.62 + 80 * k, y + 30 + i * 12); ctx.stroke(); } }
  for (let i = 0; i < 3; i++) circ(ctx, x + 120 + i * 260, y + 40 + (i % 2) * 70, 7, '#E8D07A', '#F4E4A0', 1); }); }

// gebouw (lab, apotheek, CBG) als pictogram
function gebouwtje(ctx, x, y, s, soort, a = 1) { zacht(ctx, a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -90, -80, 180, 130, 8); shape(ctx, '#2C3B57', '#8FA0B5', 2.5); ctx.beginPath(); ctx.moveTo(-104, -80); ctx.lineTo(0, -138); ctx.lineTo(104, -80); ctx.closePath(); shape(ctx, '#3A4A68', '#8FA0B5', 2.5);
  if (soort === 'apotheek') { ctx.fillStyle = C.groen; ctx.fillRect(-12, -60, 24, 70); ctx.fillRect(-35, -37, 70, 24); }
  else if (soort === 'lab') { ctx.beginPath(); ctx.moveTo(-14, -66); ctx.lineTo(-14, -34); ctx.lineTo(-40, 20); ctx.lineTo(40, 20); ctx.lineTo(14, -34); ctx.lineTo(14, -66); ctx.closePath(); shape(ctx, rgba(C.teal, 0.5), '#C8D0DC', 2); }
  else { for (let i = -2; i <= 2; i++) { ctx.fillStyle = '#8FA0B5'; ctx.fillRect(i * 34 - 6, -60, 12, 100); } }
  ctx.restore(); }); }

// kalender/tijdlijn-pijl met stappen
function stappenLijn(ctx, x, y, w, stappen, a = 1, nu = 99, kleur = C.goud) { zacht(ctx, a, () => { const n = stappen.length, d = w / (n - 1);
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
  stappen.forEach((s2, i) => { const on = i <= nu; circ(ctx, x + i * d, y, 16, on ? kleur : '#3A4A68', on ? '#F4D98A' : C.line, 2); text(ctx, s2, x + i * d, y + (i % 2 ? 62 : -34), fTekst(28, 700), on ? C.text : C.text2, 'center'); }); }); }
// Wat word jij? · Biomedische wetenschappen · Van lab tot patiënt — scènes per alinea (v1.0, 24 okt 2026). Look: Schema, met cast (Opa Henk als deelnemer, Dr. Kim als onderzoeker, Noor).
// Rode draad: Opa Henk doet mee aan fase 3 van een nieuw medicijn tegen hartfalen.

function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col, al, px) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
// fase: in bij woord w1 (null = vanaf het begin), uit bij woord w2 (null = blijft)
function fase(q, w1, n1, w2, n2) { return (w1 ? q.on(w1, n1, 0.6) : 1) * (w2 ? 1 - q.on(w2, n2, 0.6) : 1); }
function pers(ctx, id, x, h, o) { persoon(ctx, id, x, 880, h, o); }
function tafelBlad(ctx, x, w, a = 1) { zacht(ctx, a, () => { roundRect(ctx, x, 700, w, 26, 6); shape(ctx, '#6A5440', '#8A7058', 2); ctx.fillStyle = '#4A3A2E'; ctx.fillRect(x + 30, 726, 20, 154); ctx.fillRect(x + w - 50, 726, 20, 154); }); }

Object.assign(SCENES, {
  title(ctx, t) { eiwitSlot(ctx, 1380, 520, 1.1, 1, 0.55 + 0.45 * Math.sin(t * 0.7), t); },

  // ---------- Cold open ----------
  s01(ctx, t, q) { bg(ctx, 'schema');
    tafelBlad(ctx, 560, 640);
    pers(ctx, 'kim', 430, 470, { t, pose: q.on('vraagt', 1) > 0.5 ? 'wijs' : 'staan', kijk: 1, uit: 'blij' });
    const rH = persoon(ctx, 'henk', 1300, 880, 450, { t, kijk: -1, uit: q.on('Waarom', 1) > 0.5 ? 'verbaasd' : 'neutraal' });
    pers(ctx, 'noor', 1540, 410, { t, kijk: -1, uit: 'neutraal' });
    naamBij(ctx, 'Opa Henk', 'hartfalen', 1300, 400, 1, 'center');
    naamBij(ctx, 'Dr. Kim', 'arts en onderzoeker', 220, 300, q.on('Kim', 1));
    rompKijkje(ctx, rH, q.on('hartfalen', 1) * (1 - q.on('onderzoek', 1)), { hart: 1 }, t);
    zacht(ctx, q.on('onderzoek', 1), () => { ctx.save(); ctx.translate(880, 640); ctx.rotate(-0.05); roundRect(ctx, -120, -70, 240, 140, 8); shape(ctx, '#F2EEE4', '#B8B0A0', 2); text(ctx, 'onderzoek', 0, -24, fTekst(26, 800), '#2A3446', 'center'); text(ctx, 'nieuw medicijn', 0, 8, fTekst(22, 600), '#2A3446', 'center'); text(ctx, 'bij hartfalen', 0, 38, fTekst(22, 600), '#2A3446', 'center'); ctx.restore(); });
    // tijdlijn bovenin
    gebouwtje(ctx, 820, 250, 0.8, 'lab', q.on('lab', 1)); regel(ctx, 'lab', 820, 330, q.on('lab', 1), C.text2, 28, 'center', 700);
    zacht(ctx, q.on('geleden', 1), () => { ctx.setLineDash([14, 12]); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(920, 230); ctx.lineTo(1240, 230); ctx.stroke(); ctx.setLineDash([]); });
    tag(ctx, 'meer dan tien jaar', 1080, 200, C.goud, q.on('tien', 1), 'center', 30);
    gebouwtje(ctx, 1340, 250, 0.8, 'apotheek', q.on('apotheek', 1)); regel(ctx, 'apotheek', 1340, 330, q.on('apotheek', 1), C.text2, 28, 'center', 700);
    vraagteken(ctx, 1480, 280, q.on('lang', 1), 110); },

  // ---------- H1 ----------
  s04(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: elke stap moet het tonen', 1 - q.on('lab', 1, 2) * 0 - q.on('Robots', 1));
    const A = fase(q, null, 1, 'tienduizend', 1), B = fase(q, 'tienduizend', 1, 'schaaltje', 1), D = fase(q, 'schaaltje', 1, 'Nederland', 1), F = fase(q, 'Nederland', 1, 'V\'s', 1), G = fase(q, 'V\'s', 1, 'onderzoeker', 2), H = fase(q, 'onderzoeker', 2, null);
    // A: lab, robot, eiwit
    kweekPlaat(ctx, 160, 420, 640, A, q.on('Past', 1), t); robotArm(ctx, 480, 300, 0.9, A, t); naamBij(ctx, 'cellen in putjes', '', 170, 400, A * q.on('putjes', 1));
    eiwitSlot(ctx, 1370, 520, 0.95, A * q.on('eiwit', 1), clamp((t - q.at('eiwit', 1)) / 2.5, 0, 1), t); naamBij(ctx, 'eiwit bij de ziekte', '', 1370, 780, A * q.on('eiwit', 1), 'center'); naamBij(ctx, 'stof', '', 1660, 460, A * q.on('eiwit', 1) * (1 - clamp((t - q.at('eiwit', 1)) / 2.5, 0, 1)), 'center');
    // B: trechter
    trechter(ctx, 960, 300, B, clamp((t - q.at('haalt', 1)) / 2, 0, 1), t); tag(ctx, '10.000 stoffen', 520, 260, C.text2, B, 'center', 30); tag(ctx, '1 of 2 bij de apotheek', 1380, 760, C.goud, B * q.on('twee', 1), 'center', 30);
    // D: schaaltje tegenover lichaam, dan dieren
    const D2 = q.on('dieren', 1);
    petri(ctx, 420, 520, 190, D * (1 - D2)); naamBij(ctx, 'schaaltje cellen', '', 420, 680, D * (1 - D2), 'center');
    const rH = persoon(ctx, 'henk', 1300, 880, 520, { t, a: D * (1 - D2), kijk: -1 }); rompKijkje(ctx, rH, D * (1 - D2) * q.on('hart', 1, 0.4), { hart: 1, lever: q.on('lever', 1, 0.4), nieren: q.on('nieren', 1, 0.4) }, t);
    regel(ctx, 'hart, lever en nieren werken samen', 1300, 260, D * (1 - D2) * q.on('samenwerken', 1), C.text, 32, 'center', 700);
    rat(ctx, 560, 620, 1.3, D * D2, 1, t); naamBij(ctx, 'knaagdier', 'bv. rat', 560, 760, D * q.on('knaagdier', 1), 'center');
    hond(ctx, 1320, 640, 1.2, D * q.on('tweede', 1), t); naamBij(ctx, 'tweede diersoort', 'geen knaagdier, bv. hond', 1320, 790, D * q.on('tweede', 1), 'center');
    regel(ctx, 'de regels vragen dierproeven', 960, 300, D * D2, C.text, 34, 'center', 700);
    // F: vergunning en afweging
    vergunning(ctx, 420, 470, F, q.on('Centrale', 1, 1)); naamBij(ctx, 'Centrale Commissie Dierproeven', '', 420, 730, F * q.on('Centrale', 1), 'center');
    weegschaal(ctx, 1320, 560, 1, F * q.on('weegt', 1), Math.sin(t * 1.2) * 0.25 * (1 - q.on('ongerief', 1)) + 0.15 * q.on('ongerief', 1), 'doel', 'ongerief', C.groen, C.koraal);
    // G: drie V's
    vKaart(ctx, 360, 260, 620, 'vervangen', 'een proef zonder dieren', C.teal, G, 0.25 + 0.75 * q.on('vervangen', 1));
    vKaart(ctx, 360, 420, 620, 'verminderen', 'minder dieren', C.paars, G, 0.25 + 0.75 * q.on('verminderen', 1));
    vKaart(ctx, 360, 580, 620, 'verfijnen', 'minder lijden per dier', C.goud, G, 0.25 + 0.75 * q.on('verfijnen', 1));
    metaA(ctx, 'DE DRIE V\'S', 360, 230, G, C.grain, 'left', 26);
    // H: de vraag
    rat(ctx, 700, 560, 1.4, H, 1, t); spuit(ctx, 920, 430, 1.1, H * q.on('pijnstilling', 1));
    chip(ctx, 'pijnstilling na een ingreep', 700, 300, C.teal, H * q.on('pijnstilling', 1), 30); chip(ctx, 'stoppen als een dier te ziek wordt', 700, 760, C.koraal, H * q.on('ziek', 2), 30);
    regel(ctx, 'welke V?', 1450, 470, H * q.on('Welke', 1), C.goud, 60, 'center', 800); vraagteken(ctx, 1450, 660, H * q.on('denk', 1), 120); },

  s06(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: verfijnen', 1 - q.on('Toch', 1, 0.3));
    const K = 1 - q.on('Toch', 1, 0.3);
    vKaart(ctx, 120, 240, 600, 'verfijnen', 'minder lijden per dier', C.goud, K, t < q.at('Verminderen', 1) ? 1 : 0.35);
    vKaart(ctx, 120, 400, 600, 'verminderen', 'minder dieren', C.paars, K * q.on('Verminderen', 1), t >= q.at('Verminderen', 1) && t < q.at('vervangen', 1) ? 1 : 0.35);
    vKaart(ctx, 120, 560, 600, 'vervangen', 'een proef zonder dieren', C.teal, K * q.on('vervangen', 1), t >= q.at('vervangen', 1) ? 1 : 0.35);
    const r1 = 1 - q.on('Verminderen', 1), r2 = q.on('Verminderen', 1) * (1 - q.on('vervangen', 1)), r3 = q.on('vervangen', 1);
    rat(ctx, 1280, 520, 1.4, K * r1, -1, t); spuit(ctx, 1500, 400, 1.1, K * r1, -2.5);
    for (let i = 0; i < 10; i++) { const weg = i >= 6 ? q.on('minder', 3, 1) : 0; rat(ctx, 960 + (i % 5) * 180, 400 + Math.floor(i / 5) * 200, 0.5, K * r2 * (1 - weg), -1, t + i); }
    chip(ctx, 'zelfde antwoord, minder dieren', 1320, 820, C.paars, K * r2 * q.on('hetzelfde', 1), 28);
    petri(ctx, 1300, 520, 230, K * r3); naamBij(ctx, 'menselijke levercellen', 'gekweekt', 1300, 720, K * r3 * q.on('levercellen', 1), 'center');
    // telling 2024
    const T = clamp((t - q.at('Toch', 1) - 0.2) / 0.3, 0, 1);
    metaA(ctx, 'DIERPROEVEN IN NEDERLAND · 2024', 960, 230, T, C.grain, 'center', 28);
    regel(ctx, '± 435.000', 960, 380, T, C.text, 110, 'center', 800); regel(ctx, 'voor allerlei doelen', 960, 450, T * q.on('doelen', 1), C.text2, 34, 'center', 600);
    const V = q.on('Vier', 1); rat(ctx, 560, 650, 0.55, T * V, 1, t + 1); naamBij(ctx, 'muizen', '', 560, 760, T * V, 'center');
    rat(ctx, 960, 640, 0.75, T * V, 1, t); naamBij(ctx, 'ratten', '', 960, 760, T * V, 'center');
    visje(ctx, 1360, 640, 1.3, T * V); naamBij(ctx, 'vissen', '', 1360, 760, T * V, 'center');
    tag(ctx, 'samen 4 op de 5', 960, 860, C.goud, T * q.on('vijf', 1), 'center', 30); },

  // ---------- H2 ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const P = 1 - q.on('fase', 1, 0.8), S = q.on('fase', 1, 0.8);
    pers(ctx, 'kim', 360, 470, { t, a: P, kijk: 1, uit: 'blij', pose: 'wijs' }); pers(ctx, 'henk', 1180, 450, { t, a: P, kijk: -1, pose: 'vasthouden' }); pers(ctx, 'noor', 1440, 410, { t, a: P, kijk: -1 });
    vergunning(ctx, 770, 470, P * q.on('medisch-ethische', 1), q.on('goedkeuren', 1, 1), 'onderzoeksplan', 'goedgekeurd'); naamBij(ctx, 'medisch-ethische commissie', '', 770, 230, P * q.on('medisch-ethische', 1), 'center');
    chip(ctx, 'vooraf uitleg', 1340, 250, C.teal, P * q.on('uitleg', 1), 28); chip(ctx, 'zelf tekenen', 1340, 330, C.teal, P * q.on('tekent', 1), 28); formulier(ctx, 1000, 760, P * q.on('tekent', 1), clamp((t - q.at('tekent', 1)) / 1.2, 0, 1)); chip(ctx, 'altijd mogen stoppen', 1340, 410, C.goud, P * q.on('stoppen', 1), 28);
    // trap
    const f2 = q.at('twee', 1), f3 = q.at('drie', 1), hl = t < f2 ? 0 : t < f3 ? 1 : 2;
    faseTrap(ctx, 140, 840, 900, S, [1, q.on('twee', 1), q.on('drie', 1)], q.on('maanden', 1) > 0.5 ? -1 : hl);
    const E = q.on('maanden', 1, 0.3), I1 = S * (1 - q.on('twee', 1, 0.25)) * (1 - E), I2 = q.on('twee', 1, 0.25) * (1 - q.on('drie', 1, 0.25)) * (1 - E), I3 = q.on('drie', 1, 0.25) * (1 - E);
    // fase 1
    metaA(ctx, 'FASE 1 · 20 TOT 100 MENSEN', 1160, 240, I1, C.teal, 'left', 26);
    popjes(ctx, 1200, 340, 20, 10, 56, 16, C.teal, I1 * q.on('groep', 1)); chip(ctx, 'vaak gezond', 1460, 470, C.teal, I1 * q.on('gezonde', 1), 28);
    zacht(ctx, I1 * q.on('dosis', 1), () => { for (let i = 0; i < 5; i++) { const k = clamp((t - q.at('stap', 1)) * 1.2 - i, 0, 1); roundRect(ctx, 1200 + i * 110, 700 - (i + 1) * 30 * k, 80, (i + 1) * 30 * k + 4, 6); shape(ctx, rgba(C.teal, 0.5), C.teal, 2); } text(ctx, 'dosis', 1200, 740, fTekst(28, 700), C.text2, 'left'); });
    regel(ctx, 'veilig?', 1660, 560, I1 * q.on('veilig', 1), C.goud, 44, 'center', 800);
    // fase 2
    metaA(ctx, 'FASE 2 · EEN PAAR HONDERD PATIËNTEN', 1160, 240, I2, C.paars, 'left', 26);
    popjes(ctx, 1200, 330, 60, 15, 40, 12, C.paars, I2);
    regel(ctx, 'doet het iets?', 1160, 620, I2 * q.on('Doet', 1), C.goud, 40, 'left', 800); regel(ctx, 'welke dosis?', 1160, 690, I2 * q.on('dosis', 2), C.goud, 40, 'left', 800);
    // fase 3
    metaA(ctx, 'FASE 3 · HONDERDEN TOT DUIZENDEN', 1160, 240, I3, C.goud, 'left', 26);
    popjes(ctx, 1180, 310, 160, 20, 30, 9, C.goud, I3);
    tag(ctx, 'vaccin: soms tienduizenden', 1500, 820, C.goud, I3 * q.on('tienduizenden', 1), 'center', 28);
    regel(ctx, 'werkt het echt?', 1160, 650, I3 * q.on('Werkt', 1), C.goud, 40, 'left', 800); regel(ctx, 'welke bijwerkingen?', 1160, 712, I3 * q.on('bijwerkingen', 1), C.goud, 40, 'left', 800);
    // afvallen
    chip(ctx, 'per fase maanden tot jaren', 1440, 260, C.text2, E, 28);
    zacht(ctx, E * q.on('vallen', 1), () => { for (let i = 0; i < 9; i++) { const k = clamp((t - q.at('vallen', 1)) * 0.8 - i * 0.15, 0, 1); const x0 = 300 + (i % 3) * 300 + (i % 2) * 40, y0 = 840 - 110 * (1 + (i % 3)) - 30; circ(ctx, x0 + k * 60, Math.min(y0 + k * k * 300, 800), 12, rgba(C.koraal, 1 - k * 0.6), '#F0A890', 1.5); } });
    regel(ctx, '1 op 10', 1440, 470, E * q.on('toelating', 1), C.text, 90, 'center', 800); regel(ctx, 'van fase 1 tot toelating', 1440, 530, E * q.on('toelating', 1), C.text2, 30, 'center', 600);
    popjes(ctx, 1220, 640, 10, 10, 50, 14, i => i === 0 ? C.groen : '#5A6478', E * q.on('toelating', 1));
    tag(ctx, 'vaccins tegen infecties: 1 op 3', 1440, 800, C.teal, E * q.on('infecties', 1), 'center', 30); },

  // ---------- H3 ----------
  s08(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('weet', 1, 0.8), A = 1 - B;
    tag(ctx, 'film: Supplementen en superfoods', 960, 200, C.teal, A * (1 - q.on('computer', 1)), 'center', 30);
    // loting
    zacht(ctx, A * q.on('computer', 1), () => { roundRect(ctx, 830, 260, 260, 170, 12); shape(ctx, '#2C3B57', '#8FA0B5', 3); ctx.fillStyle = '#3A4A68'; ctx.fillRect(845, 275, 230, 140); ctx.fillStyle = '#6A7A94'; ctx.fillRect(930, 430, 60, 20); ctx.fillRect(890, 450, 140, 10); text(ctx, 'loting', 960, 360, fTekst(34, 800), C.goud, 'center'); });
    const L = clamp((t - q.at('loot', 1)) / 2.5, 0, 1);
    zacht(ctx, A * q.on('loot', 1), () => { for (let i = 0; i < 24; i++) { const links = (i * 7) % 2 === 0; const sx = 760 + (i % 8) * 50, sy = 520 + Math.floor(i / 8) * 60; const gi = Math.floor(i / 2), tx = (links ? 260 : 1340) + (gi % 4) * 80, ty = 300 + Math.floor(gi / 4) * 100; const k = ease(L);
      const x = sx + (tx - sx) * k, y = sy + (ty - sy) * k; const oud = i % 3 === 0; popjes(ctx, x, y, 1, 1, 0, 16, oud ? '#B8B0A0' : (links ? C.goud : C.teal), 1); } });
    chip(ctx, 'ongeveer evenveel ouderen', 960, 560, C.text2, A * q.on('ouderen', 1), 28); chip(ctx, 'ongeveer evenveel met een zwak hart', 960, 640, C.text2, A * q.on('hart', 1), 28);
    pil(ctx, 420, 760, 1.2, '#F2EEE4', A * q.on('nieuwe', 1)); naamBij(ctx, 'nieuwe stof', '', 420, 850, A * q.on('nieuwe', 1), 'center');
    pil(ctx, 1500, 760, 1.2, '#F2EEE4', A * q.on('placebo', 1)); naamBij(ctx, 'placebo', 'ziet er precies zo uit', 1500, 850, A * q.on('placebo', 1), 'center');
    tag(ctx, '+ hun gewone medicijnen', 960, 760, C.groen, A * q.on('gewone', 1), 'center', 28);
    // Henk en Kim
    pers(ctx, 'henk', 560, 450, { t, a: B, kijk: 1, pose: 'vasthouden' }); potje(ctx, 760, 640, 0.9, B, 0); naamBij(ctx, 'Opa Henk', '', 300, 420, B, 'left');
    bubbel(ctx, 660, 380, '?', '#F2F2EE', B * q.on('niet', 1), 44);
    pers(ctx, 'henk', 960, 450, { t, a: A * (1 - q.on('computer', 1)), kijk: 1 }); naamBij(ctx, 'Opa Henk', 'doet mee aan fase 3', 960, 380, A * (1 - q.on('computer', 1)), 'center');
    pers(ctx, 'kim', 1360, 470, { t, a: B, kijk: -1, outfit: 'lab', uit: 'neutraal', pose: 'denk' }); naamBij(ctx, 'Dr. Kim', 'onderzoeker', 1480, 380, B, 'left');
    vraagteken(ctx, 1600, 600, B * q.on('denk', 1), 110); },

  s10(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: ze kijkt anders', 1 - q.on('werd', 1)); const B = q.on('werd', 1, 0.5), A = 1 - B;
    pers(ctx, 'kim', 520, 470, { t, a: A, kijk: 1, outfit: 'lab', pose: 'denk' });
    chip(ctx, 'vragen', 900, 330, C.koraal, A * q.on('vraagt', 1), 30); chip(ctx, 'meten', 900, 420, C.koraal, A * q.on('meet', 1), 30); chip(ctx, 'noteren', 900, 510, C.koraal, A * q.on('noteert', 1), 30);
    regel(ctx, 'onbewust anders', 900, 610, A * q.on('onbewust', 1), C.koraal, 36, 'center', 700);
    pers(ctx, 'henk', 1360, 450, { t, a: A * q.on('Daarom', 1), kijk: -1 });
    potje(ctx, 1600, 640, 0.9, A * q.on('Daarom', 1), q.on('open', 1)); slot(ctx, 1600, 400, 1, A * q.on('dubbelblind', 1), q.on('open', 1));
    tag(ctx, 'dubbelblind: patiënt én onderzoeker weten het niet', 960, 830, C.goud, A * q.on('dubbelblind', 1), 'center', 30);
    // mRNA-vaccin
    flacon(ctx, 380, 520, 1.4, B); naamBij(ctx, 'eerste mRNA-vaccin', 'corona · 2020', 380, 720, B, 'center');
    metaA(ctx, '43.548 DEELNEMERS · HELFT VACCIN, HELFT PLACEBO', 760, 230, B * q.on('veertigduizend', 1), C.grain, 'left', 24);
    const u = clamp((t - q.at('vaccingroep', 1)) / 1.2, 0, 1), u2 = clamp((t - q.at('placebogroep', 1)) / 1.2, 0, 1);
    zacht(ctx, B * q.on('vaccingroep', 1), () => { const base = 760, sc = 2.9; roundRect(ctx, 900, base - 8 * sc * u - 4, 180, 8 * sc * u + 4, 8); shape(ctx, rgba(C.teal, 0.7), C.teal, 2); text(ctx, 'vaccin', 990, base + 44, fTekst(30, 700), C.text, 'center'); if (t > q.at('acht', 1)) text(ctx, '8 ziek', 990, base - 8 * sc - 22, fTekst(34, 800), C.text, 'center');
      roundRect(ctx, 1300, base - 162 * sc * u2 - 4, 180, 162 * sc * u2 + 4, 8); shape(ctx, rgba(C.koraal, 0.7), C.koraal, 2); text(ctx, 'placebo', 1390, base + 44, fTekst(30, 700), C.text, 'center'); if (t > q.at('honderdtweeënzestig', 1) - 0.3) text(ctx, '162 ziek', 1390, base - 162 * sc - 22, fTekst(34, 800), C.text, 'center');
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(860, base); ctx.lineTo(1560, base); ctx.stroke(); }); },

  // ---------- H4 ----------
  s11(ctx, t, q) { bg(ctx, 'schema'); const B = q.on('onderzoek', 1, 0.8), A = 1 - B;
    dossier(ctx, 260, 470, 0.9, A); pijl(ctx, 400, 470, 560, 470, C.line, A * q.on('Geneesmiddelenbureau', 1), 5, 18);
    sterren(ctx, 700, 470, 90, A * q.on('Geneesmiddelenbureau', 1), t); naamBij(ctx, 'EMA', 'Europees Geneesmiddelenbureau', 700, 650, A * q.on('Geneesmiddelenbureau', 1), 'center');
    tafel(ctx, 1360, 480, A * q.on('Experts', 1) * (1 - q.on('Wegen', 1, 0.25)), q.on('CBG', 1), t); naamBij(ctx, 'CBG', 'Nederland', 1360 + (-378 + 4 * 58), 730, A * q.on('CBG', 1) * (1 - q.on('Wegen', 1, 0.25)), 'center');
    regel(ctx, 'experts uit alle EU-landen', 1360, 210, A * q.on('Experts', 1) * (1 - q.on('Wegen', 1, 0.25)), C.text, 32, 'center', 700);
    weegschaal(ctx, 1340, 470, 0.9, A * q.on('Wegen', 1, 0.25) * (1 - q.on('Daarna', 1, 0.25)), -0.6 + 0.08 * Math.sin(t * 1.5), 'voordelen', 'risico\'s', C.groen, C.koraal);
    zacht(ctx, A * q.on('Daarna', 1, 0.25), () => { stempel(ctx, 1340, 400, 'toegelaten in de EU', C.groen, 1, -0.08); text(ctx, 'besluit: Europese Commissie', 1340, 520, fTekst(32, 700), C.text, 'center'); });
    klokje(ctx, 1340, 680, 60, 1, A * q.on('jaar', 1)); regel(ctx, 'beoordelen: ruim een jaar', 1340, 800, A * q.on('jaar', 1), C.text2, 32, 'center', 700);
    // bewaking
    metaA(ctx, 'FASE 3 · 3.000 MENSEN · ELK POPPETJE = 10', 160, 220, B, C.goud, 'left', 24);
    popjes(ctx, 180, 290, 300, 30, 24, 7, C.goud, B);
    regel(ctx, 'bijwerking bij 1 op 100.000', 1370, 330, B * q.on('honderdduizend', 1), C.koraal, 40, 'center', 800);
    zacht(ctx, B * q.on('honderdduizend', 1), () => { const X = 940, Y = 380, Wd = 860, Ht = 420; // 100.000 mensen = 33 × het fase-3-blok
      roundRect(ctx, X, Y, Wd, Ht, 10); shape(ctx, rgba(C.koraal, 0.10), C.koraal, 2); ctx.strokeStyle = rgba(C.koraal, 0.25); ctx.lineWidth = 1;
      for (let i = 1; i < 11; i++) { ctx.beginPath(); ctx.moveTo(X + i * Wd / 11, Y); ctx.lineTo(X + i * Wd / 11, Y + Ht); ctx.stroke(); } for (let j = 1; j < 3; j++) { ctx.beginPath(); ctx.moveTo(X, Y + j * Ht / 3); ctx.lineTo(X + Wd, Y + j * Ht / 3); ctx.stroke(); }
      roundRect(ctx, X, Y, Wd / 11, Ht / 3, 4); shape(ctx, rgba(C.goud, 0.55), C.goud, 2); text(ctx, 'fase 3', X + Wd / 22, Y + Ht / 6 + 8, fTekst(22, 800), C.text, 'center');
      circ(ctx, X + Wd * 0.71, Y + Ht * 0.62, 9, C.koraal, '#F4B0A0', 2);
      text(ctx, '100.000 mensen · 1 met de bijwerking', X + Wd / 2, Y + Ht + 42, fTekst(28, 700), C.text2, 'center'); });
    kruis(ctx, 1080, 520, 30, B * q.on('nooit', 1)); vraagteken(ctx, 1700, 300, B * q.on('ontdek', 1), 100); },

  s13(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: blijven melden', 1 - q.on('AstraZeneca', 1)); const B = q.on('AstraZeneca', 1, 0.8) * (1 - q.on('Volgens', 1, 0.8)), C3 = q.on('Volgens', 1, 0.8), A = 1 - q.on('AstraZeneca', 1, 0.8);
    pers(ctx, 'henk', 380, 450, { t, a: A, kijk: 1 }); naamBij(ctx, 'patiënt', '', 220, 380, A * q.on('patiënt', 1), 'left');
    zacht(ctx, A * q.on('melden', 1), () => { for (let i = 0; i < 6; i++) { const k = ((t * 0.5 + i / 6) % 1); document_(ctx, 560 + k * 340, 420 + Math.sin(i * 2) * 120 * (1 - k), 1.2, C.teal, 1); } });
    zacht(ctx, A * q.on('Lareb', 1), () => { roundRect(ctx, 920, 330, 280, 220, 14); shape(ctx, '#2C3B57', C.teal, 3); text(ctx, 'Lareb', 1060, 410, fTekst(42, 800), C.text, 'center'); text(ctx, 'meldingen', 1060, 460, fTekst(26, 600), C.text2, 'center'); });
    chip(ctx, 'zoekt naar patronen', 1060, 640, C.teal, A * q.on('patronen', 1), 28);
    pijl(ctx, 1220, 440, 1400, 440, C.line, A * q.on('signalen', 1), 5, 18); gebouwtje(ctx, 1560, 470, 1, 'cbg', A * q.on('CBG', 1)); naamBij(ctx, 'CBG', '', 1560, 590, A * q.on('CBG', 1), 'center');
    // AstraZeneca
    flacon(ctx, 360, 470, 1.3, B, C.paars); naamBij(ctx, 'AstraZeneca-vaccin', 'corona · 2021', 360, 660, B, 'center');
    popjes(ctx, 720, 260, 80, 20, 34, 9, C.paars, B * q.on('miljoenen', 1)); regel(ctx, 'miljoenen prikken', 720, 470, B * q.on('miljoenen', 1), C.text2, 30, 'left', 700);
    vatStolsel(ctx, 720, 560, 980, B * q.on('trombose', 1), clamp((t - q.at('trombose', 1)) / 2, 0, 1), t); naamBij(ctx, 'trombose: een stolsel in een bloedvat', 'heel zeldzaam', 720, 780, B * q.on('trombose', 1), 'left');
    chip(ctx, 'weinig bloedplaatjes', 1500, 790, C.oker, B * q.on('bloedplaatjes', 1), 26);
    // afweging
    weegschaal(ctx, 560, 560, 0.95, C3, -0.6, 'voordelen', 'risico\'s', C.groen, C.koraal); naamBij(ctx, 'EMA', '', 560, 260, C3, 'center');
    pers(ctx, 'henk', 1340, 450, { t, a: C3 * q.on('zestig', 1), kijk: -1, uit: 'blij' }); tag(ctx, 'vooral vanaf 60 jaar', 1340, 300, C.goud, C3 * q.on('zestig', 1), 'center', 32);
    chip(ctx, 'corona was voor hen veel gevaarlijker', 1340, 860, C.text2, C3 * q.on('gevaarlijker', 1), 26); },

  // ---------- Recap ----------
  s14(ctx, t, q) { bg(ctx, 'schema');
    pers(ctx, 'henk', 820, 450, { t, kijk: 1, pose: 'vasthouden', uit: 'blij' }); pers(ctx, 'noor', 1080, 410, { t, kijk: -1 }); potje(ctx, 1020, 640, 0.8, 1, 0);
    slot(ctx, 1340, 560, 1, q.on('code', 1), q.on('opengaat', 1)); naamBij(ctx, 'code pas na afloop open', '', 1420, 520, q.on('code', 1), 'left');
    stappenLijn(ctx, 260, 250, 1400, ['lab', 'dieren', 'fase 1', 'fase 2', 'fase 3', 'toelating', 'bewaking'], q.on('stappen', 1), Math.floor(clamp((t - q.at('stappen', 1)) * 2.2, 0, 6)));
    chip(ctx, 'zo veilig als we kunnen weten', 1420, 800, C.goud, q.on('veilig', 1), 28); },
  s15(ctx, t, q) { bg(ctx, 'schema');
    const W = 1; gebouwtje(ctx, 560, 360, 1, 'lab', W); naamBij(ctx, 'in het lab', '', 560, 450, W, 'center');
    zacht(ctx, W, () => { potje(ctx, 1000, 380, 0.75, 1, 0); }); naamBij(ctx, 'onderzoek met patiënten', '', 1000, 450, W, 'center');
    gebouwtje(ctx, 1440, 360, 1, 'cbg', W); naamBij(ctx, 'bij het CBG', '', 1440, 450, W, 'center');
    pers(ctx, 'kim', 230, 420, { t, outfit: 'lab', kijk: 1, uit: 'blij' });
    tag(ctx, 'Biomedische wetenschappen · universiteit', 960, 600, C.teal, q.on('studeert', 1), 'center', 34);
    tag(ctx, 'bachelor: 3 jaar', 760, 720, C.text2, q.on('bachelor', 1), 'center', 30); pijl(ctx, 930, 708, 1010, 708, C.line, q.on('master', 1), 4, 14); tag(ctx, 'master: meestal 2 jaar', 1220, 720, C.text2, q.on('master', 1), 'center', 30); }
});
