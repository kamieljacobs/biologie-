
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
// decor (ElevenLabs gpt-image-2.5-sunburst, stijlreferentie 'moestuin', flow RVqu1vLFRgY3QXwS4WcU, generatie G2E65kzWtu04PsTXHJjg, ±433 credits, 31 okt 2026)
var DECOR_SRC = DECOR_SRC || {}; DECOR_SRC.ziekenhuis = "data:image/webp;base64,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";
// Wat word jij? · Voeding en diëtetiek — gedeelde reeksbibliotheek (film 1 en 2), 26 okt 2026.
// Schema-look: navy, gedempte vlakke kleuren uit het filmpalet, dunne lichtere rand, geen verloop/gloed.
// Kleuren: oker = voedsel, groen = groente/fruit, koraal = energie, paars = hormonen, teal = zenuw/water, goud = focus.

const VD = {
  hout: '#7A5A3E', houtR: '#9A7856', papier: '#E8E2D2', papierR: '#C8C0AC', inkt: '#4A5468',
  tomaat: '#D8705A', appel: '#8FBF6A', blad: '#6FA868', ei: '#EFE6D2', dooier: '#E0B64A', olie: '#C9B45C',
  rijst: '#EAE4D4', pizza: '#D9A85C', saus: '#C8604A', koek: '#B98A52', chips: '#D9C27A', thee: '#A8784E',
  vak: ['#6FA878', '#C9A35C', '#B98A80', '#CDB86E', '#5B9AC0'], // groente/fruit · brood/graan · peulvr/vis/vlees/zuivel · vetten/oliën · dranken
  huidNeutraal: '#C9A07E'
};
const VD_VAKNAMEN = ['groente en fruit', 'brood, graanproducten en aardappelen', 'peulvruchten, noten, vis, ei, vlees en zuivel', 'vetten en oliën', 'dranken'];
function _vdAssen(ctx, x, y, w, h) { ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke(); }
function _vdA(ctx, a) { if (a <= 0.01) return false; ctx.save(); ctx.globalAlpha *= a; return true; }
function _vdLicht(c, k = 0.35) { return lighten(c, k); }

// ---------- voedsel-iconen (aanvulling op foodIcon) ----------
function eten(ctx, kind, x, y, s = 1, a = 1) {
  if (!_vdA(ctx, a)) return; const st = c => _vdLicht(c);
  if (kind === 'tomaat') { circ(ctx, x, y + 4 * s, 30 * s, VD.tomaat, st(VD.tomaat), 1.4); ctx.strokeStyle = VD.blad; ctx.lineWidth = 4 * s; ctx.lineCap = 'round'; for (let k = 0; k < 5; k++) { const an = -1.57 + (k - 2) * 0.5; ctx.beginPath(); ctx.moveTo(x, y - 24 * s); ctx.lineTo(x + Math.cos(an) * 14 * s, y - 24 * s + Math.sin(an) * 8 * s + 4 * s); ctx.stroke(); } }
  else if (kind === 'tomaatjes') { [[-16, 6], [14, 8], [-2, -12]].forEach(p => eten(ctx, 'tomaat', x + p[0] * s, y + p[1] * s, 0.55 * s)); }
  else if (kind === 'appel') { ctx.beginPath(); ctx.moveTo(x, y - 22 * s); ctx.bezierCurveTo(x + 34 * s, y - 40 * s, x + 44 * s, y + 10 * s, x + 18 * s, y + 30 * s); ctx.bezierCurveTo(x + 8 * s, y + 36 * s, x - 8 * s, y + 36 * s, x - 18 * s, y + 30 * s); ctx.bezierCurveTo(x - 44 * s, y + 10 * s, x - 34 * s, y - 40 * s, x, y - 22 * s); shape(ctx, VD.appel, st(VD.appel), 1.4); ctx.strokeStyle = VD.hout; ctx.lineWidth = 4 * s; ctx.beginPath(); ctx.moveTo(x, y - 20 * s); ctx.lineTo(x + 4 * s, y - 36 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + 14 * s, y - 34 * s, 10 * s, 5 * s, -0.4, 0, 6.283); shape(ctx, VD.blad, st(VD.blad), 1); }
  else if (kind === 'ei') { ctx.beginPath(); ctx.ellipse(x, y, 24 * s, 31 * s, 0, 0, 6.283); shape(ctx, VD.ei, st(VD.ei, 0.1), 1.4); }
  else if (kind === 'eiGebakken') { blob(ctx, x, y, 44 * s, 32 * s, 0.18, 7); shape(ctx, VD.ei, '#FFFFFF', 1.2); circ(ctx, x + 4 * s, y - 2 * s, 14 * s, VD.dooier, st(VD.dooier), 1.2); }
  else if (kind === 'olie') { ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 48 * s); ctx.lineTo(x + 10 * s, y - 48 * s); ctx.lineTo(x + 10 * s, y - 30 * s); ctx.quadraticCurveTo(x + 26 * s, y - 20 * s, x + 26 * s, y); ctx.lineTo(x + 26 * s, y + 40 * s); ctx.lineTo(x - 26 * s, y + 40 * s); ctx.lineTo(x - 26 * s, y); ctx.quadraticCurveTo(x - 26 * s, y - 20 * s, x - 10 * s, y - 30 * s); ctx.closePath(); shape(ctx, rgba(VD.olie, 0.85), st(VD.olie), 1.4); roundRect(ctx, x - 9 * s, y - 58 * s, 18 * s, 11 * s, 3 * s); shape(ctx, '#4A5468', '#8FA0B5', 1); }
  else if (kind === 'water') { ctx.beginPath(); ctx.moveTo(x - 26 * s, y - 40 * s); ctx.lineTo(x + 26 * s, y - 40 * s); ctx.lineTo(x + 20 * s, y + 40 * s); ctx.lineTo(x - 20 * s, y + 40 * s); ctx.closePath(); shape(ctx, rgba(C.teal, 0.25), rgba(C.text, 0.7), 1.6); ctx.fillStyle = rgba(C.teal, 0.45); ctx.beginPath(); ctx.moveTo(x - 23 * s, y - 14 * s); ctx.lineTo(x + 23 * s, y - 14 * s); ctx.lineTo(x + 20 * s, y + 40 * s); ctx.lineTo(x - 20 * s, y + 40 * s); ctx.closePath(); ctx.fill(); }
  else if (kind === 'thee') { roundRect(ctx, x - 30 * s, y - 24 * s, 52 * s, 50 * s, 10 * s); shape(ctx, '#D9D2C2', '#F2F2EE', 1.4); ctx.strokeStyle = '#D9D2C2'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(x + 26 * s, y, 13 * s, -1.3, 1.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x - 4 * s, y - 22 * s, 24 * s, 5 * s, 0, 0, 6.283); ctx.fillStyle = VD.thee; ctx.fill(); }
  else if (kind === 'rijst') { ctx.beginPath(); ctx.ellipse(x, y - 4 * s, 40 * s, 16 * s, 0, 3.14, 6.283); shape(ctx, VD.rijst, '#FFFFFF', 1); ctx.beginPath(); ctx.moveTo(x - 44 * s, y - 4 * s); ctx.quadraticCurveTo(x, y + 52 * s, x + 44 * s, y - 4 * s); ctx.closePath(); shape(ctx, '#5B7FA8', '#8FB0D0', 1.4); }
  else if (kind === 'boterham') { ctx.beginPath(); ctx.moveTo(x - 38 * s, y + 34 * s); ctx.lineTo(x - 38 * s, y - 14 * s); ctx.bezierCurveTo(x - 46 * s, y - 46 * s, x - 6 * s, y - 50 * s, x, y - 34 * s); ctx.bezierCurveTo(x + 6 * s, y - 50 * s, x + 46 * s, y - 46 * s, x + 38 * s, y - 14 * s); ctx.lineTo(x + 38 * s, y + 34 * s); ctx.closePath(); shape(ctx, '#C29A5A', st('#C29A5A'), 1.4); ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 28 * s); ctx.lineTo(x - 30 * s, y - 12 * s); ctx.bezierCurveTo(x - 36 * s, y - 36 * s, x - 6 * s, y - 40 * s, x, y - 26 * s); ctx.bezierCurveTo(x + 6 * s, y - 40 * s, x + 36 * s, y - 36 * s, x + 30 * s, y - 12 * s); ctx.lineTo(x + 30 * s, y + 28 * s); ctx.closePath(); shape(ctx, '#E2C890', null); }
  else if (kind === 'pizza') { circ(ctx, x, y, 44 * s, VD.pizza, st(VD.pizza), 1.4); circ(ctx, x, y, 36 * s, VD.saus, null); [[-14, -10], [12, -16], [16, 10], [-12, 14], [2, 2]].forEach(p => circ(ctx, x + p[0] * s, y + p[1] * s, 6 * s, '#EADFB8', null)); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 1.5; for (let k = 0; k < 3; k++) { const an = k * 1.047; ctx.beginPath(); ctx.moveTo(x - Math.cos(an) * 44 * s, y - Math.sin(an) * 44 * s); ctx.lineTo(x + Math.cos(an) * 44 * s, y + Math.sin(an) * 44 * s); ctx.stroke(); } }
  else if (kind === 'koekje') { circ(ctx, x, y, 26 * s, VD.koek, st(VD.koek), 1.4); [[-8, -6], [8, -2], [-2, 9], [10, 10]].forEach(p => circ(ctx, x + p[0] * s, y + p[1] * s, 3.5 * s, '#6A4A30', null)); }
  else if (kind === 'chips') { ctx.beginPath(); ctx.moveTo(x - 30 * s, y - 40 * s); ctx.lineTo(x + 30 * s, y - 40 * s); ctx.lineTo(x + 34 * s, y + 40 * s); ctx.lineTo(x - 34 * s, y + 40 * s); ctx.closePath(); shape(ctx, VD.chips, st(VD.chips), 1.4); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 2; [-30, 34].forEach(d => { ctx.beginPath(); ctx.moveTo(x - 30 * s, y + d * s); for (let k = 0; k <= 6; k++) ctx.lineTo(x - 30 * s + k * 10 * s, y + d * s + (k % 2 ? -4 : 0) * s); ctx.stroke(); }); circ(ctx, x, y + 4 * s, 13 * s, '#E8D49A', null); }
  else if (kind === 'croissant') { ctx.beginPath(); ctx.moveTo(x - 44 * s, y + 10 * s); ctx.quadraticCurveTo(x, y - 46 * s, x + 44 * s, y + 10 * s); ctx.quadraticCurveTo(x + 20 * s, y + 4 * s, x, y + 22 * s); ctx.quadraticCurveTo(x - 20 * s, y + 4 * s, x - 44 * s, y + 10 * s); shape(ctx, '#C9944E', st('#C9944E'), 1.4); ctx.strokeStyle = rgba('#000', 0.25); ctx.lineWidth = 2; [-18, 0, 18].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d * s, y - 16 * s); ctx.lineTo(x + d * 0.7 * s, y + 14 * s); ctx.stroke(); }); }
  else if (kind === 'bonenblik') { roundRect(ctx, x - 28 * s, y - 40 * s, 56 * s, 80 * s, 6 * s); shape(ctx, '#8C98A8', '#C4CCD8', 1.4); roundRect(ctx, x - 28 * s, y - 22 * s, 56 * s, 42 * s, 2); shape(ctx, '#A87048', null); foodIcon(ctx, 'bonen', x, y - 1 * s, 0.42 * s); }
  else if (kind === 'koffie') { roundRect(ctx, x - 26 * s, y - 22 * s, 46 * s, 46 * s, 8 * s); shape(ctx, '#D9D2C2', '#F2F2EE', 1.4); ctx.strokeStyle = '#D9D2C2'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.arc(x + 22 * s, y, 11 * s, -1.3, 1.3); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x - 3 * s, y - 20 * s, 21 * s, 5 * s, 0, 0, 6.283); ctx.fillStyle = '#6A4A30'; ctx.fill(); }
  else if (kind === 'vis') { ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.quadraticCurveTo(x - 6 * s, y - 28 * s, x + 26 * s, y); ctx.quadraticCurveTo(x - 6 * s, y + 28 * s, x - 40 * s, y); shape(ctx, '#B8C4D0', '#E0E6EE', 1.4); ctx.beginPath(); ctx.moveTo(x + 22 * s, y); ctx.lineTo(x + 44 * s, y - 16 * s); ctx.lineTo(x + 44 * s, y + 16 * s); ctx.closePath(); shape(ctx, '#A4B2C0', '#E0E6EE', 1.2); circ(ctx, x - 26 * s, y - 4 * s, 3.5 * s, '#1A2740', null); }
  else if (kind === 'noten') { [[-14, 4], [10, -6], [6, 12]].forEach((p, i) => { ctx.beginPath(); ctx.ellipse(x + p[0] * s, y + p[1] * s, 16 * s, 11 * s, i, 0, 6.283); shape(ctx, '#B88A5A', st('#B88A5A'), 1.2); }); }
  else if (kind === 'bonen' || kind === 'kaas' || kind === 'melk' || kind === 'brood' || kind === 'vlees' || kind === 'blikje') foodIcon(ctx, kind, x, y, s * 0.8);
  ctx.restore();
}

// ---------- Schijf van Vijf (eigen schema, geen logo, geen nummers) ----------
// o.lit[i] 0..1 per vak, o.dim (0..1: vakken die niet oplichten gedimd), o.namen (0..1), o.inhoud (0..1: iconen per vak), o.rot (radialen)
function schijf(ctx, cx, cy, R, o = {}) {
  const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const lit = o.lit || [], rot = o.rot || 0, r0 = R * 0.32;
  for (let i = 0; i < 5; i++) {
    const a0 = rot - Math.PI / 2 + i * 2 * Math.PI / 5 + 0.02, a1 = a0 + 2 * Math.PI / 5 - 0.04, u = lit[i] || 0, d = o.dim ? (1 - o.dim * (1 - u)) : 1;
    ctx.save(); ctx.globalAlpha *= 0.35 + 0.65 * d;
    ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.arc(cx, cy, r0, a1, a0, true); ctx.closePath();
    shape(ctx, rgba(VD.vak[i], 0.55 + 0.3 * u), u > 0.5 ? C.goud : _vdLicht(VD.vak[i], 0.3), u > 0.5 ? 3 : 1.5);
    const am = (a0 + a1) / 2, rm = (R + r0) / 2, ix = cx + Math.cos(am) * rm, iy = cy + Math.sin(am) * rm;
    const inh = o.inhoud == null ? 1 : o.inhoud;
    if (inh > 0.01) { const set = [['tomaat', 'appel'], ['boterham', 'rijst'], ['kaas', 'ei'], ['olie'], ['water', 'thee']][i], sc = R / 330;
      set.forEach((k, j) => eten(ctx, k, ix + (j - (set.length - 1) / 2) * 62 * sc * Math.cos(am + 1.57) , iy + (j - (set.length - 1) / 2) * 62 * sc * Math.sin(am + 1.57), 0.62 * sc, inh)); }
    ctx.restore();
  }
  circ(ctx, cx, cy, r0 - 6, rgba(C.bgSchema, 0.9), rgba(C.line, 0.6), 1.5);
  if (o.namen > 0.01) { for (let i = 0; i < 5; i++) { const am = rot - Math.PI / 2 + (i + 0.5) * 2 * Math.PI / 5, x = cx + Math.cos(am) * (R + 26), y = cy + Math.sin(am) * (R + 26), al = Math.cos(am) > 0.2 ? 'left' : (Math.cos(am) < -0.2 ? 'right' : 'center');
      const nm = VD_VAKNAMEN[i], w = o.namenAl ? (o.namenAl[i] || 0) : o.namen; if (w > 0.01) { ctx.save(); ctx.globalAlpha *= w; _vdNaam(ctx, nm, x, y + (Math.sin(am) > 0.3 ? 30 : 0), al, (lit[i] || 0) > 0.5 ? C.text : C.text2); ctx.restore(); } } }
  ctx.restore();
}
function _vdNaam(ctx, s, x, y, al, col) { // naam in gewone letters, met donkere rand, max 2 regels
  ctx.save(); ctx.font = fTekst(36, 600); ctx.textAlign = al; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  const woorden = s.split(' '); let regels = [s]; if (ctx.measureText(s).width > 420) { let r1 = ''; for (const w of woorden) { if (ctx.measureText(r1 + ' ' + w).width > 400 && r1) break; r1 = r1 ? r1 + ' ' + w : w; } regels = [r1, s.slice(r1.length + 1)]; }
  regels.forEach((r, k) => { ctx.strokeStyle = rgba(C.bgSchema, 0.9); ctx.lineWidth = 8; ctx.strokeText(r, x, y + k * 42); ctx.fillStyle = col; ctx.fillText(r, x, y + k * 42); }); ctx.restore(); }

// ---------- praktijk: tafel, eetdagboek, telefoon met foto ----------
function tafel(ctx, x, y, w, a = 1) { if (!_vdA(ctx, a)) return; roundRect(ctx, x - w / 2, y, w, 22, 6); shape(ctx, VD.hout, VD.houtR, 1.5); ctx.fillStyle = VD.hout; [[-w / 2 + 40], [w / 2 - 52]].forEach(([d]) => ctx.fillRect(x + d, y + 22, 12, 170)); ctx.restore(); }
function eetdagboek(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -170, -120, 340, 240, 8); shape(ctx, VD.papier, VD.papierR, 1.5); ctx.strokeStyle = VD.papierR; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -116); ctx.lineTo(0, 116); ctx.stroke();
  const dagen = o.dagen || ['MA', 'DI', 'WO', 'ZA']; ctx.fillStyle = VD.inkt; ctx.font = fMeta(18); ctx.textAlign = 'left';
  dagen.forEach((d, k) => { const px = k < 2 ? -155 : 15, py = -92 + (k % 2) * 112; ctx.fillText(d, px, py); ctx.strokeStyle = rgba(VD.inkt, 0.35); ctx.lineWidth = 1.5; for (let l = 0; l < 4; l++) { const ww = 90 + ((k * 37 + l * 53) % 50); ctx.beginPath(); ctx.moveTo(px + 34, py - 4 + l * 22); ctx.lineTo(px + 34 + ww * (o.vul == null ? 1 : clamp(o.vul * 4 - k, 0, 1)), py - 4 + l * 22); ctx.stroke(); } });
  if (o.iconen) { eten(ctx, 'boterham', -125, -40, 0.35); eten(ctx, 'koffie', -60, -36, 0.4); eten(ctx, 'tomaat', 60, -40, 0.35); eten(ctx, 'pizza', 120, 70, 0.35); }
  ctx.restore(); }
function telefoonFoto(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; ctx.translate(x, y); ctx.scale(s, s);
  roundRect(ctx, -70, -130, 140, 260, 18); shape(ctx, '#2E3442', '#8FA0B5', 2); roundRect(ctx, -60, -112, 120, 224, 8); ctx.fillStyle = '#9CC4E0'; ctx.fill();
  ctx.save(); roundRect(ctx, -60, -112, 120, 224, 8); ctx.clip(); ctx.fillStyle = '#7FB070'; ctx.fillRect(-60, 40, 120, 80); ctx.fillStyle = '#BFB8A8'; ctx.fillRect(-60, 60, 120, 18);
  _vdFiets(ctx, 0, 62, 0.62, '#D8705A'); if (o.kind) persoon(ctx, o.kind, 0, 46, 112, { pose: 'staan', uit: 'lacht', kijk: 1 }); ctx.restore(); ctx.restore(); }
function _vdFiets(ctx, x, y, s, kleur = '#D8705A') { ctx.save(); ctx.lineWidth = 5 * s; ctx.strokeStyle = '#E8EEF4'; [-40, 40].forEach(d => { ctx.beginPath(); ctx.arc(x + d * s, y, 26 * s, 0, 6.283); ctx.stroke(); }); ctx.strokeStyle = kleur; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 40 * s, y); ctx.lineTo(x - 8 * s, y - 34 * s); ctx.lineTo(x + 26 * s, y - 34 * s); ctx.lineTo(x + 40 * s, y); ctx.moveTo(x - 8 * s, y - 34 * s); ctx.lineTo(x + 2 * s, y); ctx.lineTo(x + 26 * s, y - 34 * s); ctx.moveTo(x - 10 * s, y - 40 * s); ctx.lineTo(x - 2 * s, y - 40 * s); ctx.moveTo(x + 26 * s, y - 34 * s); ctx.lineTo(x + 22 * s, y - 50 * s); ctx.stroke(); ctx.restore(); }
function fietsLicht(ctx, x, y, s = 1, a = 1, kleur) { if (!_vdA(ctx, a)) return; _vdFiets(ctx, x, y, s, kleur); ctx.restore(); }

// ---------- metingen: balken onderrapportage, glas zwaar water, meetlint, weegschaal ----------
function balkPaar(ctx, x, yBase, h1, h2, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const w = o.w || 150;
  roundRect(ctx, x, yBase - h1, w, h1, 8); shape(ctx, rgba(C.oker, 0.55), C.oker, 1.5);
  roundRect(ctx, x + w + 60, yBase - h2, w, h2, 8); shape(ctx, rgba(C.oker, 0.25), rgba(C.oker, 0.9), 1.5);
  if (o.verschil > 0.01 && h2 > h1) { ctx.save(); ctx.globalAlpha *= o.verschil; ctx.setLineDash([8, 6]); ctx.strokeStyle = C.goud; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, yBase - h1); ctx.lineTo(x + 2 * w + 60, yBase - h1); ctx.stroke(); ctx.setLineDash([]); roundRect(ctx, x + w + 60, yBase - h2, w, h2 - h1, 8); ctx.fillStyle = rgba(C.goud, 0.35); ctx.fill(); ctx.restore(); }
  [[o.l1, x + w / 2], [o.l2, x + w * 1.5 + 60]].forEach(([l, lx]) => { if (!l) return; l.split('|').forEach((r, k) => metaText(ctx, r, lx, yBase + 40 + k * 32, C.text2, 'center', 24)); }); ctx.restore(); }
function glasZwaarWater(ctx, x, y, s = 1, a = 1) { if (!_vdA(ctx, a)) return; eten(ctx, 'water', x, y, s); for (let k = 0; k < 5; k++) circ(ctx, x + (-14 + (k * 13) % 28) * s, y + (6 + (k * 17) % 26) * s, 4 * s, rgba(C.paars, 0.9), null); ctx.restore(); }
function meetlint(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const u = o.u == null ? 1 : o.u;
  roundRect(ctx, x, y - 12, w * u, 24, 4); shape(ctx, '#E0C860', '#F0DC88', 1.2); ctx.strokeStyle = '#4A4E5E'; ctx.lineWidth = 1.5; for (let k = 0; k * 14 < w * u - 4; k++) { ctx.beginPath(); ctx.moveTo(x + 4 + k * 14, y - 12); ctx.lineTo(x + 4 + k * 14, y - (k % 5 ? 4 : -2)); ctx.stroke(); } ctx.restore(); }
function weegschaalVloer(ctx, x, y, s = 1, a = 1) { if (!_vdA(ctx, a)) return; roundRect(ctx, x - 70 * s, y - 16 * s, 140 * s, 16 * s, 6 * s); shape(ctx, '#C4CCD8', '#E8EEF4', 1.2); roundRect(ctx, x - 22 * s, y - 13 * s, 44 * s, 9 * s, 2); ctx.fillStyle = '#2E3442'; ctx.fill(); ctx.restore(); }

// ---------- gewoonte: weekbord en curve ----------
function weekbord(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const n = o.n || 7, cw = (w - (n - 1) * 12) / n, st = o.status || [];
  const dagen = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
  for (let i = 0; i < n; i++) { const xx = x + i * (cw + 12), s2 = st[i] || 0; roundRect(ctx, xx, y, cw, cw, 12); shape(ctx, s2 === 2 ? rgba('#5A6478', 0.7) : rgba(C.fill, 0.6), s2 === 1 ? C.goud : rgba(C.line, 0.6), s2 === 1 ? 2.5 : 1.2);
    metaText(ctx, dagen[i % 7], xx + cw / 2, y - 14, C.text2, 'center', 26); if (s2 === 1) eten(ctx, 'tomaatjes', xx + cw / 2, y + cw / 2, cw / 110); if (s2 === 2) { ctx.strokeStyle = rgba(C.text2, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(xx + cw * 0.3, y + cw / 2); ctx.lineTo(xx + cw * 0.7, y + cw / 2); ctx.stroke(); } }
  ctx.restore(); }
function gewoonteCurve(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; _vdAssen(ctx, x, y, w, h); const u = o.u == null ? 1 : o.u;
  const lijnen = [[0.12, C.groen, '± 3 weken'], [0.33, C.goud, 'ruim 2 maanden'], [0.85, rgba(C.text2, 0.9), 'meer dan een half jaar · schatting']];
  lijnen.forEach(([k, col, lab], j) => { const al = o.lijnen ? (o.lijnen[j] || 0) : 1; if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = col; ctx.lineWidth = j === 1 ? 4 : 3; ctx.beginPath();
    for (let p = 0; p <= 60 * u; p++) { const tx = p / 60, yy = 1 - Math.exp(-tx / (k * 0.45)); const px = x + tx * w, py = y + h - yy * h * 0.88; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
    ctx.fillStyle = col; ctx.fillRect(x + w * 0.42, y + h - 150 + j * 44, 34, 6); metaText(ctx, lab.toUpperCase().replace(/\u039C(?:([MGS])(?![A-Z]))?/g,(a,u)=>'\u00B5'+(u?u.toLowerCase():'')), x + w * 0.42 + 48, y + h - 140 + j * 44, col, 'left', 24); ctx.restore(); });
  metaText(ctx, 'TIJD', x + w, y + h + 38, C.text2, 'right', 26); metaText(ctx, 'HOE VANZELF', x, y - 18, C.text2, 'left', 26); ctx.restore(); }

// ---------- film 2: riem, energiebalans, BMI-balk, gewichtscurve, telpoppetjes ----------
function riem(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const gat = o.gat == null ? 2 : o.gat;
  roundRect(ctx, x, y - 22, w, 44, 6); shape(ctx, '#6A4A34', '#8A6A50', 1.5); ctx.strokeStyle = rgba('#D9C4A0', 0.5); ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 6, y - 15); ctx.lineTo(x + w - 6, y - 15); ctx.moveTo(x + 6, y + 15); ctx.lineTo(x + w - 6, y + 15); ctx.stroke(); ctx.setLineDash([]);
  for (let k = 0; k < 5; k++) { const gx = x + w - 60 - k * 40; circ(ctx, gx, y, 6, '#2A1E16', null); if (k === Math.round(gat)) circ(ctx, gx, y, 13, null, C.goud, 2.5); }
  const bx = x + w - 60 - gat * 40 - 90; roundRect(ctx, bx - 30, y - 34, 60, 68, 10); shape(ctx, null, '#C9C2B0', 6); ctx.strokeStyle = '#C9C2B0'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx, y); ctx.lineTo(bx + 40, y); ctx.stroke(); ctx.restore(); }
function energieBalans(ctx, cx, y, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const tilt = o.tilt || 0, L = 300;
  ctx.fillStyle = '#5A6478'; ctx.beginPath(); ctx.moveTo(cx - 60, y + 330); ctx.lineTo(cx + 60, y + 330); ctx.lineTo(cx, y + 10); ctx.closePath(); ctx.fill();
  const dx = Math.cos(tilt) * L, dy = Math.sin(tilt) * L; ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - dx, y - dy); ctx.lineTo(cx + dx, y + dy); ctx.stroke(); circ(ctx, cx, y, 12, C.goud, null);
  const pan = (px, py, col, lab, lagen) => { ctx.strokeStyle = rgba(C.line, 0.8); ctx.lineWidth = 2; const PY = py + 250; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 110, PY); ctx.moveTo(px, py); ctx.lineTo(px + 110, PY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 120, PY); ctx.lineTo(px + 120, PY); ctx.lineWidth = 6; ctx.stroke();
    if (lagen) { let yy = PY - 4; lagen.forEach(([hh, cc, ll, al]) => { if ((al ?? 1) <= 0.01) return; ctx.save(); ctx.globalAlpha *= al ?? 1; roundRect(ctx, px - 90, yy - hh, 180, hh, 6); shape(ctx, rgba(cc, 0.6), cc, 1.5); if (ll) { ctx.font = fMeta(22); ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.fillText(ll, px, yy - hh / 2 + 8); } ctx.restore(); yy -= hh + 4; }); }
    if (lab) metaText(ctx, lab, px, PY + 44, col, 'center', 26); };
  pan(cx - dx, y - dy, C.oker, 'ENERGIE IN · ETEN', o.in || [[120, C.oker, '', 1]]);
  pan(cx + dx, y + dy, C.koraal, 'ENERGIE UIT', o.uit || [[120, C.koraal, '', 1]]); ctx.restore(); }
function bmiBalk(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const lo = 15, hi = 40, X = v => x + (v - lo) / (hi - lo) * w;
  const zones = [[lo, 18.5, rgba(C.teal, 0.45), 'ONDERGEWICHT'], [18.5, 25, rgba(C.groen, 0.5), 'GEZOND'], [25, 30, rgba(C.oker, 0.55), 'OVERGEWICHT'], [30, hi, rgba(C.koraal, 0.55), 'OBESITAS']];
  zones.forEach(([v0, v1, col, lab]) => { ctx.fillStyle = col; ctx.fillRect(X(v0), y, X(v1) - X(v0), 44); metaText(ctx, lab, (X(v0) + X(v1)) / 2, y + 86, C.text2, 'center', 22); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 1.5; ctx.strokeRect(x, y, w, 44); [18.5, 25, 30].forEach(v => { ctx.beginPath(); ctx.moveTo(X(v), y - 8); ctx.lineTo(X(v), y + 52); ctx.stroke(); text(ctx, String(v).replace('.', ','), X(v), y - 16, fTekst(32, 600), C.text, 'center'); });
  if (o.waarde != null && (o.mark ?? 1) > 0.01) { ctx.save(); ctx.globalAlpha *= o.mark ?? 1; const mx = X(o.waarde); ctx.fillStyle = C.goud; ctx.beginPath(); ctx.moveTo(mx, y + 46); ctx.lineTo(mx - 14, y + 70); ctx.lineTo(mx + 14, y + 70); ctx.closePath(); ctx.fill(); ctx.fillRect(mx - 2, y - 6, 4, 56); ctx.restore(); }
  ctx.restore(); }
function gewichtCurve(ctx, x, y, w, h, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const u = o.u == null ? 1 : o.u; _vdAssen(ctx, x, y, w, h);
  const f = tx => tx < 0.4 ? 0.75 - 0.35 * Math.sin(tx / 0.4 * 1.5708) : (o.vlak ? 0.4 : 0.4 + 0.3 * (1 - Math.exp(-(tx - 0.4) * 4)));
  ctx.strokeStyle = C.goud; ctx.lineWidth = 4; ctx.beginPath(); for (let p = 0; p <= 80 * u; p++) { const tx = p / 80, px = x + tx * w, py = y + h - f(tx) * h; p ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  metaText(ctx, 'GEWICHT', x - 10, y - 14, C.text2, 'left', 22); metaText(ctx, 'TIJD', x + w, y + h + 34, C.text2, 'right', 22); metaText(ctx, o.label || 'VOORBEELD · MODEL', x + w, y - 14, C.grain, 'right', 22); ctx.restore(); }
function telpoppetjes(ctx, x, y, n, per, cel, kleurFn, a = 1) { if (!_vdA(ctx, a)) return; for (let i = 0; i < n; i++) { const cx = x + (i % per) * cel, cy = y + Math.floor(i / per) * cel * 1.25, col = kleurFn(i);
  circ(ctx, cx, cy, cel * 0.17, col, null); roundRect(ctx, cx - cel * 0.2, cy + cel * 0.2, cel * 0.4, cel * 0.5, cel * 0.15); ctx.fillStyle = col; ctx.fill(); } ctx.restore(); }

// ---------- film 2: maag met ghreline, vetcel met leptine, hersenen met hypothalamus ----------
function hormoonPuntjes(ctx, x, y, n, r, t, a = 1, col = C.paars, spreid = 80) { if (!_vdA(ctx, a)) return; for (let k = 0; k < n; k++) { const an = hash(k * 13.1) * 6.283, d = (0.3 + 0.7 * hash(k * 7.7)) * spreid, w = 0.5 + 0.5 * Math.sin(t * 0.8 + k);
  circ(ctx, x + Math.cos(an) * d + w * 6, y + Math.sin(an) * d, r, col, _vdLicht(col, 0.4), 1); } ctx.restore(); }
function maagGhreline(ctx, x, y, s = 1, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; const vol = o.vol || 0;
  ctx.translate(x, y); ctx.scale(s * (1 + 0.18 * vol), s * (1 + 0.1 * vol)); maagVorm(ctx, -110, -150, 0.6); ctx.restore();
  if (o.ghreline > 0.01) hormoonPuntjes(ctx, x - 10 * s, y + 10 * s, Math.round(4 + 10 * o.ghreline), 7 * s, o.t || 0, o.ghreline, C.paars, 110 * s); }
function vetcelLeptine(ctx, x, y, r, o = {}) { const a = o.a == null ? 1 : o.a; if (!_vdA(ctx, a)) return; vetcel(ctx, x, y, r, {}); if (o.leptine > 0.01) hormoonPuntjes(ctx, x, y, Math.round(o.n || 10), 7, o.t || 0, o.leptine, C.paars, r * 1.25); ctx.restore(); }
function hersenenHth(ctx, x, y, s = 1, o = {}) { hoofdHersenen(ctx, x, y, s, { a: o.a == null ? 1 : o.a, hth: o.hth || 0, hyp: 0, t: o.t || 0 }); }
// Wat word jij? · Voeding en diëtetiek 4 · Eten als behandeling — eigen tekeningen (v1.0, 31 okt 2026).
// Schema-look: navy, gedempte vlakke kleuren, dunne lichtere rand. Kleuren: oker = voedsel, koraal = energie/spier die verdwijnt (ook aminozuren),
// teal = water, groen = positief, goud = focus; eigen: rood-oranje KAL = kalium, lichtblauw FOS = fosfaat, grijs ZOUT = zout, geel VET = vet.

const KAL = '#D8604A', FOS = '#86C3E8', ZOUT = '#B8BEC8', VET = '#E8C860', GLUC = '#DCC07F';

// ---------- decor ----------
const DECOR_IMG = {};
for (const k in DECOR_SRC) { const im = new Image(); im.src = DECOR_SRC[k]; DECOR_IMG[k] = im; }
function decor(ctx, naam, a = 0.6) { bg(ctx, 'schema'); const im = DECOR_IMG[naam]; if (!im || !im.complete || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(im, 0, 0, W, H); ctx.restore(); ctx.fillStyle = rgba('#121A26', 0.7); ctx.fillRect(0, 0, W, 84); }
const GROND = 860;
function vloer(ctx, y = 862, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = rgba('#2B3442', 0.85); ctx.fillRect(0, y, W, 24); ctx.strokeStyle = rgba(C.line, 0.5); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); ctx.restore(); }

// ---------- hulpjes (zoals gz3/lb3) ----------
function antwoord(ctx, s2, a = 1) { regel(ctx, s2, 120, 150, a, C.groen, 40, 'left', 700); }
function metaA(ctx, s2, x, y, a, col = C.grain, al = 'left', px = 28) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; metaText(ctx, s2, x, y, col, al, px); ctx.restore(); }
function fase(t, t0, t1, d = 0.5) { return ramp(t, t0, d) * (1 - ramp(t, t1 - d, d)); }
function laag(ctx, a, fn) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); }
function kaart(ctx, x, y, w, h, a = 1, rand = C.line) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, h, 16); shape(ctx, rgba('#0D1420', 0.88), rgba(rand, 0.85), 2); ctx.restore(); }
function filmKaartje(ctx, x, y, s2, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = fTekst(26, 700); const ww = ctx.measureText(s2).width + 100; roundRect(ctx, x, y, ww, 60, 12); shape(ctx, rgba('#0D1420', 0.88), rgba(C.line, 0.9), 1.5);
  ctx.beginPath(); ctx.moveTo(x + 24, y + 18); ctx.lineTo(x + 46, y + 30); ctx.lineTo(x + 24, y + 42); ctx.closePath(); ctx.fillStyle = C.goud; ctx.fill(); metaText(ctx, 'FILM', x + 60, y + 25, C.text2, 'left', 28); text(ctx, s2, x + 60, y + 49, fTekst(26, 700), C.text, 'left'); ctx.restore(); }
function slotje(ctx, x, y, s = 1, a = 1, col = C.text2) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.arc(x, y - 10 * s, 13 * s, Math.PI, 0); ctx.lineTo(x + 13 * s, y); ctx.moveTo(x - 13 * s, y - 10 * s); ctx.lineTo(x - 13 * s, y); ctx.stroke(); roundRect(ctx, x - 20 * s, y - 2 * s, 40 * s, 30 * s, 5 * s); shape(ctx, col, null); circ(ctx, x, y + 11 * s, 4 * s, '#1A2740'); ctx.restore(); }
function tekstKaart(ctx, x, y, w, regels, a = 1, rand = C.goud, px = 30) { if (a <= 0.01) return; const h = 40 + regels.length * (px + 14); kaart(ctx, x, y, w, h, a, rand); laag(ctx, a, () => regels.forEach((r, i) => { const [s2, col] = Array.isArray(r) ? r : [r, C.text]; metaText(ctx, s2, x + 28, y + 26 + px + i * (px + 14), col, 'left', px * 0.86); })); return h; }

// ---------- garderobe-aanvulling (alleen in deze film, lib_cast blijft ongewijzigd) ----------
// Mevrouw Jansen in het ziekenhuis: lichtblauw ziekenhuishemd onder haar eigen groene vest, pyjamabroek en pantoffels
CAST.buurvrouw.garderobe.ziekenhuis = { binnen: '#BFD3E2', broek: '#9FB8CC', schoen: '#8A6E5A', schoenAccent: '#6E5646', accessoire: [] };
// Erik (naamloze nierpatiënt): gewone trui
CAST.erik.garderobe = Object.assign(CAST.erik.garderobe || {}, { trui: { top: 'trui', topKleur: '#5A7A9A', topAccent: '#4A6684', broek: '#3E4658' } });

// naamkaartje op de borst (Hanneke in het ziekenhuis); r = ankerpunten van persoon()
function naamkaartje(ctx, r, kijk = 1, a = 1, col = C.groen) { if (a <= 0.01 || !r || !r.hoofd) return; const { x, y, r: hr } = r.hoofd, hy = r.heup.y;
  const bx = x - kijk * hr * 0.55, by = y + (hy - y) * 0.36, w = hr * 0.62, h = hr * 0.36; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, bx - w / 2, by - h / 2, w, h, 3); shape(ctx, '#F4F2EC', '#C8C4BA', 1); ctx.fillStyle = col; ctx.fillRect(bx - w / 2, by - h / 2, w, h * 0.3);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(bx - w * 0.36, by + h * 0.02, w * 0.72, h * 0.13); ctx.fillRect(bx - w * 0.36, by + h * 0.25, w * 0.46, h * 0.1); ctx.restore(); }

// ---------- ziekenhuisbed in vooraanzicht (naar henkInBed, Verpleegkunde 1), met een willekeurig castpersonage en outfit ----------
// o: t, uit, kijk, outfit, adem, deken (kleur), hold (in de hand op de deken: fn(ctx,x,y))
function inBed(ctx, id, x, y, s, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return {}; const t = o.t || 0; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.translate(x, y - 430 * s); ctx.beginPath(); ctx.moveTo(-210 * s, 210 * s); ctx.lineTo(-180 * s, -200 * s); ctx.quadraticCurveTo(0, -240 * s, 180 * s, -200 * s); ctx.lineTo(210 * s, 210 * s); ctx.closePath(); shape(ctx, '#55657F', '#7D8CA6', 2 * s);
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(-150 * s, -150 * s); ctx.quadraticCurveTo(0, -180 * s, 150 * s, -150 * s); ctx.stroke(); ctx.restore();
  roundRect(ctx, x - 165 * s, y - 640 * s, 330 * s, 190 * s, 70 * s); shape(ctx, '#E6EAEE', '#C4CCD6', 2 * s);
  const P0 = CAST[id], PO = Object.assign({}, P0, (P0.garderobe && o.outfit && P0.garderobe[o.outfit]) || {});
  const yB = y - 330 * s, h = 560 * s, L = P0.lengte || 1, hh = h * L / 6.1, top = yB - 2.6 * hh, voet = top + h * L;
  const fr = (o.adem || 14) / 60, b = Math.sin(t * fr * 6.283);
  ctx.save(); ctx.beginPath(); ctx.rect(x - 400 * s, 0, 800 * s, yB + 6 * s); ctx.clip();
  ctx.translate(x, yB); ctx.scale(1 + 0.01 * b, 1 + 0.018 * b); ctx.translate(-x, -yB);
  const P = persoon(ctx, id, x, voet, h, { t, uit: o.uit || 'neutraal', kijk: o.kijk || 1, outfit: o.outfit }); ctx.restore();
  const dk = o.deken || '#8DB3D0', dkL = lighten(dk, 0.2);
  ctx.beginPath(); ctx.moveTo(x - 255 * s, y - 150 * s); ctx.lineTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 255 * s, y - 150 * s); ctx.closePath();
  shape(ctx, dk, dkL, 2 * s); ctx.fillStyle = '#E6EAEE'; ctx.beginPath(); ctx.moveTo(x - 250 * s, yB + 18 * s); ctx.bezierCurveTo(x - 160 * s, yB - 14 * s, x - 60 * s, yB - 4 * s, x, yB - 2 * s); ctx.bezierCurveTo(x + 70 * s, yB - 2 * s, x + 170 * s, yB - 16 * s, x + 250 * s, yB + 18 * s); ctx.lineTo(x + 250 * s, yB + 44 * s); ctx.bezierCurveTo(x + 150 * s, yB + 20 * s, x - 150 * s, yB + 20 * s, x - 250 * s, yB + 44 * s); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = rgba('#5E86A6', 0.6); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 120 * s, yB + 70 * s); ctx.quadraticCurveTo(x - 90 * s, yB + 120 * s, x - 130 * s, y - 160 * s); ctx.moveTo(x + 140 * s, yB + 80 * s); ctx.quadraticCurveTo(x + 110 * s, yB + 130 * s, x + 150 * s, y - 160 * s); ctx.stroke();
  // twee handen op de deken (mouw in de kleur van het bovenstuk)
  const hand = (hx, hy, sd) => { ctx.fillStyle = PO.topKleur; ctx.beginPath(); ctx.ellipse(hx - sd * 46 * s, hy + 4 * s, 34 * s, 22 * s, sd * -0.15, 0, 6.283); ctx.fill();
    ctx.fillStyle = PO.huid; ctx.beginPath(); ctx.ellipse(hx, hy, 30 * s, 19 * s, sd * -0.1, 0, 6.283); ctx.fill(); };
  const hxR = x + 120 * s, hyR = yB + 70 * s, hxL = x - 120 * s; hand(hxR, hyR, 1); hand(hxL, hyR + 6 * s, -1);
  if (o.hold) o.hold(ctx, hxR + 10 * s, hyR - 10 * s);
  ctx.fillStyle = '#6A7590'; ctx.fillRect(x - 265 * s, y - 160 * s, 530 * s, 22 * s);
  roundRect(ctx, x - 280 * s, y - 250 * s, 560 * s, 150 * s, 18 * s); shape(ctx, '#C9D2E0', '#8FA0B5', 2.5 * s); roundRect(ctx, x - 250 * s, y - 225 * s, 500 * s, 100 * s, 12 * s); shape(ctx, '#B4BFD0', null);
  roundRect(ctx, x - 70 * s, y - 205 * s, 140 * s, 60 * s, 6 * s); shape(ctx, '#F2F2EE', '#8FA0B5', 1.5 * s); ctx.fillStyle = '#5A6478'; for (let i = 0; i < 3; i++) ctx.fillRect(x - 52 * s, y - 192 * s + i * 16 * s, (90 - i * 24) * s, 5 * s);
  ctx.fillStyle = '#5A6478'; ctx.fillRect(x - 250 * s, y - 100 * s, 14 * s, 76 * s); ctx.fillRect(x + 236 * s, y - 100 * s, 14 * s, 76 * s); circ(ctx, x - 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s); circ(ctx, x + 243 * s, y - 16 * s, 16 * s, '#2A3242', '#5A6478', 3 * s);
  ctx.restore(); return Object.assign({}, P, { hand: { x: hxR, y: hyR }, handL: { x: hxL, y: hyR } }); }
const JANSEN_BED = { x: 1150, y: 880, s: 0.92 };
function jansenInBed(ctx, t, o = {}) { return inBed(ctx, 'buurvrouw', JANSEN_BED.x, JANSEN_BED.y, JANSEN_BED.s, Object.assign({ t, outfit: 'ziekenhuis', kijk: 1, deken: '#9FB7C9' }, o)); }

// ---------- dienbladen en de kar ----------
function soepKom(ctx, x, y, s, vol = 1) { ctx.beginPath(); ctx.ellipse(x, y, 46 * s, 30 * s, 0, 0, 6.283); shape(ctx, '#E8E4DC', '#FFFFFF', 1.5); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 38 * s, 23 * s, 0, 0, 6.283); shape(ctx, vol > 0.5 ? '#D9944E' : '#E0DAD0', null);
  if (vol > 0.5) { circ(ctx, x - 12 * s, y - 6 * s, 5 * s, '#E8B870'); circ(ctx, x + 10 * s, y + 4 * s, 4 * s, '#7FAE6A'); circ(ctx, x + 16 * s, y - 8 * s, 4 * s, '#E8B870'); } }
function boterhamBord(ctx, x, y, s, hap = 1, leeg = 0) { ctx.beginPath(); ctx.ellipse(x, y, 62 * s, 40 * s, 0, 0, 6.283); shape(ctx, '#EEEAE2', '#FFFFFF', 1.5); if (leeg > 0.5) { circ(ctx, x + 10 * s, y + 6 * s, 3 * s, '#B88A52'); circ(ctx, x - 14 * s, y - 4 * s, 2 * s, '#B88A52'); return; }
  ctx.save(); ctx.beginPath(); ctx.rect(x - 80 * s, y - 60 * s, 160 * s, 120 * s); if (hap) { ctx.moveTo(x + 70 * s, y - 30 * s); ctx.arc(x + 44 * s, y - 30 * s, 26 * s, 0, 6.283, true); } ctx.clip('evenodd');
  roundRect(ctx, x - 44 * s, y - 30 * s, 88 * s, 60 * s, 14 * s); shape(ctx, '#C29A5A', '#D8B47A', 1.5); roundRect(ctx, x - 36 * s, y - 23 * s, 72 * s, 46 * s, 10 * s); shape(ctx, '#E8D49A', null); ctx.restore(); }
function vlaBakje(ctx, x, y, s, open = 0) { roundRect(ctx, x - 30 * s, y - 24 * s, 60 * s, 48 * s, 10 * s); shape(ctx, '#F2EEE4', '#FFFFFF', 1.5); roundRect(ctx, x - 26 * s, y - 20 * s, 52 * s, 40 * s, 8 * s); shape(ctx, open > 0.5 ? '#E8D4A0' : '#D8DEE6', null);
  if (open <= 0.5) { ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 16 * s, y); ctx.lineTo(x + 16 * s, y); ctx.stroke(); } }
// dienblad van boven: kaartje (bv. 'KAMER 12 · MA'); leeg = 0..1 (alles op)
function dienblad(ctx, x, y, s, kaartje, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - 190 * s, y - 120 * s, 380 * s, 240 * s, 22 * s); shape(ctx, '#6E8094', '#9AAABB', 2.5); roundRect(ctx, x - 176 * s, y - 106 * s, 352 * s, 212 * s, 16 * s); shape(ctx, '#7E90A4', null);
  const leeg = o.leeg || 0; soepKom(ctx, x - 90 * s, y - 34 * s, s, leeg > 0.5 ? 0 : 1); boterhamBord(ctx, x + 70 * s, y - 30 * s, s, 1, leeg); vlaBakje(ctx, x - 96 * s, y + 62 * s, s, leeg);
  if (o.lepel !== false) { ctx.strokeStyle = '#D8DEE6'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 10 * s, y + 70 * s); ctx.lineTo(x + 100 * s, y + 70 * s); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x + 112 * s, y + 70 * s, 14 * s, 8 * s, 0, 0, 6.283); ctx.fillStyle = '#D8DEE6'; ctx.fill(); }
  if (kaartje) { ctx.save(); ctx.translate(x + 120 * s, y + 104 * s); ctx.rotate(-0.06); ctx.font = fMeta(Math.round(20 * s)); ctx.letterSpacing = '3px'; const kw = ctx.measureText(kaartje).width + 30 * s; ctx.letterSpacing = '0px'; roundRect(ctx, -kw / 2, -26 * s, kw, 52 * s, 6 * s); shape(ctx, '#F4F2EC', '#C8C4BA', 1.5); metaText(ctx, kaartje, 0, 8 * s, '#2A3446', 'center', Math.round(20 * s)); ctx.restore(); }
  ctx.restore(); }
// dienbladenkar in zijaanzicht: plank = aantal bladen dat erin staat
function kar(ctx, x, y, s = 1, a = 1, n = 5) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 300 * s, h = 470 * s;
  roundRect(ctx, x - w / 2, y - h, w, h - 30 * s, 14 * s); shape(ctx, '#3E4C60', '#7D8CA6', 2.5); roundRect(ctx, x - w / 2 + 16 * s, y - h + 16 * s, w - 32 * s, h - 62 * s, 8 * s); shape(ctx, '#2A3446', null);
  for (let i = 0; i < 6; i++) { const yy = y - h + 40 * s + i * 66 * s; ctx.fillStyle = '#56657C'; ctx.fillRect(x - w / 2 + 16 * s, yy + 30 * s, w - 32 * s, 5 * s); if (i < n) { roundRect(ctx, x - w / 2 + 22 * s, yy + 14 * s, w - 44 * s, 16 * s, 4 * s); shape(ctx, '#7E90A4', '#9AAABB', 1); } }
  ctx.strokeStyle = '#7D8CA6'; ctx.lineWidth = 6 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + w / 2, y - h + 40 * s); ctx.lineTo(x + w / 2 + 40 * s, y - h + 40 * s); ctx.lineTo(x + w / 2 + 40 * s, y - h + 120 * s); ctx.stroke();
  for (const dx of [-w / 2 + 30 * s, w / 2 - 30 * s]) circ(ctx, x + dx, y - 14 * s, 15 * s, '#2A3242', '#5A6478', 3);
  ctx.restore(); }

// ---------- drinkvoeding, rekenblok, tablet, klembord ----------
function flesje(ctx, x, y, s = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x - 22 * s, y + 46 * s); ctx.lineTo(x - 22 * s, y - 14 * s); ctx.quadraticCurveTo(x - 22 * s, y - 34 * s, x - 10 * s, y - 40 * s); ctx.lineTo(x + 10 * s, y - 40 * s); ctx.quadraticCurveTo(x + 22 * s, y - 34 * s, x + 22 * s, y - 14 * s); ctx.lineTo(x + 22 * s, y + 46 * s); ctx.closePath(); shape(ctx, '#EDE6D6', '#FFFFFF', 1.5);
  roundRect(ctx, x - 12 * s, y - 56 * s, 24 * s, 18 * s, 4 * s); shape(ctx, C.oker, null); roundRect(ctx, x - 22 * s, y - 2 * s, 44 * s, 30 * s, 2); shape(ctx, rgba(C.oker, 0.85), null); ctx.restore(); }
function rekenblok(ctx, x, y, s = 1) { roundRect(ctx, x - 34 * s, y - 46 * s, 68 * s, 92 * s, 8 * s); shape(ctx, '#3A4454', '#7D8CA6', 2); roundRect(ctx, x - 26 * s, y - 38 * s, 52 * s, 22 * s, 3 * s); shape(ctx, '#B8D8C0', null);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { roundRect(ctx, x - 26 * s + c * 18 * s, y - 8 * s + r * 17 * s, 14 * s, 12 * s, 2 * s); shape(ctx, '#C8D0DA', null); } }
function tablet(ctx, x, y, s = 1, ang = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); roundRect(ctx, -46 * s, -34 * s, 92 * s, 68 * s, 8 * s); shape(ctx, '#1E232C', '#5A6070', 2); roundRect(ctx, -38 * s, -26 * s, 76 * s, 52 * s, 4 * s); shape(ctx, '#2E4A66', null);
  ctx.fillStyle = rgba(C.text, 0.7); for (let i = 0; i < 3; i++) ctx.fillRect(-30 * s, -18 * s + i * 14 * s, (54 - i * 10) * s, 5 * s); ctx.restore(); }
function klembord(ctx, x, y, s = 1) { roundRect(ctx, x - 30 * s, y - 40 * s, 60 * s, 80 * s, 6 * s); shape(ctx, '#B98A52', '#D8B47A', 1.5); roundRect(ctx, x - 24 * s, y - 32 * s, 48 * s, 68 * s, 3 * s); shape(ctx, '#F2EEE4', null); roundRect(ctx, x - 12 * s, y - 46 * s, 24 * s, 12 * s, 3 * s); shape(ctx, '#8A9AAE', null);
  ctx.fillStyle = '#5A6478'; for (let i = 0; i < 4; i++) ctx.fillRect(x - 18 * s, y - 20 * s + i * 13 * s, (36 - (i % 2) * 10) * s, 4 * s); }
function weegschaal(ctx, x, y, s = 1, a = 1, kg = '') { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x - 80 * s, y - 22 * s, 160 * s, 22 * s, 8 * s); shape(ctx, '#C4CCD8', '#E8EEF4', 1.5); roundRect(ctx, x - 30 * s, y - 18 * s, 60 * s, 13 * s, 3); shape(ctx, '#2E3442', null);
  if (kg) text(ctx, kg, x, y - 7 * s, fTekst(12 * s, 800), '#7FE0A0', 'center'); ctx.restore(); }

// ---------- screening bij opname ----------
function screening(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const w = 640;
  roundRect(ctx, x, y, w, 420, 18); shape(ctx, '#F2EEE4', '#B8B0A0', 2); roundRect(ctx, x + w / 2 - 60, y - 16, 120, 32, 6); shape(ctx, '#8A9AAE', null);
  text(ctx, 'SCREENING BIJ OPNAME', x + 36, y + 62, fTekst(32, 800), '#2A3446', 'left');
  const V = [['onbedoeld afgevallen?', o.v1 || 0, o.q1], ['minder trek?', o.v2 || 0, o.q2], ['al drink- of sondevoeding?', 0, o.q3]];
  V.forEach(([s2, v, qa], i) => { const yy = y + 130 + i * 76, qa2 = qa == null ? 1 : qa; ctx.save(); ctx.globalAlpha *= qa2; ctx.strokeStyle = '#8A9AAE'; ctx.lineWidth = 3; ctx.strokeRect(x + 36, yy - 30, 38, 38); text(ctx, s2, x + 96, yy, fTekst(34, 600), '#2A3446', 'left'); ctx.restore();
    if (v > 0.01) { ctx.save(); ctx.globalAlpha *= v; ctx.strokeStyle = '#3E8E6A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 42, yy - 12); ctx.lineTo(x + 54, yy + 2); ctx.lineTo(x + 78, yy - 34); ctx.stroke(); ctx.restore(); } });
  const sc = o.score || 0; if (sc > 0.01) { ctx.save(); ctx.globalAlpha *= sc; roundRect(ctx, x + 36, y + 340, w - 72, 56, 12); shape(ctx, rgba(C.goud, 0.25), C.goud, 3); text(ctx, 'score 3  →  diëtist', x + w / 2, y + 380, fTekst(36, 800), '#5A4410', 'center'); ctx.restore(); }
  ctx.restore(); }

// ---------- hand met losse trouwring, ruim vest (in een zoomcirkel) ----------
function handRing(ctx, cx, cy, r, t) { const huid = CAST.buurvrouw.huid, sd = _sdk(huid); ctx.fillStyle = '#2A3A58'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#9FB7C9'; ctx.fillRect(cx - r, cy + r * 0.25, 2 * r, r);
  ctx.save(); ctx.translate(cx - r * 0.1, cy + r * 0.15); ctx.rotate(-0.25);
  ctx.beginPath(); ctx.ellipse(-r * 0.5, 0, r * 0.42, r * 0.3, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill(); // handrug
  [[-0.32, 0.17], [-0.12, 0.06], [0.08, 0.0], [0.27, -0.08]].forEach(([dy, dx], i) => { roundRect(ctx, -r * 0.2 + dx * r, -r * 0.24 + dy * r * 0.0 + (i - 1.5) * r * 0.16, r * (0.72 - Math.abs(i - 1.2) * 0.1), r * 0.14, r * 0.07); ctx.fillStyle = huid; ctx.fill(); ctx.strokeStyle = sd; ctx.lineWidth = 1.2; ctx.stroke(); });
  // ring om de ringvinger (derde), draait en schuift een beetje
  const ry = -r * 0.24 + 0.5 * r * 0.16 + r * 0.07, rx = r * 0.18 + 0.06 * r * Math.sin(t * 1.6);
  ctx.strokeStyle = C.goud; ctx.lineWidth = r * 0.035; ctx.beginPath(); ctx.ellipse(rx, ry, r * 0.04, r * 0.115, 0.12 * Math.sin(t * 1.6), 0, 6.283); ctx.stroke(); ctx.restore(); }
function _sdk(c) { return lighten(c, -0.2); }
function mouwRuim(ctx, cx, cy, r) { const huid = CAST.buurvrouw.huid, vest = CAST.buurvrouw.topKleur; ctx.fillStyle = '#2A3A58'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  ctx.fillStyle = '#9FB7C9'; ctx.fillRect(cx - r, cy + r * 0.45, 2 * r, r); // deken
  // wijde mouw van boven naar beneden, met een smalle pols die er los in hangt (ruimte zichtbaar)
  ctx.beginPath(); ctx.moveTo(cx - r * 0.55, cy - r); ctx.lineTo(cx + r * 0.55, cy - r); ctx.lineTo(cx + r * 0.5, cy + r * 0.2); ctx.quadraticCurveTo(cx, cy + r * 0.32, cx - r * 0.5, cy + r * 0.2); ctx.closePath(); shape(ctx, vest, lighten(vest, 0.25), 2);
  ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.24, r * 0.5, r * 0.12, 0, 0, 6.283); shape(ctx, _sdk(vest), null); // opening
  roundRect(ctx, cx - r * 0.2, cy + r * 0.1, r * 0.4, r * 0.5, r * 0.16); ctx.fillStyle = huid; ctx.fill(); // pols
  ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.66, r * 0.3, r * 0.2, 0, 0, 6.283); ctx.fillStyle = huid; ctx.fill(); // hand
  ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(cx - r * 0.46, cy + r * 0.24); ctx.lineTo(cx - r * 0.24, cy + r * 0.24); ctx.moveTo(cx + r * 0.24, cy + r * 0.24); ctx.lineTo(cx + r * 0.46, cy + r * 0.24); ctx.stroke(); ctx.setLineDash([]); }

// ---------- telpoppetjes (alleen in een raster) ----------
function poppetjes(ctx, x, y, n, k, cel, colK, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const cx = x + i * cel, col = i < k ? colK : '#5A6478'; circ(ctx, cx, y, cel * 0.17, col); roundRect(ctx, cx - cel * 0.2, y + cel * 0.2, cel * 0.4, cel * 0.5, cel * 0.15); ctx.fillStyle = col; ctx.fill(); } ctx.restore(); }

// ---------- glucose, aminozuren, vet ----------
function glucose(ctx, x, y, r = 14, a = 1, col = GLUC) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; hexagon(ctx, x, y, r, col, lighten(col, 0.3), 1.5); ctx.restore(); }
function aminozuur(ctx, x, y, r = 10, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; circ(ctx, x, y, r, C.koraal, lighten(C.koraal, 0.3), 1.5); ctx.restore(); }
function langs(pts, u) { const seg = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
  let d = clamp(u, 0, 1) * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const f = seg[i] ? clamp(d / seg[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= seg[i]; } return pts[pts.length - 1]; }
function bocht(x0, y0, x1, y1, h, n = 24) { const P = []; for (let i = 0; i <= n; i++) { const u = i / n, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 - h; P.push([(1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * my + u * u * y1]); } return P; }
function stroom(ctx, pts, t, n, teken, a = 1, snel = 0.25) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const u = (t * snel + i / n) % 1; const [px, py] = langs(pts, u); const fa = Math.min(1, u * 8, (1 - u) * 8); ctx.save(); ctx.globalAlpha *= fa; teken(px, py, i); ctx.restore(); } ctx.restore(); }
function padLijn(ctx, pts, col, a = 1, lw = 3, dash = [10, 9]) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

// leverzoom: leverweefsel met glycogeenkorrels (oker) die leeglopen; vol 0..1
function leverBinnen(ctx, cx, cy, r, vol, t) { ctx.fillStyle = '#5A2A26'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = 0; i < 9; i++) { const an = i * 0.7 + 0.3, d = (i % 3) * r * 0.3 + r * 0.15; const px = cx + Math.cos(an * 2.3) * d, py = cy + Math.sin(an * 2.3) * d; ctx.beginPath(); ctx.moveTo(px + r * 0.22, py); for (let k = 1; k <= 6; k++) ctx.lineTo(px + Math.cos(k * 1.047) * r * 0.22, py + Math.sin(k * 1.047) * r * 0.22); ctx.closePath(); shape(ctx, '#8E3B32', '#A84E43', 1.5); circ(ctx, px, py, r * 0.05, '#6E5A9E'); }
  const n = Math.round(26 * vol); for (let i = 0; i < n; i++) { const an = hash(i * 7.3) * 6.283, d = Math.sqrt(hash(i * 3.1)) * r * 0.82; circ(ctx, cx + Math.cos(an) * d, cy + Math.sin(an) * d, r * 0.045, C.oker, lighten(C.oker, 0.3), 1); } }
// spierzoom: spiervezels met een eiwitketting (kralen) die loslaat; los 0..1
function spierBinnen(ctx, cx, cy, r, los, t) { ctx.fillStyle = '#6A2A2A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -3; i <= 3; i++) { const yy = cy + i * r * 0.26; roundRect(ctx, cx - r, yy - r * 0.11, 2 * r, r * 0.22, r * 0.1); shape(ctx, '#B9524C', '#D47A70', 1.2); }
  const n = 9; for (let i = 0; i < n; i++) { const bx = cx - r * 0.6 + i * r * 0.15, by = cy + Math.sin(i * 0.9) * r * 0.08; const f = clamp(los * 1.6 - (n - 1 - i) * 0.08, 0, 1);
    const ox = f * (r * 0.4 + i * 4) * Math.cos(i * 1.7), oy = -f * (r * 0.35 + hash(i) * r * 0.2); if (i < n - 1 && f < 0.05) { ctx.strokeStyle = lighten(C.koraal, 0.3); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + r * 0.15, cy + Math.sin((i + 1) * 0.9) * r * 0.08); ctx.stroke(); }
    aminozuur(ctx, bx + ox, by + oy, r * 0.065, 1 - 0.6 * f); } }
// vetweefsel: grote vetcellen (geel) met kleine kern aan de rand
function vetBinnen(ctx, cx, cy, r) { ctx.fillStyle = '#4A4430'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  const P = [[-0.45, -0.4], [0.15, -0.5], [0.6, -0.15], [-0.6, 0.2], [0.0, 0.05], [0.45, 0.45], [-0.2, 0.6]]; P.forEach(([dx, dy], i) => { ctx.beginPath(); ctx.arc(cx + dx * r, cy + dy * r, r * 0.33, 0, 6.283); shape(ctx, VET, lighten(VET, 0.3), 1.5); circ(ctx, cx + dx * r + r * 0.24, cy + dy * r - r * 0.16, r * 0.05, '#8C7BBF'); }); }

// kijkje in de romp (organen uit lib_anatomie op hun echte plek): w = {lever, nieren}; grijs = nieren grijs
let BODY = { cx: 960, yb: 880, h: 700 };
function rompKijkje(ctx, r, a = 1, w = {}, grijs = 0) { if (a <= 0.01 || !r || !r.hoofd) return null;
  const yS = r.hoofd.y + r.hoofd.r * 1.75, yH = r.heup.y, HHn = 1.3 * (yH - yS) / (3.98 - 1.36), yM = lerp(yS, yH, 0.45);
  BODY = { cx: r.heup.x, yb: yM - 2.5 * HHn + AN_H * HHn, h: AN_H * HHn };
  const [wx, wy] = AP(0, 2.6), wr = 0.85 * HHn; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.clip(); ctx.fillStyle = ANA.huidS; ctx.fillRect(wx - wr * 1.2, wy - wr * 1.2, wr * 2.4, wr * 2.4); anCavity(0.9);
  const L = w.lever || 0, N = w.nieren || 0; if (L > 0.01) { ctx.save(); ctx.globalAlpha *= L; liver(1, 0.6 * (w.gloed || 0)); ctx.restore(); }
  if (N > 0.01) { const o1 = ANA.nier, o2 = ANA.nierL; if (grijs > 0.01) { ANA.nier = _mixK(o1, '#6A6E78', grijs); ANA.nierL = _mixK(o2, '#8A8E98', grijs); } ctx.save(); ctx.globalAlpha *= N; for (const sd of [-1, 1]) anKidney(sd, 1, 0); ctx.restore(); ANA.nier = o1; ANA.nierL = o2; }
  ctx.restore(); ctx.beginPath(); ctx.ellipse(wx, wy, wr, wr * 1.05, 0, 0, 6.283); ctx.strokeStyle = rgba(C.goud, 0.8); ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
  return { x: wx, y: wy, r: wr, lever: AP(-0.35, 2.45), nierL: AP(-0.37, 2.9), nierR: AP(0.37, 2.84) }; }
function _mixK(a, b, u) { const p = (c) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * u).toString(16).padStart(2, '0')).join(''); }

// doorsnede van een dij: bot, spier (koraal-rood), dun vetlaagje, huid; k = spierdikte (1 = voor)
function dijDoorsnede(ctx, x, y, r, k = 1, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const rs = r * (0.94 + 0.06 * k);
  if (k < 0.99) { ctx.setLineDash([8, 7]); circ(ctx, x, y, r + r * 0.12, null, C.koraal, 2.5); ctx.setLineDash([]); }
  circ(ctx, x, y, rs + r * 0.12, '#D9A982', '#BF8C66', 2); circ(ctx, x, y, rs + r * 0.06, rgba(VET, 0.85)); circ(ctx, x, y, rs, '#B9524C', '#D47A70', 2);
  ctx.strokeStyle = rgba('#7A2A2A', 0.6); ctx.lineWidth = 2; for (let i = 0; i < 6; i++) { const an = i * 1.047 + 0.4; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.26, y + Math.sin(an) * r * 0.26); ctx.lineTo(x + Math.cos(an) * rs * 0.96, y + Math.sin(an) * rs * 0.96); ctx.stroke(); }
  circ(ctx, x, y, r * 0.22, '#ECE5D3', '#BDB49E', 2); circ(ctx, x, y, r * 0.1, '#C9A890'); ctx.restore(); }

// ---------- nieren en bloed: bakjes ----------
// bakje met vulling u (0..1), gestippeld als leeg/gestippeld = true
function bakje(ctx, x, y, w, h, naam, col, u, a = 1, o = {}) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
  roundRect(ctx, x - w / 2, y - h, w, h, 12); if (o.stippel) ctx.setLineDash([10, 8]); shape(ctx, rgba(C.fill, 0.5), col, 3); ctx.setLineDash([]);
  if (u > 0.01) { ctx.save(); roundRect(ctx, x - w / 2, y - h, w, h, 12); ctx.clip(); ctx.fillStyle = rgba(col, 0.6); ctx.fillRect(x - w / 2, y - h * u, w, h * u); ctx.restore(); }
  metaText(ctx, naam, x, y + 42, col, 'center', 28); if (o.slot) slotje(ctx, x, y - h - 30, 0.8, o.slot, col); ctx.restore(); }

// ---------- borden voor Eriks gewone dag ----------
function banaan(ctx, x, y, s = 1, col = '#E8CF60') { ctx.beginPath(); ctx.moveTo(x - 54 * s, y - 26 * s); ctx.bezierCurveTo(x - 40 * s, y + 34 * s, x + 30 * s, y + 40 * s, x + 56 * s, y - 22 * s); ctx.bezierCurveTo(x + 40 * s, y + 4 * s, x - 22 * s, y + 6 * s, x - 42 * s, y - 30 * s); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.strokeStyle = rgba('#000', 0.18); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(x - 46 * s, y - 20 * s); ctx.bezierCurveTo(x - 26 * s, y + 22 * s, x + 26 * s, y + 24 * s, x + 50 * s, y - 16 * s); ctx.stroke(); roundRect(ctx, x - 58 * s, y - 34 * s, 10 * s, 10 * s, 2 * s); shape(ctx, '#6A5030', null); circ(ctx, x + 56 * s, y - 22 * s, 3 * s, '#6A5030'); }
function aardappels(ctx, x, y, s = 1, col = '#D9B878') { [[-22, 4], [12, -6], [20, 14], [-4, -14]].forEach(([dx, dy], i) => { const px = x + dx * s, py = y + dy * s; ctx.beginPath(); ctx.ellipse(px, py, 20 * s, 15 * s, i * 0.6, 0, 6.283); shape(ctx, col, _mixK(col, '#6A4A2A', 0.45), 2 * s); [[-7, -3], [6, 4], [2, -6]].forEach(([ex, ey]) => circ(ctx, px + ex * s, py + ey * s, 1.8 * s, _mixK(col, '#5A3A20', 0.6))); }); }
function saus(ctx, x, y, s = 1, col = '#C8503C') { ctx.beginPath(); ctx.ellipse(x, y, 36 * s, 22 * s, 0, 0, 6.283); shape(ctx, '#D8DEE6', '#FFFFFF', 1.2); ctx.beginPath(); ctx.ellipse(x, y - 2 * s, 28 * s, 15 * s, 0, 0, 6.283); shape(ctx, col, null); circ(ctx, x - 9 * s, y - 6 * s, 4 * s, lighten(col, 0.3)); circ(ctx, x + 8 * s, y + 2 * s, 3 * s, lighten(col, 0.3)); }
function biefstuk(ctx, x, y, s = 1, col = '#9A5A44') { blob(ctx, x, y, 38 * s, 24 * s, 0.12, 2); shape(ctx, col, lighten(col, 0.3), 1.2); ctx.strokeStyle = rgba('#3A1A10', 0.4); ctx.lineWidth = 3 * s; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x - 20 * s + i * 14 * s, y - 14 * s); ctx.lineTo(x - 6 * s + i * 14 * s, y + 14 * s); ctx.stroke(); } }
function soepPak(ctx, x, y, s = 1) { roundRect(ctx, x - 28 * s, y - 44 * s, 56 * s, 88 * s, 5 * s); shape(ctx, '#C9654B', '#E08A70', 1.5); roundRect(ctx, x - 20 * s, y - 14 * s, 40 * s, 30 * s, 15 * s); shape(ctx, '#E8C070', null); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(x - 20 * s, y - 34 * s, 40 * s, 8 * s); }
function smeerkaas(ctx, x, y, s = 1, col = '#F0E2B0') { ctx.beginPath(); ctx.ellipse(x, y, 26 * s, 12 * s, 0, 0, 6.283); shape(ctx, '#D8DEE6', '#FFFFFF', 1.2); ctx.beginPath(); ctx.ellipse(x, y - 3 * s, 20 * s, 8 * s, 0, 0, 6.283); shape(ctx, col, null); }
function bordje(ctx, x, y, s = 1) { ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 62 * s, 0, 0, 6.283); shape(ctx, '#E6E2DA', '#FFFFFF', 2); ctx.beginPath(); ctx.ellipse(x, y, 84 * s, 46 * s, 0, 0, 6.283); ctx.strokeStyle = '#C8C4BA'; ctx.lineWidth = 1.5; ctx.stroke(); }
function gloeiRing(ctx, x, y, rx, ry, col, a) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.283); ctx.fillStyle = rgba(col, 0.18); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); }

// ---------- zout, glas, pil, pan, hartslag ----------
function zoutvaatje(ctx, x, y, s = 1) { ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 50 * s); ctx.lineTo(x - 24 * s, y - 20 * s); ctx.quadraticCurveTo(x, y - 34 * s, x + 24 * s, y - 20 * s); ctx.lineTo(x + 30 * s, y + 50 * s); ctx.closePath(); shape(ctx, rgba('#E8ECF2', 0.85), '#FFFFFF', 1.5);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x - 27 * s, y + 10 * s, 54 * s, 38 * s); ctx.beginPath(); ctx.ellipse(x, y - 24 * s, 24 * s, 14 * s, 0, Math.PI, 0); shape(ctx, '#9AA3B2', null); [-8, 0, 8].forEach(d => circ(ctx, x + d * s, y - 30 * s, 2.5 * s, '#2A3446')); }
function glas(ctx, x, y, s = 1, vul = 0.6, streep = null) { ctx.beginPath(); ctx.moveTo(x - 30 * s, y - 50 * s); ctx.lineTo(x + 30 * s, y - 50 * s); ctx.lineTo(x + 23 * s, y + 50 * s); ctx.lineTo(x - 23 * s, y + 50 * s); ctx.closePath(); shape(ctx, rgba(C.teal, 0.15), rgba(C.text, 0.8), 2);
  const yv = y + 50 * s - 100 * s * vul; ctx.fillStyle = rgba(C.teal, 0.55); ctx.beginPath(); ctx.moveTo(x - 30 * s + 7 * s * (1 - vul), yv); ctx.lineTo(x + 30 * s - 7 * s * (1 - vul), yv); ctx.lineTo(x + 23 * s, y + 50 * s); ctx.lineTo(x - 23 * s, y + 50 * s); ctx.closePath(); ctx.fill();
  if (streep != null) { const ys = y + 50 * s - 100 * s * streep; ctx.strokeStyle = C.teal; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 38 * s, ys); ctx.lineTo(x + 38 * s, ys); ctx.stroke(); } }
function pil(ctx, x, y, s = 1, col = FOS) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5); roundRect(ctx, -34 * s, -15 * s, 68 * s, 30 * s, 15 * s); shape(ctx, '#F2F2EE', '#FFFFFF', 1.5); ctx.beginPath(); ctx.moveTo(0, -15 * s); ctx.lineTo(19 * s, -15 * s); ctx.arc(19 * s, 0, 15 * s, -Math.PI / 2, Math.PI / 2); ctx.lineTo(0, 15 * s); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function pan(ctx, x, y, s = 1, giet = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.55 * giet);
  ctx.beginPath(); ctx.moveTo(-110 * s, -60 * s); ctx.lineTo(-100 * s, 50 * s); ctx.quadraticCurveTo(0, 70 * s, 100 * s, 50 * s); ctx.lineTo(110 * s, -60 * s); ctx.closePath(); shape(ctx, '#7D8CA6', '#AFC0D0', 2);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-104 * s, -40 * s); ctx.lineTo(-100 * s, 50 * s); ctx.quadraticCurveTo(0, 70 * s, 100 * s, 50 * s); ctx.lineTo(104 * s, -40 * s); ctx.closePath(); ctx.clip(); ctx.fillStyle = rgba(C.teal, 0.5 * (1 - giet * 0.9)); ctx.fillRect(-120 * s, -40 * s + 80 * s * giet, 240 * s, 120 * s); ctx.restore();
  aardappels(ctx, -30 * s, 26 * s, 1.1 * s); aardappels(ctx, 40 * s, 30 * s, 1.0 * s);
  ctx.strokeStyle = '#5A6478'; ctx.lineWidth = 12 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-110 * s, -40 * s); ctx.lineTo(-180 * s, -40 * s); ctx.moveTo(110 * s, -40 * s); ctx.lineTo(180 * s, -40 * s); ctx.stroke(); ctx.restore();
  if (giet > 0.3) { ctx.save(); ctx.globalAlpha *= clamp((giet - 0.3) * 3, 0, 1); for (let i = 0; i < 7; i++) { const u = (t * 1.3 + i / 7) % 1; circ(ctx, x - 130 * s - 10 * s * Math.sin(i), y - 10 * s + u * 170 * s, 7 * s, rgba(C.teal, 0.8)); } ctx.restore(); } }
// hartslaglijn: hapert = 0..1 (onregelmatig)
function hartslag(ctx, x, y, w, h, t, hapert = 0, col = KAL, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y - h, w, 2 * h); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
  const per = 150, off = (t * 120) % per; let started = false; const slag = (i) => hapert > 0.5 ? (i % 3 === 1 ? 0.55 : (i % 3 === 2 ? 1.6 : 1)) : 1;
  for (let px = -per; px < w + per; px += 2) { const xx = px + off, i = Math.floor((xx + 10 * per) / per), ph = ((xx % per) + per) % per, sc = slag(i), g = ph * sc;
    let yy = 0; if (g > 50 && g < 60) yy = -(g - 50) * 0.3; else if (g >= 60 && g < 68) yy = -3 + (g - 60) * 1.8; else if (g >= 68 && g < 76) yy = 11 - (g - 68) * 5.5; else if (g >= 76 && g < 84) yy = -33 + (g - 76) * 4.4; else if (g >= 100 && g < 120) yy = -Math.sin((g - 100) / 20 * Math.PI) * 6;
    if (hapert > 0.5 && i % 3 === 2 && g > 130) yy = 0; const X = x + px, Y = y + yy * h / 33; if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y); }
  ctx.stroke(); ctx.restore(); }

// ---------- eiwitschuif (g eiwit per kg per dag) ----------
// o: gezond, voor, meesten, dialyse (0..1 zichtbaarheid), dialyseVraag (0..1), stand ('voor'|'dialyse'), sp (spring 0..1)
function eiwitSchuif(ctx, x, y, w, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const lo = 0.4, hi = 1.6, X = (g) => x + (g - lo) / (hi - lo) * w;
  metaText(ctx, 'EIWIT · GRAM PER KG LICHAAMSGEWICHT PER DAG', x, y - 150, C.text2, 'left', 28);
  roundRect(ctx, x, y - 12, w, 24, 12); shape(ctx, rgba(C.fill, 0.7), C.line, 1.5);
  for (let g = 0.4; g <= 1.61; g += 0.2) { const gx = X(g); ctx.fillStyle = C.line; ctx.fillRect(gx - 1, y + 14, 2, 14); metaText(ctx, g.toFixed(1).replace('.', ','), gx, y + 56, C.text2, 'center', 28); }
  const mk = (g, lab, sub, col, al, onder = false) => { if (al <= 0.01) return; ctx.save(); ctx.globalAlpha *= al; const gx = X(g); circ(ctx, gx, y, 18, col, lighten(col, 0.3), 2);
    text(ctx, lab, gx, onder ? y + 110 : y - 60, fTekst(32, 800), col, 'center'); if (sub) metaText(ctx, sub, gx, onder ? y + 146 : y - 140 + 0, C.text2, 'center', 28); ctx.restore(); };
  mk(0.8, 'gezond: 0,8', '', C.groen, o.gezond || 0, true);
  if ((o.meesten || 0) > 0.01) { laag(ctx, o.meesten, () => { const gx = X(1.0); ctx.fillStyle = rgba(C.text2, 0.9); ctx.fillRect(gx - 2, y - 30, 4, 60); metaText(ctx, 'NL GEMIDDELD ± 1,0', gx + 14, y + 110, C.text2, 'left', 28); }); }
  if ((o.voor || 0) > 0.01) laag(ctx, o.voor, () => { const gx = X(0.8); circ(ctx, gx, y, 26, null, C.oker, 5); circ(ctx, gx, y, 14, C.oker, null); text(ctx, 'vóór dialyse: niet meer dan nodig', gx, y - 60, fTekst(32, 800), C.oker, 'center'); });
  if ((o.dialyse || 0) > 0.01) laag(ctx, o.dialyse, () => { const x0 = X(1.0), x1 = X(1.2); roundRect(ctx, x0, y - 16, x1 - x0, 32, 14); shape(ctx, rgba(C.koraal, 0.5), C.koraal, 3); text(ctx, 'tijdens dialyse: 1–1,2', X(1.15), y - 60, fTekst(32, 800), C.koraal, 'center'); });
  if ((o.dialyseVraag || 0) > 0.01) laag(ctx, o.dialyseVraag, () => { kaart(ctx, x + w / 2 - 230, y - 300, 460, 96, 1, C.goud); text(ctx, 'tijdens dialyse?', x + w / 2 - 40, y - 238, fTekst(36, 800), C.goud, 'center'); vraagteken(ctx, x + w / 2 + 170, y - 222, 1, 70); });
  ctx.restore(); }

// ---------- dialysevlies: aminozuren lekken weg ----------
function dialyseVlies(ctx, x, y, w, h, t, u, a = 1) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const mx = x + w / 2;
  roundRect(ctx, x, y, w / 2 - 6, h, 18); shape(ctx, rgba('#C8463C', 0.22), rgba('#C8463C', 0.7), 2); roundRect(ctx, mx + 6, y, w / 2 - 6, h, 18); shape(ctx, rgba(C.teal, 0.2), rgba(C.teal, 0.7), 2);
  ctx.strokeStyle = '#AFC0D0'; ctx.lineWidth = 6; ctx.setLineDash([22, 12]); ctx.beginPath(); ctx.moveTo(mx, y + 10); ctx.lineTo(mx, y + h - 10); ctx.stroke(); ctx.setLineDash([]);
  metaText(ctx, 'BLOED', x + 30, y + 44, '#E08A80', 'left', 28); metaText(ctx, 'DIALYSEVLOEISTOF', mx + 30, y + 44, C.teal, 'left', 28);
  for (let i = 0; i < 4; i++) { const yy = y + 80 + i * (h - 120) / 3; ctx.save(); ctx.beginPath(); ctx.ellipse(x + 90 + (i % 2) * 120, yy, 24, 10, 0.2, 0, 6.283); ctx.fillStyle = '#7A2A30'; ctx.fill(); ctx.restore(); }
  const n = 16; for (let i = 0; i < n; i++) { const f = clamp(u * 1.4 - i / n * 0.6, 0, 1), sx = x + 40 + hash(i * 3.3) * (w / 2 - 110), sy = y + 80 + hash(i * 5.1) * (h - 140), ex = mx + 50 + hash(i * 9.7) * (w / 2 - 110), ey = sy + (hash(i * 2.2) - 0.5) * 60;
    const lek = i % 2 === 0; const k = lek ? ease(f) : 0; const w2 = wander(i, t, 6, 0.6); const ax = lerp(sx, ex, k) + w2.x, ay = lerp(sy, ey, k) + w2.y; aminozuur(ctx, ax, ay, 9, 1); ctx.strokeStyle = lighten(C.koraal, 0.4); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax + 9, ay); ctx.lineTo(ax + 13, ay); ctx.stroke(); aminozuur(ctx, ax + 22, ay, 9, 1); }
  metaText(ctx, 'AMINOZUREN', x + w - 30, y + h - 24, C.koraal, 'right', 28);
  ctx.restore(); }

// ---------- trap: van verrijken naar sonde ----------
const TRAP = [['gewoon eten verrijken', C.oker], ['drinkvoeding', C.oker], ['sondevoeding', C.teal], ['via een ader', C.paars]];
// lit[i] 0..1 = trede licht op; grijs3 0..1 = derde trede grijs met vraagteken
function trap(ctx, x, y, o = {}) { const a = o.a == null ? 1 : o.a; if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const tw = 230, th = 64, lit = o.lit || [];
  TRAP.forEach(([lab, col], i) => { const bx = x + i * tw, by = y - (i + 1) * th, L = lit[i] || 0, G = i === 2 ? (o.grijs3 || 0) : 0;
    roundRect(ctx, bx, by, tw - 8, (i + 1) * th, 10); const fc = G > 0.5 ? rgba(C.fill, 0.4) : L > 0.01 ? rgba(col, 0.2 + 0.4 * L) : rgba(C.fill, 0.45); shape(ctx, fc, G > 0.5 ? C.text2 : L > 0.01 ? col : C.line, L > 0.5 ? 3 : 1.5);
    ctx.font = fTekst(26, 700); ctx.fillStyle = L > 0.5 || G > 0.5 ? C.text : C.text2; ctx.textAlign = 'center'; wrapC(ctx, lab, bx + tw / 2 - 4, by + 40, tw - 34, 30);
    if (G > 0.01) vraagteken(ctx, bx + tw / 2 - 4, by - 26, G, 70); });
  ctx.restore(); }

// ---------- neussonde in een zoomcirkel (schematisch zijaanzicht van hoofd en romp) ----------
function sondeSchema(ctx, cx, cy, r, u = 1, t = 0) { ctx.fillStyle = '#22304A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); const s = r / 200;
  ctx.save(); ctx.translate(cx - 10 * s, cy - 20 * s);
  // profiel: hoofd (kijkt naar rechts), hals, borst
  ctx.beginPath(); ctx.moveTo(-60 * s, -150 * s); ctx.bezierCurveTo(-20 * s, -200 * s, 60 * s, -190 * s, 70 * s, -130 * s); ctx.lineTo(84 * s, -104 * s); ctx.lineTo(72 * s, -96 * s); ctx.lineTo(76 * s, -70 * s); ctx.quadraticCurveTo(60 * s, -50 * s, 40 * s, -52 * s);
  ctx.lineTo(36 * s, -10 * s); ctx.quadraticCurveTo(70 * s, 10 * s, 90 * s, 60 * s); ctx.lineTo(100 * s, 230 * s); ctx.lineTo(-110 * s, 230 * s); ctx.lineTo(-100 * s, 40 * s); ctx.quadraticCurveTo(-60 * s, -10 * s, -40 * s, -30 * s); ctx.quadraticCurveTo(-90 * s, -80 * s, -60 * s, -150 * s); ctx.closePath();
  shape(ctx, rgba('#D9A982', 0.35), '#D9A982', 2);
  // slokdarm en maag
  ctx.strokeStyle = rgba('#D98C80', 0.8); ctx.lineWidth = 14 * s; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10 * s, -60 * s); ctx.lineTo(4 * s, 120 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 120 * s); ctx.bezierCurveTo(60 * s, 100 * s, 90 * s, 150 * s, 70 * s, 190 * s); ctx.bezierCurveTo(40 * s, 220 * s, -10 * s, 200 * s, 0, 120 * s); shape(ctx, '#E39C8A', '#C67D6C', 2);
  // slangetje: neus → keel → slokdarm → maag
  const P = [[80 * s, -88 * s], [56 * s, -92 * s], [30 * s, -84 * s], [14 * s, -60 * s], [8 * s, 0], [4 * s, 110 * s], [28 * s, 160 * s]]; ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5 * s; ctx.beginPath();
  const n = 60, m = Math.round(n * clamp(u, 0, 1)); for (let i = 0; i <= m; i++) { const [px, py] = langs(P, i / n); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.strokeStyle = '#F2F2EE'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(80 * s, -88 * s); ctx.quadraticCurveTo(110 * s, -80 * s, 120 * s, -40 * s); ctx.stroke(); roundRect(ctx, 110 * s, -40 * s, 22 * s, 26 * s, 4 * s); shape(ctx, C.teal, null);
  ctx.restore(); }

// ---------- rollator (zijaanzicht) ----------
function rollator(ctx, x, y, s = 1, kijk = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(kijk * s, s); ctx.strokeStyle = '#8FA0B5'; ctx.lineWidth = 8; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-40, -230); ctx.lineTo(-56, -16); ctx.moveTo(-40, -230); ctx.lineTo(60, -16); ctx.moveTo(-48, -130); ctx.lineTo(10, -130); ctx.stroke();
  ctx.lineWidth = 12; ctx.strokeStyle = '#3A4454'; ctx.beginPath(); ctx.moveTo(-52, -232); ctx.lineTo(-24, -232); ctx.stroke();
  roundRect(ctx, -46, -150, 80, 16, 4); shape(ctx, '#5A6A84', null); for (const wx of [-56, 60]) circ(ctx, wx, -16, 16, '#2A3242', '#5A6478', 3); ctx.restore(); }

// klein hartje (icoon, geen anatomie)
function hart(ctx, x, y, s = 1, col = '#C8463C') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 26); ctx.bezierCurveTo(-40, 0, -34, -30, -14, -30); ctx.bezierCurveTo(-4, -30, 0, -22, 0, -16); ctx.bezierCurveTo(0, -22, 4, -30, 14, -30); ctx.bezierCurveTo(34, -30, 40, 0, 0, 26); ctx.closePath(); shape(ctx, col, lighten(col, 0.3), 1.5); ctx.restore(); }

// twee nieren met wervelkolom (achteraanzicht-schema) in een zoomcirkel; G 0..1 = van roze-rood naar grijs
function nierPaar(ctx, cx, cy, r, G = 0) { ctx.fillStyle = '#3A2A2E'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  for (let i = -4; i <= 4; i++) { roundRect(ctx, cx - r * 0.09, cy + i * r * 0.22 - r * 0.08, r * 0.18, r * 0.16, 4); shape(ctx, '#ECE5D3', '#BDB49E', 1.5); }
  const col = _mixK('#C85A55', '#7A7E88', G), rand = _mixK('#E08A80', '#9AA0AA', G);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(cx + sd * r * 0.42, cy - r * 0.1); ctx.scale(sd, 1); const k = r / 100;
    ctx.beginPath(); ctx.moveTo(0, -48 * k); ctx.bezierCurveTo(40 * k, -50 * k, 42 * k, 50 * k, 0, 50 * k); ctx.bezierCurveTo(-24 * k, 50 * k, -26 * k, 18 * k, -13 * k, 8 * k); ctx.bezierCurveTo(-5 * k, 2 * k, -5 * k, -2 * k, -13 * k, -8 * k); ctx.bezierCurveTo(-26 * k, -18 * k, -24 * k, -48 * k, 0, -48 * k); ctx.closePath(); shape(ctx, col, rand, 2.5);
    ctx.strokeStyle = _mixK('#E0C070', '#9AA0AA', G); ctx.lineWidth = 4 * k; ctx.beginPath(); ctx.moveTo(-14 * k, 4 * k); ctx.quadraticCurveTo(-24 * k, 60 * k, -20 * k, 120 * k); ctx.stroke(); ctx.restore(); } }
// Wat word jij? · Voeding en diëtetiek 4 · Eten als behandeling: de diëtist in het ziekenhuis — scènes per alinea (v1.0, 31 okt 2026).
// Look: Schema met cast (Diëtist Hanneke in het ziekenhuis, Noor, Mevrouw Jansen als patiënt, Erik naamloos als nierpatiënt, Verpleegkundige Jesse, Fysiotherapeut Femke).
// Decor 'ziekenhuis' (ziekenhuiskamer) alleen in H1, het begin van H3 en de kamerscènes van H4; de gang (cold open, recap) en alle uitleg op navy.
// Rode draad: het dienblad uit kamer 12 (MA · DI · WO vol, in de recap leeg).

function kamer(ctx, a = 0.6) { decor(ctx, 'ziekenhuis', a); }
function gang(ctx) { bg(ctx, 'schema'); ctx.save(); ctx.strokeStyle = rgba(C.line, 0.35); ctx.lineWidth = 2; for (const x of [140, 760, 1380]) { roundRect(ctx, x, 250, 300, 612, 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 250, 560); ctx.lineTo(x + 250, 600); ctx.stroke(); } ctx.restore(); vloer(ctx, 862); }
function hanneke(ctx, x, t, o = {}) { const k = o.kijk || -1, r = persoon(ctx, 'hanneke', x, GROND, o.h || 480, { t, kijk: k, uit: o.uit || 'blij', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold }); naamkaartje(ctx, r, k, o.a == null ? 1 : o.a); return r; }
function noor(ctx, x, t, o = {}) { return persoon(ctx, 'noor', x, GROND, o.h || 455, { t, kijk: o.kijk || -1, uit: o.uit || 'blij', pose: o.pose || 'staan', a: o.a == null ? 1 : o.a, hold: o.hold }); }
function schriftje(ctx, x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.2); roundRect(ctx, -26, -34, 52, 68, 4); shape(ctx, '#5B7FA8', '#86A6CC', 1.5); ctx.fillStyle = '#F2EEE4'; ctx.fillRect(-20, -28, 40, 6); ctx.restore(); }
function zoomOpen(ctx, u, fn) { bg(ctx, 'schema'); if (u <= 0.01) return; const R = lerp(0, 1150, ease(u)); ctx.save(); ctx.beginPath(); ctx.arc(960, 520, R, 0, 6.283); ctx.clip(); fn(); ctx.restore();
  if (u < 0.99) { ctx.beginPath(); ctx.arc(960, 520, R, 0, 6.283); ctx.strokeStyle = C.goud; ctx.lineWidth = 3; ctx.stroke(); } }
function opleidingKaart(ctx, x, y, w, niv, naam, meta, a = 1, col = C.groen, hl = null) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; roundRect(ctx, x, y, w, 150, 18); shape(ctx, rgba('#0D1420', 0.88), col, 2); text(ctx, niv, x + 50, y + 88, fTitel(52), col); text(ctx, naam, x + 190, y + 78, fTekst(44, 700), C.text); metaText(ctx, meta, x + 190, y + 120, C.grain, 'left', 28);
  if (hl && hl.a > 0.01) { ctx.save(); ctx.globalAlpha *= hl.a; metaText(ctx, hl.deel, x + 190, y + 120, C.goud, 'left', 28); ctx.restore(); } ctx.restore(); }
// raster van 100 stippen; k gekleurd
function raster100(ctx, x, y, k, col, a = 1, gap = 30, r = 9) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 100; i++) circ(ctx, x + (i % 10) * gap, y + Math.floor(i / 10) * gap, r, i < k ? col : '#3A4458'); ctx.restore(); }

// H2-schema: Jansen staand met de lever in de romp, hersenen in een zoomcirkel naast het hoofd, leverzoom, drie bronnen rechts
const H2 = { px: 380, ph: 640, brein: [800, 215, 95], lever: [800, 600, 120], spier: [1330, 380, 80], vet: [1330, 600, 80], niets: [1330, 800, 60], rest: [1800, 545] };
function h2Basis(ctx, t, o = {}) { const r = persoon(ctx, 'buurvrouw', H2.px, GROND, H2.ph, { t, kijk: 1, uit: o.uit || 'neutraal', outfit: 'ziekenhuis' });
  const RK = rompKijkje(ctx, r, 1, { lever: 1, gloed: o.gloed || 0 });
  const [bx, by, br] = H2.brein; zoomCircle(ctx, bx, by, br, r.hoofd.x + r.hoofd.r * 0.6, r.hoofd.y - r.hoofd.r * 0.2, '', 1, () => { ctx.fillStyle = '#22304A'; ctx.fillRect(bx - br, by - br, 2 * br, 2 * br); ctx.save(); ctx.filter = 'grayscale(0.85) brightness(2.3) sepia(0.25)'; brein(ctx, bx, by + 10, 0.3, 1); ctx.restore(); });
  naamBij(ctx, 'hersenen', '', bx + br + 20, by + 12, 1, 'left');
  const [lx, ly, lr] = H2.lever; zoomCircle(ctx, lx, ly, lr, RK.lever[0], RK.lever[1], '', 1, () => leverBinnen(ctx, lx, ly, lr, o.vol == null ? 1 : o.vol, t));
  naamBij(ctx, 'lever', '', lx - lr * 0.75, ly - lr * 0.85, 1, 'right');
  H2R = r; return { r, RK }; }
let H2R = null;
const GLUC_PAD = () => bocht(H2.lever[0] - 20, H2.lever[1] - H2.lever[2] + 10, H2.brein[0] - 20, H2.brein[1] + H2.brein[2] - 10, 0, 10);
function bron(ctx, k, a, binnen, naam, sub, col) { if (a <= 0.01) return; const [x, y, r] = H2[k]; laag(ctx, a, () => { if (false && H2R && H2R.heup) { const sx = H2R.heup.x + (k === 'spier' ? 40 : 20), sy = H2R.heup.y + (k === 'spier' ? 110 : -40), an = Math.atan2(y - sy, x - sx); ctx.strokeStyle = rgba(C.goud, 0.6); ctx.lineWidth = 1.5; for (const d of [-1, 1]) { const b = an + d * Math.PI / 2; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(x + Math.cos(b) * r, y + Math.sin(b) * r); ctx.stroke(); } } ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.clip(); binnen(x, y, r); ctx.restore(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke(); naamBij(ctx, naam, sub, x + r + 22, y + 12, 1, 'left', col); }); }
function nietsBinnen(x, y, r) { }
function dagenKlok(ctx, uur, a = 1) { laag(ctx, a, () => { klok(ctx, 1700, 200, 70, uur, '', 1, C.goud); metaText(ctx, 'UUR ' + Math.round(uur), 1700, 312, C.goud, 'center', 28); }); }

Object.assign(SCENES, {
  title(ctx, t) { dienblad(ctx, 1460, 520, 1.15, 'KAMER 12', {}); flesje(ctx, 1730, 760, 1.4, 1); },

  // ---------- Cold open: de gang, de kar, drie bladen ----------
  s01(ctx, t, q) { gang(ctx); kar(ctx, 250, 862, 1, 1, 5);
    const tD = q.at('volgende', 1), tE = q.at('daarna', 1), tI = q.at('Iemand', 1) - 0.2, R = ramp(t, tI, 0.8), W = q.on('Waarom', 1, 0.5);
    const blad = (lab, t0, t1) => { const inn = ramp(t, t0, 0.6), uit = t1 ? ramp(t, t1, 0.5) : 0; return { a: inn * (1 - uit), x: lerp(560, 1060, inn) - 300 * uit }; };
    if (R < 0.99) laag(ctx, 1 - R, () => { const b1 = blad('MA', 0, tD - 0.2), b2 = blad('DI', tD, tE - 0.2), b3 = blad('WO', tE, 0);
      dienblad(ctx, b1.x, 470, 1.35, 'KAMER 12 · MA', { a: b1.a }); dienblad(ctx, b2.x, 470, 1.35, 'KAMER 12 · DI', { a: b2.a }); dienblad(ctx, b3.x, 470, 1.35, 'KAMER 12 · WO', { a: b3.a });
      tag(ctx, 'bijna niets gegeten', 1060, 760, C.koraal, q.on('gegeten', 1) * (1 - q.on('daarna', 1)), 'center', 34); });
    laag(ctx, R, () => { ['MA', 'DI', 'WO'].forEach((d, i) => dienblad(ctx, 620 + i * 440, 400 - W * 60, 0.95, 'KAMER 12 · ' + d, {})); metaText(ctx, 'DRIE DAGEN BIJNA NIETS', 1060, 600 - W * 60, C.koraal, 'center', 32); });
    laag(ctx, W, () => { kaart(ctx, 440, 600, 1240, 200, 1, C.goud); text(ctx, 'Een week bijna niets eten:', 490, 680, fTekst(48, 800), C.text, 'left'); text(ctx, 'waarom gevaarlijk?', 490, 750, fTekst(48, 800), C.goud, 'left'); vraagteken(ctx, 1590, 760, 1, 120); }); },

  // ---------- H1 Ondervoed in een ziekenhuisbed ----------
  s03(ctx, t, q) { kamer(ctx); const B = JANSEN_BED, rJ = jansenInBed(ctx, t);
    laag(ctx, 1 - q.on('opname', 1), () => dienblad(ctx, JANSEN_BED.x, 640, 0.75, 'KAMER 12', {}));
    naamBij(ctx, 'Mevrouw Jansen', '72 JAAR', B.x, 240, 1 - q.on('opname', 1), 'center');
    tag(ctx, 'heup gebroken', 640, 300, C.koraal, fase(t, q.at('heup', 1), q.at('opname', 1) + 0.2), 'center', 34);
    const S = q.on('opname', 1, 0.5) * (1 - q.on('Daarom', 1, 0.5)); screening(ctx, 120, 200, { a: S, v1: q.on('afgevallen', 1, 0.3), v2: q.on('trek', 1, 0.3), score: q.on('hoog', 1, 0.4) });
    laag(ctx, q.on('Daarom', 1, 0.4), () => metaText(ctx, 'SCORE 3 → DIËTIST', 140, 160, C.goud, 'left', 30));
    const H = q.on('diëtist', 1, 0.3), N = q.on('stagiair', 1, 0.3);
    if (H > 0.01) { const x = lerp(1720, 1430, ease(clamp((t - q.at('diëtist', 1)) / 1.2, 0, 1))); hanneke(ctx, x, t, { a: H, hold: (c, hx, hy) => klembord(c, hx + 6, hy - 10, 0.9) }); naamBij(ctx, 'Diëtist Hanneke', 'ZIEKENHUIS', x, 330, H, 'center'); }
    if (N > 0.01) { noor(ctx, 1730, t, { a: N, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) }); naamBij(ctx, 'Noor', 'STAGIAIR', 1730, 355, N, 'center'); } },

  s04(ctx, t, q) { kamer(ctx); jansenInBed(ctx, t);
    hanneke(ctx, 1430, t, { kijk: -1, hold: (c, hx, hy) => klembord(c, hx + 6, hy - 10, 0.9) });
    noor(ctx, 1730, t, { kijk: -1, uit: q.on('mager', 1) > 0.5 ? 'denkt' : 'neutraal', pose: q.on('mager', 1) > 0.5 ? 'denk' : 'staan' });
    tag(ctx, 'niet mager', JANSEN_BED.x, 240, C.goud, q.on('mager', 1), 'center', 36);
    laag(ctx, q.on('ondervoed', 1, 0.4), () => { tag(ctx, 'toch ondervoed?', 1640, 330, C.goud, 1, 'center', 36); vraagteken(ctx, 1830, 250, 1, 90); }); },

  s06(ctx, t, q) { const tO = q.at('opname', 1) - 0.3, N = ramp(t, tO, 0.6);
    if (N < 0.99) laag(ctx, 1, () => { kamer(ctx); const rJ = jansenInBed(ctx, t);
      antwoord(ctx, 'antwoord c: ja, ze krijgt te weinig binnen', 1 - q.on('weegt', 1));
      const tW = q.at('weegt', 1), Wg = fase(t, tW - 0.2, q.at('kleine', 1) + 0.4, 0.4);
      hanneke(ctx, lerp(1430, 1330, Wg), t, { kijk: -1, pose: Wg > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1730, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) });
      weegschaal(ctx, 1200, 862, 1.4, Wg, '');
      const L = q.on('onbedoeld', 1) * (1 - q.on('kleine', 1)); laag(ctx, L, () => { kaart(ctx, 120, 200, 760, 150, 1, C.goud); metaText(ctx, 'ONDERVOED:', 150, 252, C.goud, 'left', 28); metaText(ctx, 'ONBEDOELD AFVALLEN, VOORAL SPIER', 150, 292, C.text, 'left', 28); metaA(ctx, '· OOK BIJ OVERGEWICHT', 150, 330, q.on('overgewicht', 1), C.goud, 'left', 28); });
      const R = q.on('trouwring', 1, 0.5), V = q.on('vest', 1, 0.5);
      zoomCircle(ctx, 300, 360, 150, rJ.handL.x, rJ.handL.y, '', R * (1 - N), () => handRing(ctx, 300, 360, 150, t)); tag(ctx, 'ring zit los', 300, 570, C.goud, R * (1 - N), 'center', 30);
      zoomCircle(ctx, 660, 360, 150, rJ.handL.x - 50, rJ.handL.y + 6, '', V * (1 - N), () => mouwRuim(ctx, 660, 360, 150)); tag(ctx, 'vest te ruim', 660, 570, C.goud, V * (1 - N), 'center', 30); });
    laag(ctx, N, () => { bg(ctx, 'schema'); metaText(ctx, 'ONDERVOED BIJ OPNAME · NEDERLAND', 160, 200, C.text2, 'left', 28);
      const rij = (y, lab, k, aa, sub) => laag(ctx, aa, () => { text(ctx, lab, 160, y + 20, fTekst(44, 800), C.text, 'left'); poppetjes(ctx, 760, y - 20, k === 7 ? 7 : 3, 1, 110, C.koraal); metaText(ctx, sub, 760 + (k === 7 ? 7 : 3) * 110 + 30, y + 26, C.koraal, 'left', 30); });
      rij(330, 'alle patiënten', 7, q.on('zeven', 1, 0.5), '± 1 OP 7');
      rij(560, 'afdeling ouderen', 3, q.on('ouderen', 1, 0.5), 'GERIATRIE · ± 1 OP 3');
      metaA(ctx, 'SCREENING · 564.000 PATIËNTEN · NL 2007–2014 · KRUIZENGA E.A. 2016', 160, 800, q.on('patiënten', 1), C.grain, 'left', 28); }); },

  // ---------- H2 Als eten wegvalt ----------
  s07(ctx, t, q) { bg(ctx, 'schema'); const tG = q.at('glycogeen', 1), tN = q.at('nieuwe', 1), tD = q.at('dag', 2);
    const uur = t < tG ? 0 : t < tD ? lerp(0, 18, (t - tG) / (tD - tG)) : lerp(18, 24, (t - tD) / 1.2), vol = 1 - clamp(uur / 24, 0, 0.9);
    h2Basis(ctx, t, { vol, gloed: q.on('lever', 1) * (1 - q.on('lever', 2)) });
    const Q = q.on('Waar', 1, 0.5); dagenKlok(ctx, uur, 1 - Q); metaA(ctx, '0 → 24 → 48', 1700, 350, 1 - Q, C.text2, 'center', 28);
    laag(ctx, q.on('glucose', 1) * (1 - q.on('glycogeen', 1)), () => { glucose(ctx, 1060, 150, 22); naamBij(ctx, 'glucose', 'ELKE DAG NODIG', 1096, 162, 1, 'left', GLUC); });
    stroom(ctx, GLUC_PAD(), t, 4, (x, y) => glucose(ctx, x, y, 13, 1, C.oker), q.on('glycogeen', 1) * (1 - ramp(t, tD + 0.4, 1)), 0.35);
    naamBij(ctx, 'glycogeen', 'VOORRAAD IN DE LEVER', H2.lever[0] - 40, H2.lever[1] + H2.lever[2] + 50, q.on('glycogeen', 1), 'center', C.oker);
    stroom(ctx, GLUC_PAD().map(([x, y]) => [x + 46, y]), t + 0.3, 3, (x, y) => glucose(ctx, x, y, 13), q.on('nieuwe', 1), 0.3);
    metaA(ctx, '+ NIEUWE GLUCOSE', H2.lever[0] + 70, H2.brein[1] + 200, q.on('nieuwe', 1) * (1 - Q), GLUC, 'left', 28);
    metaA(ctx, 'GLYCOGEEN · BIJNA OP NA ± 1 DAG', 1860, 410, ramp(t, tD, 0.6) * (1 - Q), C.oker, 'right', 28);
    bron(ctx, 'spier', Q, (x, y, r) => spierBinnen(ctx, x, y, r, 0, t), 'spier', '', C.koraal);
    bron(ctx, 'vet', Q, (x, y, r) => vetBinnen(ctx, x, y, r), 'vetweefsel', '', VET);
    laag(ctx, Q, () => { const [x, y, r] = H2.niets; ctx.setLineDash([10, 8]); circ(ctx, x, y, r, rgba(C.fill, 0.4), C.text2, 2.5); ctx.setLineDash([]); naamBij(ctx, 'niets', 'LAAG PITJE?', x + r + 22, y + 12, 1, 'left', C.text2);
      for (const k of ['spier', 'vet', 'niets']) { const [x2, y2, r2] = H2[k]; pijl(ctx, x2 - r2 - 10, y2, H2.lever[0] + H2.lever[2] + 20, H2.lever[1] + (y2 - H2.lever[1]) * 0.25, C.line, 0.8, 3, 14); }
      vraagteken(ctx, 1100, 520, 1, 90); }); },

  s09(ctx, t, q) { const tB = q.at('Wie', 1) - 0.3, B = ramp(t, tB, 0.6);
    if (B < 0.99) laag(ctx, 1 - B, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord a: uit eiwit in je spieren', 1);
      const A = q.on('aminozuren', 1, 0.5), Vt = q.on('Vet', 1, 0.5), S = q.on('spiereiwit', 1, 1.2);
      h2Basis(ctx, t, { vol: 0.1 });
      bron(ctx, 'spier', 1, (x, y, r) => spierBinnen(ctx, x, y, r, Math.max(A * 0.5, S), t), 'spier', 'EIWIT → AMINOZUREN', C.koraal);
      bron(ctx, 'vet', 1, (x, y, r) => vetBinnen(ctx, x, y, r), 'vetweefsel', '', VET);
      const sp = bocht(H2.spier[0] - H2.spier[2], H2.spier[1], H2.lever[0] + H2.lever[2], H2.lever[1] - 30, 60);
      padLijn(ctx, sp, C.koraal, A * 0.6, 3); stroom(ctx, sp, t, 6, (x, y) => aminozuur(ctx, x, y, 11), A, 0.3);
      stroom(ctx, GLUC_PAD().map(([x, y]) => [x + 46, y]), t + 0.3, 4, (x, y) => glucose(ctx, x, y, 13), A, 0.3);
      // vet: brede stroom naar de rest van het lichaam (hart en spieren), niet naar de hersenen
      laag(ctx, Vt, () => { const [vx, vy, vr] = H2.vet, [rx, ry] = H2.rest; const x0 = vx + vr * 0.55, y0 = vy - vr * 0.8; ctx.fillStyle = rgba(VET, 0.18); ctx.beginPath(); ctx.moveTo(x0 - 30, y0 + 10); ctx.lineTo(rx - 50, ry - 40); ctx.lineTo(rx - 40, ry + 44); ctx.lineTo(x0 + 40, y0 + 30); ctx.closePath(); ctx.fill();
        stroom(ctx, [[x0 - 10, y0 + 12], [rx - 50, ry - 18]], t, 6, (x, y) => circ(ctx, x, y, 10, VET), 1, 0.4); stroom(ctx, [[x0 + 24, y0 + 26], [rx - 44, ry + 22]], t + 0.4, 6, (x, y) => circ(ctx, x, y, 10, VET), 1, 0.4);
        circ(ctx, rx, ry, 56, rgba(C.fill, 0.6), VET, 2.5); hart(ctx, rx, ry, 0.9); naamBij(ctx, 'hart en spieren', '', rx, ry + 96, 1, 'center', VET);
        metaText(ctx, 'VET: DE MEESTE ENERGIE', 1240, 760, VET, 'left', 28); });
      laag(ctx, q.on('hersenen', 1, 0.5), () => { slotje(ctx, H2.brein[0] + 100, H2.brein[1] + 92, 0.9, 1, VET); metaText(ctx, 'HERSENEN DRAAIEN ER NOG NIET OP', 1240, 800, VET, 'left', 28); });
      laag(ctx, fase(t, q.at('eiwitvoorraad', 1), tB, 0.4), () => filmKaartje(ctx, 1080, 120, 'Wat zit er in je eten?')); });
    laag(ctx, B, () => { bg(ctx, 'schema'); poppetjes(ctx, 180, 420, 6, 6, 90, C.text2); poppetjes(ctx, 180, 560, 6, 6, 90, C.text2); metaText(ctx, '12 GEZONDE OUDEREN', 160, 700, C.text2, 'left', 28);
      const T = q.on('tien', 1, 1.5);
      metaText(ctx, 'DOORSNEDE BOVENBEEN · SCHEMATISCH', 1250, 190, C.text2, 'center', 28);
      dijDoorsnede(ctx, 1000, 500, 170, 1, 1); text(ctx, 'voor', 1000, 750, fTekst(40, 800), C.text, 'center');
      laag(ctx, q.on('tien', 1, 0.5), () => { dijDoorsnede(ctx, 1500, 500, 170, 1 - T, 1); text(ctx, 'na 10 dagen bedrust', 1500, 750, fTekst(40, 800), C.koraal, 'center'); });
      tag(ctx, '± 1 kg beenspier · ouderen', 1250, 835, C.koraal, q.on('kilo', 1), 'center', 34);
      metaA(ctx, 'ONDERZOEK VS · 12 OUDEREN · KORTEBEIN E.A. 2007', 1250, 236, q.on('Amerikaans', 1), C.grain, 'center', 28);
      tag(ctx, 'spieren nauwelijks gebruikt', 420, 330, C.text2, q.on('nauwelijks', 1) * (1 - q.on('Amerikaans', 1)), 'center', 30); }); },

  s10(ctx, t, q) { kamer(ctx); jansenInBed(ctx, t);
    hanneke(ctx, 1430, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => rekenblok(c, hx, hy - 20, 1.1) }); noor(ctx, 1730, t, { kijk: -1 });
    tag(ctx, 'de hele dag in bed', JANSEN_BED.x, 240, C.text2, q.on('ligt', 1), 'center', 32);
    laag(ctx, q.on('eiwit', 1, 0.4), () => { kaart(ctx, 120, 170, 560, 150, 1, C.goud); text(ctx, 'eiwit: minder of meer?', 160, 262, fTekst(40, 800), C.text, 'left'); vraagteken(ctx, 610, 300, 1, 80); }); },

  s12(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: meer, want haar lichaam moet herstellen', 1);
    metaText(ctx, 'EIWIT · GRAM PER KG PER DAG', 160, 222, C.text2, 'left', 28);
    const yb = 780, k = 260, G = q.on('gezond', 1, 0.8), Z = q.on('zieke', 1, 0.8);
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, yb); ctx.lineTo(820, yb); ctx.stroke();
    laag(ctx, 1, () => { const h = 0.8 * k * G; roundRect(ctx, 220, yb - h, 200, h, 10); shape(ctx, rgba(C.groen, 0.4), C.groen, 2.5); laag(ctx, G, () => { text(ctx, '0,8', 320, yb - h - 20, fTekst(44, 800), C.groen, 'center'); metaText(ctx, 'GEZOND', 320, yb + 40, C.groen, 'center', 28); }); });
    laag(ctx, Z, () => { const h1 = 1.2 * k * Z, h2 = 1.5 * k * Z; roundRect(ctx, 540, yb - h1, 200, h1, 10); shape(ctx, rgba(C.koraal, 0.45), C.koraal, 2.5); roundRect(ctx, 540, yb - h2, 200, h2 - h1, 10); ctx.setLineDash([10, 7]); shape(ctx, rgba(C.koraal, 0.12), C.koraal, 2.5); ctx.setLineDash([]);
      text(ctx, '1,2–1,5', 640, yb - h2 - 20, fTekst(44, 800), C.koraal, 'center'); metaText(ctx, 'ZIEK', 640, yb + 40, C.koraal, 'center', 28); });
    tag(ctx, '± 1,5 × zoveel', 860, 470, C.koraal, q.on('anderhalf', 1), 'center', 32);
    metaA(ctx, 'ESPEN 2024 · GEZONDHEIDSRAAD', 160, 860, q.on('zoveel', 1), C.grain, 'left', 28);
    const K = [['wond en bot herstellen', 'herstellen', C.oker], ['afweer', 'afweer', C.teal], ['spier terug', 'eiwitten', C.koraal]];
    K.forEach(([s2, cue, col], i) => { const a = q.on(cue, 1, 0.5), y = 250 + i * 150; if (a <= 0.01) return; kaart(ctx, 980, y, 700, 120, a, col); laag(ctx, a, () => text(ctx, s2, 1020, y + 76, fTekst(42, 800), C.text, 'left')); });
    tag(ctx, '+ ± 1,5 dag langer in het ziekenhuis', 1330, 800, C.koraal, q.on('anderhalve', 1), 'center', 34); },

  // ---------- H3 Als de nieren stoppen ----------
  s13(ctx, t, q) { const tA = q.at('nieren', 1) - 0.4, A = 1 - ramp(t, tA, 0.6), tD = q.at('gewone', 1) - 0.4, D = ramp(t, tD, 0.6), tF = q.at('fosfaat', 2) - 0.3, F = ramp(t, tF, 0.5);
    if (A > 0.01) laag(ctx, A, () => zoomOpen(ctx, clamp(t / 1.3, 0, 1), () => { kamer(ctx);
      const zh = 120; roundRect(ctx, 420, GROND - zh - 20, 560, 34, 10); shape(ctx, '#E6EAEE', '#C4CCD6', 2); roundRect(ctx, 420, GROND - zh + 14, 560, 50, 8); shape(ctx, '#C9D2E0', '#8FA0B5', 2); ctx.fillStyle = '#5A6478'; ctx.fillRect(440, GROND - zh + 64, 14, zh - 70); ctx.fillRect(946, GROND - zh + 64, 14, zh - 70);
      persoon(ctx, 'erik', 700, GROND, 470, { t, pose: 'zit', zitHoogte: zh, kijk: 1, outfit: 'trui', uit: 'neutraal' });
      naamBij(ctx, 'patiënt', '38 JAAR', 700, 330, 1, 'center');
      hanneke(ctx, 1250, t, { kijk: -1, pose: 'vasthouden', hold: (c, hx, hy) => tablet(c, hx, hy - 16, 1, -0.2) }); noor(ctx, 1580, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) }); }));
    if (A > 0.99) return;
    const B = (1 - A) * (1 - D);
    laag(ctx, B, () => { bg(ctx, 'schema'); const r = persoon(ctx, 'erik', 280, GROND, 600, { t, kijk: 1, outfit: 'trui' }); const G = q.on('niet', 1, 1.0);
      const zx = 600, zy = 560, zr = 160; zoomCircle(ctx, zx, zy, zr, r.heup.x + 10, r.heup.y - 70, '', 1, () => nierPaar(ctx, zx, zy, zr, G)); naamBij(ctx, 'nieren', G > 0.5 ? 'WERKEN BIJNA NIET' : 'ACHTER IN DE RUG', zx, zy + zr + 50, 1, 'center', G > 0.5 ? C.text2 : C.text);
      metaA(ctx, 'IN HET BLOED', 850, 320, q.on('bloed', 1), C.text2, 'left', 28);
      const BK = [['UREUM', C.oker, 'ureum'], ['KALIUM', KAL, 'kalium'], ['FOSFAAT', FOS, 'fosfaat'], ['ZOUT', ZOUT, 'zout']];
      BK.forEach(([n, col, cue], i) => bakje(ctx, 920 + i * 200, 640, 140, 220, n, col, 0.75 * q.on(cue, 1, 1.0), q.on('hoopt', 1, 0.4)));
      bakje(ctx, 1740, 640, 140, 220, 'WATER', C.teal, 0, q.on('hoopt', 1, 0.4) * 0.8, { stippel: true });
      laag(ctx, q.on('hoopt', 1), () => filmKaartje(ctx, 850, 140, 'Uitscheiding en evenwicht')); });
    if (D <= 0.01) return;
    laag(ctx, D, () => { bg(ctx, 'schema'); metaText(ctx, 'ZIJN GEWONE DAG', 160, 150, C.text2, 'left', 28);
      const X = [300, 700, 1100, 1500], Y = 330, lab = ['ONTBIJT', 'LUNCH', 'AVOND', 'TUSSENDOOR'];
      ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(160, Y + 100); ctx.lineTo(1760, Y + 100); ctx.stroke();
      X.forEach((x, i) => { bordje(ctx, x, Y, 1); metaText(ctx, lab[i], x, Y + 140, C.text2, 'center', 28); });
      const Z = q.on('Soep', 1, 0.4) * (1 - F), Zc = q.on('chips', 1, 0.4) * (1 - F), Fo = q.on('fosfaat', 2, 0.4);
      eten(ctx, 'boterham', X[0] - 40, Y - 6, 0.9); smeerkaas(ctx, X[0] + 40, Y + 20, 0.9, Fo > 0.5 ? FOS : '#F0E2B0'); banaan(ctx, X[0] + 30, Y - 22, 0.6);
      soepPak(ctx, X[1], Y - 10, 1); aardappels(ctx, X[2] - 40, Y, 1); saus(ctx, X[2] + 10, Y + 24, 0.9); biefstuk(ctx, X[2] + 46, Y - 10, 0.9, Fo > 0.5 ? '#6A88A8' : '#9A5A44'); eten(ctx, 'chips', X[3], Y - 6, 1);
      gloeiRing(ctx, X[1], Y, 120, 70, ZOUT, Z); gloeiRing(ctx, X[3], Y, 120, 70, ZOUT, Zc); metaA(ctx, 'ZOUT', X[1], Y - 90, Z, ZOUT, 'center', 28); metaA(ctx, 'ZOUT', X[3], Y - 90, Zc, ZOUT, 'center', 28);
      gloeiRing(ctx, X[0] + 40, Y + 18, 50, 30, FOS, Fo); gloeiRing(ctx, X[2] + 46, Y - 10, 60, 40, FOS, Fo); metaA(ctx, 'FOSFAAT', X[2] + 46, Y - 90, Fo, FOS, 'center', 28);
      // onderste rij, deel 1: zout, dorst, vocht
      laag(ctx, 1 - F, () => { const S = q.on('zes', 1, 0.5); laag(ctx, S, () => { zoutvaatje(ctx, 260, 660, 1.3); metaText(ctx, '≤ 6 G PER DAG', 340, 640, C.text, 'left', 28); metaText(ctx, 'ZOALS VOOR IEDEREEN', 340, 680, C.text2, 'left', 28); });
        const Do = q.on('dorst', 1, 0.5), Vo = q.on('vocht', 1, 0.5); pijl(ctx, 700, 640, 830, 600, C.line, Do, 3, 14); laag(ctx, Do, () => { glas(ctx, 900, 600, 0.9, 0.5); metaText(ctx, 'DORST', 980, 610, C.teal, 'left', 28); });
        pijl(ctx, 700, 700, 1060, 790, C.line, Vo, 3, 14); bakje(ctx, 1150, 800, 120, 170, 'VOCHT VASTHOUDEN', C.teal, 0.7 * q.on('plast', 1, 1.2), Vo, { stippel: q.on('plast', 1) < 0.5, px: 20 });
        laag(ctx, q.on('drinkadvies', 1, 0.5), () => { kaart(ctx, 1320, 540, 480, 280, 1, C.teal); metaText(ctx, 'DRINKADVIES', 1350, 590, C.teal, 'left', 28); metaText(ctx, 'PERSOONLIJK', 1350, 626, C.text2, 'left', 28); glas(ctx, 1640, 700, 1.0, 0.45, 0.55); metaA(ctx, 'MINDER DRINKEN', 1350, 780, q.on('minder', 1), C.text, 'left', 28); }); });
      // deel 2: fosfaat
      laag(ctx, F, () => { tag(ctx, 'fosfaat ↑', 360, 660, FOS, 1, 'center', 40); metaA(ctx, 'SLECHT VOOR BOTTEN EN BLOEDVATEN', 160, 760, q.on('slecht', 1), FOS, 'left', 28);
        laag(ctx, q.on('fosfaatbinder', 1, 0.5), () => { kaart(ctx, 1080, 560, 720, 200, 1, FOS); pil(ctx, 1180, 660, 1.4); text(ctx, 'fosfaatbinder', 1270, 650, fTekst(42, 800), C.text, 'left'); metaText(ctx, 'BIJ HET ETEN', 1270, 700, FOS, 'left', 28); }); }); }); },

  s14(ctx, t, q) { bg(ctx, 'schema'); tag(ctx, 'kalium ↑', 360, 200, KAL, 1, 'center', 40);
    const items = [[banaan, 480, '#9AA3B2', 1.8], [aardappels, 960, '#9AA3B2', 2.2], [saus, 1440, '#9AA3B2', 2.4]], cues = ['banaan', 'aardappelen', 'tomatensaus'], nm = ['banaan', 'aardappelen', 'tomatensaus'];
    items.forEach(([f, x, col, s], i) => { const a = Math.max(0.35, q.on(cues[i], 1, 0.4)); laag(ctx, a, () => { circ(ctx, x, 500, 160, rgba(C.fill, 0.5), C.line, 2); f(ctx, x, 500, s, col); naamBij(ctx, nm[i], 'ELKE DAG', x, 720, 1, 'center'); }); });
    laag(ctx, q.on('raadt', 1, 0.4), () => { tag(ctx, 'wat raadt de diëtist aan?', 960, 830, C.goud, 1, 'center', 34); vraagteken(ctx, 1720, 560, 1, 120); }); },

  s16(ctx, t, q) { bg(ctx, 'schema'); const tP = q.at('Aardappelen', 1) - 0.3, P = ramp(t, tP, 0.6);
    antwoord(ctx, 'antwoord a: minder vaak, en andere soorten kiezen', 1);
    const K = q.on('kalium', 1, 0.8);
    laag(ctx, 1 - P, () => { const items = [[banaan, 480, 1.8], [aardappels, 960, 2.2], [saus, 1440, 2.4]];
      items.forEach(([f, x, s]) => { circ(ctx, x, 420, 150, rgba(C.fill, 0.5), K > 0.5 ? KAL : C.line, K > 0.5 ? 3 : 2); f(ctx, x, 420, s, _mixK('#9AA3B2', KAL, K)); });
      metaA(ctx, 'VEEL KALIUM', 960, 630, K, KAL, 'center', 30);
      const Hh = q.on('hart', 1, 0.5); laag(ctx, Hh, () => { kaart(ctx, 260, 670, 1000, 170, 1, KAL); hartslag(ctx, 300, 760, 560, 40, t, 1, KAL, 1); text(ctx, 'te veel kalium:', 900, 744, fTekst(36, 800), C.text, 'left'); text(ctx, 'hartritme', 900, 794, fTekst(36, 800), KAL, 'left'); });
      tag(ctx, 'wel groente en fruit · soorten met minder kalium', 960, 220, C.groen, q.on('soorten', 1), 'center', 30);
      laag(ctx, q.on('soorten', 1), () => tag(ctx, 'minder vaak', 1520, 760, C.groen, 1, 'center', 32)); });
    laag(ctx, P, () => { pan(ctx, 860, 520, 1.6, q.on('gooit', 1, 1.0), t); kaart(ctx, 1240, 360, 560, 220, 1, C.teal); text(ctx, 'in ruim water koken', 1280, 440, fTekst(40, 800), C.text, 'left'); metaA(ctx, 'KOOKVOCHT WEG', 1280, 510, q.on('weg', 1), C.teal, 'left', 28); }); },

  s17(ctx, t, q) { bg(ctx, 'schema'); const tN = q.at('Daarom', 1) - 0.3, N = ramp(t, tN, 0.6);
    laag(ctx, 1, () => { biefstuk(ctx, 260, 280 - 60 * N, 1.4); naamBij(ctx, 'eiwit', '', 260, 380 - 60 * N, 1 - N, 'center', C.oker);
      const U = q.on('ureum', 1, 0.5); pijl(ctx, 360, 280 - 60 * N, 520, 280 - 60 * N, C.line, U, 3, 14); bakje(ctx, 620, 360 - 60 * N, 130, 180, 'UREUM', C.oker, 0.7, U, { slot: q.on('kwijt', 1) });
      metaA(ctx, 'RAAKT HIJ NIET KWIJT', 720, 270 - 60 * N, q.on('kwijt', 1) * (1 - N), C.oker, 'left', 28); });
    eiwitSchuif(ctx, 260, 620, 1400, { a: N, gezond: q.on('lichaam', 2, 0.5), voor: q.on('nodig', 1, 0.5), meesten: q.on('meeste', 1, 0.5), dialyseVraag: q.on('dialyse', 1, 0.5) });
    metaA(ctx, 'NIERSTICHTING · NFN/NIV-RICHTLIJN', 260, 850, N, C.grain, 'left', 28);
    laag(ctx, q.on('dialyse', 1, 0.4), () => tag(ctx, 'volgende week: dialyse', 1400, 230, C.teal, 1, 'center', 32)); },

  s19(ctx, t, q) { bg(ctx, 'schema'); antwoord(ctx, 'antwoord c: meer eiwit', 1);
    const A = q.on('aminozuren', 1, 2.0); dialyseVlies(ctx, 160, 210, 1000, 340, t, A, 1);
    laag(ctx, q.on('twaalf', 1, 0.5), () => { kaart(ctx, 1240, 230, 560, 200, 1, C.koraal); metaText(ctx, 'HEMODIALYSE', 1270, 278, C.text2, 'left', 28); text(ctx, '± 12 g per keer', 1270, 350, fTekst(48, 800), C.koraal, 'left'); metaText(ctx, 'MAASTRICHT UMC+ · 2020', 1270, 404, C.grain, 'left', 28); });
    tag(ctx, 'anders: spier afbreken', 1520, 500, C.koraal, q.on('spier', 1), 'center', 30);
    const O = q.on('omhoog', 1, 0.8);
    eiwitSchuif(ctx, 260, 760, 1300, { gezond: 1, voor: 1 - O, dialyse: O, a: 1 }); },

  // ---------- H4 Samen met het team ----------
  s20(ctx, t, q) { const tF = q.at('fysiotherapeut', 1) - 0.3, tZ = q.at('Zulke', 1) - 0.3, tP = q.at('Maar', 1) - 0.3;
    const A = 1 - ramp(t, tF, 0.5), Fy = ramp(t, tF, 0.5) * (1 - ramp(t, tZ, 0.5)), Z = ramp(t, tZ, 0.5) * (1 - ramp(t, tP, 0.5)), P = ramp(t, tP, 0.5);
    const Pl = ramp(t, q.at('verrijkt', 1) - 0.4, 0.5);
    if (A > 0.01 && Pl < 0.99) laag(ctx, A * (1 - Pl), () => { kamer(ctx); jansenInBed(ctx, t);
      hanneke(ctx, 1430, t, { kijk: -1, pose: q.on('plan', 1) > 0.5 ? 'wijs' : 'staan' }); noor(ctx, 1730, t, { kijk: -1, hold: (c, hx, hy) => schriftje(c, hx, hy - 6) });
      tag(ctx, 'het plan', 640, 260, C.goud, q.on('plan', 1), 'center', 40); });
    if (A > 0.01 && Pl > 0.01) laag(ctx, A * Pl, () => { bg(ctx, 'schema'); const sip = fase(t, q.at('drinkvoeding', 1) + 0.6, q.at('energie', 1) + 1.0, 0.4);
      metaText(ctx, 'HET PLAN', 120, 160, C.goud, 'left', 30);
      const lit = [q.on('verrijkt', 1, 0.5), q.on('drinkvoeding', 1, 0.5)]; trapK(ctx, 100, 840, 270, lit, 1, 0, 34);
      const chips = [['volle yoghurt', 'yoghurt'], ['extra beleg', 'beleg'], ['eiwitrijk tussendoortje', 'tussendoortje']];
      chips.forEach(([s2, cue], i) => tag(ctx, s2, 330, 330 + i * 70, C.oker, q.on(cue, 1, 0.4), 'center', 32));
      metaA(ctx, 'NA HEUPOPERATIE: METEEN DRINKVOEDING', 120, 210, q.on('meteen', 1), C.grain, 'left', 28);
      inBed(ctx, 'buurvrouw', 1500, 860, 0.8, { t, outfit: 'ziekenhuis', deken: '#9FB7C9', uit: sip > 0.6 && t > q.at('energie', 1) - 0.4 ? 'bezorgd' : 'neutraal', hold: (c, hx, hy) => flesje(c, hx, hy - 30 - 20 * sip, 0.9, q.on('drinkvoeding', 1, 0.4)) });
      tag(ctx, 'veel eiwit en energie', 1500, 240, C.oker, q.on('energie', 1), 'center', 32); });
    if (Fy > 0.01) laag(ctx, Fy, () => { gang(ctx); const t0 = tF, h = 430, tt = Math.max(0, t - t0);
      const xJ = 380 + gangSnelheid('buurvrouw', h, 'loop', 0.55) * tt, xF = 280 + gangSnelheid('femke', 470, 'loop', 0.48) * tt; persoon(ctx, 'femke', xF, GROND - 6, 470, { zij: true, kijk: 1, gang: 'loop', tempo: 0.48, t: tt + 0.35 });
      rollator(ctx, xJ + 120, GROND + 2, 0.95, 1); persoon(ctx, 'buurvrouw', xJ, GROND, h, { zij: true, kijk: 1, gang: 'loop', tempo: 0.55, t: tt, outfit: 'ziekenhuis', arm: [0.9, 0.5], armVer: [0.9, 0.5] });
      naamBij(ctx, 'Fysiotherapeut Femke', '', xF, 330, 1, 'center');
      tag(ctx, 'bewegen houdt spieren vast', 1300, 260, C.groen, q.on('bewegen', 1), 'center', 36); });
    if (Z > 0.01) laag(ctx, Z, () => { bg(ctx, 'schema'); metaText(ctx, 'OVERLEDEN BINNEN 30 DAGEN · VAN DE 100', 160, 200, C.text2, 'left', 28);
      const M = q.on('zeven', 1, 0.8), Zo = q.on('tien', 1, 0.8);
      raster100(ctx, 220, 300, Math.round(7 * M), C.koraal, 1); text(ctx, 'met voedingsplan', 220, 640, fTekst(40, 800), C.groen, 'left'); laag(ctx, M, () => text(ctx, '7', 355, 710, fTekst(60, 800), C.koraal, 'center'));
      raster100(ctx, 820, 300, Math.round(10 * Zo), C.koraal, 1); text(ctx, 'zonder', 820, 640, fTekst(40, 800), C.text2, 'left'); laag(ctx, Zo, () => text(ctx, '10', 955, 710, fTekst(60, 800), C.koraal, 'center'));
      laag(ctx, q.on('vooral', 1, 0.5), () => { kaart(ctx, 1300, 300, 520, 290, 1, C.oker); metaText(ctx, 'VOORAL DOOR', 1330, 348, C.oker, 'left', 28); boterhamBord(ctx, 1450, 460, 0.9, 0); flesje(ctx, 1660, 460, 1.2, 1); metaText(ctx, 'VERRIJKT + DRINKVOEDING', 1330, 560, C.text, 'left', 28); });
      metaA(ctx, 'ZWITSERS ONDERZOEK · ± 2000 PATIËNTEN · GEEN OPERATIE · SCHUETZ E.A. 2019', 160, 800, q.on('Zwitsers', 1), C.grain, 'left', 28); });
    if (P > 0.01) laag(ctx, P, () => { kamer(ctx); jansenInBed(ctx, t, { hold: (c, hx, hy) => flesje(c, hx + 40, hy - 30, 0.9, 1) }); const J = q.on('verpleegkundige', 1, 0.3);
      tag(ctx, 'een plan op papier ≠ eten in je buik', 960, 170, C.goud, q.on('papier', 1), 'center', 32);
      if (J > 0.01) { persoon(ctx, 'jesse', 560, GROND, 490, { t, kijk: 1, a: J, outfit: 'werk', pose: 'vasthouden', hold: (c, hx, hy) => klembord(c, hx + 4, hy - 12, 1) }); naamBij(ctx, 'Verpleegkundige Jesse', '', 560, 320, J, 'center');
        laag(ctx, J, () => { kaart(ctx, 1440, 300, 400, 320, 1, C.teal); metaText(ctx, 'WAT AT ZE?', 1470, 350, C.teal, 'left', 28); ['ontbijt', 'lunch', 'avond', 'tussendoor'].forEach((s2, i) => { text(ctx, s2, 1470, 410 + i * 50, fTekst(30, 600), C.text, 'left'); ctx.fillStyle = rgba(C.oker, 0.7); ctx.fillRect(1650, 390 + i * 50, [60, 40, 70, 30][i], 22); });
          ctx.beginPath(); ctx.ellipse(1600, 700, 70, 20, 0, 0, 6.283); shape(ctx, '#E6E2DA', '#FFFFFF', 1.5); eten(ctx, 'koekje', 1600, 688, 0.9); metaText(ctx, 'TUSSENDOORTJE', 1600, 760, C.oker, 'center', 28); }); } }); },

  s21(ctx, t, q) { bg(ctx, 'schema'); const St = q.on('stelt', 1, 0.5); hanneke(ctx, 190, t, { kijk: 1, h: 440, pose: 'vasthouden', hold: (c, hx, hy) => tablet(c, hx, hy - 16, 0.9, 0.2) });
    const x0 = 520, yb = 700, w = 96, Hn = 380, dx = 128, D = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'], v = [0.30, 0.36, 0.40, 0.34, 0.42, 0.38, 0.44];
    metaText(ctx, 'WAT ZE ETEN EN DRINKEN · 1 WEEK', x0, 220, C.text2, 'left', 28);
    ctx.setLineDash([12, 9]); ctx.strokeStyle = C.groen; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0 - 20, yb - Hn); ctx.lineTo(x0 + 7 * dx, yb - Hn); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'WAT ZE NODIG HEEFT', x0 + 7 * dx + 20, yb - Hn + 10, C.groen, 'left', 28);
    ctx.strokeStyle = rgba(C.groen, 0.5); ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.moveTo(x0 - 20, yb - Hn / 2); ctx.lineTo(x0 + 7 * dx, yb - Hn / 2); ctx.stroke(); ctx.setLineDash([]); metaText(ctx, 'HELFT', x0 + 7 * dx + 20, yb - Hn / 2 + 10, rgba(C.groen, 0.8), 'left', 28);
    D.forEach((d, i) => { const u = ramp(t, 0.2 + i * 0.25, 0.5), h = Hn * v[i] * u, x = x0 + i * dx; roundRect(ctx, x, yb - h, w, Math.max(h, 1), 8); shape(ctx, rgba(C.oker, 0.5), C.oker, 2); metaText(ctx, d, x + w / 2, yb + 38, C.text2, 'center', 28); });
    tag(ctx, '< 1/2 · na 1 week', 1010, 820, C.koraal, q.on('helft', 1) * (1 - St), 'center', 34);
    laag(ctx, St, () => { bg(ctx, 'schema'); tag(ctx, '< 1/2 · na 1 week', 960, 220, C.koraal, 1, 'center', 34); trapK(ctx, 400, 800, 280, [1, 1], 1, 1, 36); }); },

  s23(ctx, t, q) { const tS = q.at('slangetje', 1) - 0.4, S = ramp(t, tS, 0.6);
    if (S < 0.99) laag(ctx, 1 - S, () => { bg(ctx, 'schema'); antwoord(ctx, 'antwoord b: sondevoeding erbij', 1); trapK(ctx, 400, 800, 280, [1, 1, q.on('Sondevoeding', 1, 0.6)], 1, 0, 36);
      tag(ctx, 'niet pas aan het eind', 1240, 300, C.teal, q.on('eind', 1), 'center', 34); });
    laag(ctx, S, () => { kamer(ctx); const rJ = jansenInBed(ctx, t); flesje(ctx, 160, 760, 1.2, 1);
      dienblad(ctx, 1600, 730, 0.5, 'KAMER 12', { a: q.on('eten', 1, 0.5) }); metaA(ctx, 'GEWOON DOOR ETEN', 1600, 850, q.on('eten', 1) * (1 - q.on('diëtist', 1)), C.oker, 'center', 28);
      const zx = 470, zy = 360, zr = 180; zoomCircle(ctx, zx, zy, zr, rJ.hoofd.x - rJ.hoofd.r * 1.25, rJ.hoofd.y + rJ.hoofd.r * 0.3, '', 1, () => sondeSchema(ctx, zx, zy, zr, q.on('maag', 1, 1.5), t)); tag(ctx, 'neussonde · vaak tijdelijk', zx, zy + zr + 60, C.teal, 1, 'center', 30);
      const R = [['diëtist: hoeveel', 'rekent', C.goud], ['arts en verpleegkundige: uitvoeren', 'arts', C.teal], ['patiënt: beslist mee', 'beslist', C.groen]];
      R.forEach(([s2, cue, col], i) => { const a = q.on(cue, 1, 0.4), y = 300 + i * 120; kaart(ctx, 1380, y, 480, 104, a, col); laag(ctx, a, () => { ctx.font = fTekst(30, 800); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrapC(ctx, s2, 1404, y + 42, 440, 34); }); }); }); },

  // ---------- Recap ----------
  s24(ctx, t, q) { const tK = q.at('glycogeen', 1) - 0.3, K = ramp(t, tK, 0.6);
    if (K < 0.99) laag(ctx, 1 - K, () => { gang(ctx); kar(ctx, 220, 862, 0.9, 1, 4);
      ['MA', 'DI', 'WO'].forEach((d, i) => dienblad(ctx, 520 + i * 370, 250, 0.72, 'KAMER 12 · ' + d, {}));
      dienblad(ctx, 1660, 250, 0.72, 'KAMER 12', { leeg: 1 }); metaText(ctx, 'NU', 1660, 400, C.groen, 'center', 28);
      hanneke(ctx, 1500, t, { kijk: 1, h: 400 }); noor(ctx, 1790, t, { kijk: -1, h: 385, uit: 'lacht' }); });
    laag(ctx, K, () => { bg(ctx, 'schema'); const C4 = [['zonder eten', 'spier wordt glucose', C.koraal, 'glycogeen'], ['herkennen', 'ook zonder mager te zijn', C.goud, 'ziet'], ['nieren', 'zout, kalium, fosfaat · soms vocht · eiwit vóór en tijdens dialyse anders', KAL, 'nierfalen']];
      C4.forEach(([k, s2, col, cue], i) => { const a = q.on(cue, 1, 0.5), x = 160 + (i % 2) * 820, y = 170 + Math.floor(i / 2) * 330; if (a <= 0.01) return; kaart(ctx, x, y, 780, 290, a, col);
        laag(ctx, a, () => { text(ctx, k, x + 36, y + 80, fTekst(46, 800), col, 'left'); ctx.font = fTekst(34, 600); ctx.fillStyle = C.text; ctx.textAlign = 'left'; wrapC(ctx, s2, x + 36, y + 150, 700, 42); }); });
      laag(ctx, q.on('trager', 1) * (1 - q.on('nierfalen', 1)), () => tag(ctx, 'in bed en bij ziekte: sneller spierverlies', 960, 830, C.koraal, 1, 'center', 30)); }); },

  s25(ctx, t, q) { bg(ctx, 'schema'); roundRect(ctx, 120, 150, 760, 100, 16); shape(ctx, rgba('#0D1420', 0.85), null); regel(ctx, 'Diëtist: waar leer je dit?', 150, 220, 1, C.text, 52, 'left', 700);
    stempel(ctx, 1140, 200, 'BESCHERMDE TITEL', C.goud, q.on('beschermde', 1));
    opleidingKaart(ctx, 120, 300, 1180, 'hbo', 'Voeding en Diëtetiek', 'HAN · NIJMEGEN · 4 JAAR', q.on('diploma', 1), C.groen, { deel: 'HAN · NIJMEGEN', a: q.on('HAN', 1, 0.4) });
    tag(ctx, 'dan mag je je diëtist noemen', 710, 500, C.groen, q.on('noemen', 1), 'center', 30);
    opleidingKaart(ctx, 120, 560, 1180, 'wo', 'Voeding en Gezondheid', 'WAGENINGEN · 3 JAAR', q.on('Wageningen', 1), C.teal);
    tag(ctx, 'geen diëtist · na een master bv. onderzoeker', 710, 770, C.teal, q.on('geen', 1), 'center', 30);
    hanneke(ctx, 1620, t, { kijk: -1, h: 500 }); }
});

// trap met eigen tredebreedte
function trapK(ctx, x, y, tw, lit = [], a = 1, grijs3 = 0, fs = 0) { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const th = tw * 0.5, fp = fs || Math.max(19, Math.round(tw * 0.125));
  TRAP.forEach(([lab, col], i) => { const bx = x + i * tw, by = y - (i + 1) * th, L = lit[i] || 0, G = i === 2 ? grijs3 : 0;
    roundRect(ctx, bx, by, tw - 8, (i + 1) * th, 10); shape(ctx, G > 0.5 ? rgba(C.fill, 0.3) : L > 0.01 ? rgba(col, 0.15 + 0.4 * L) : rgba(C.fill, 0.45), L > 0.5 ? col : G > 0.5 ? C.text2 : C.line, L > 0.5 ? 3 : 1.5);
    ctx.font = fTekst(fp, 700); ctx.fillStyle = L > 0.5 ? C.text : C.text2; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; wrapC(ctx, lab, bx + tw / 2 - 4, by + fp + 12, tw - 26, fp + 4);
    if (G > 0.01) vraagteken(ctx, bx + tw / 2 - 4, by + th * 0.5 + fp * 2 + 30, G, Math.round(tw * 0.4)); });
  ctx.restore(); }
