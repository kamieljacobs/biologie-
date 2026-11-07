// node frames3.js : render style frames for film 3 via a harness page
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
const lib=fs.readFileSync('src/lib.js','utf8')+'\n'+fs.readFileSync('src/dnalib.js','utf8'); const sc=fs.readFileSync('src/scenes4.js','utf8');
const fonts=['001.woff2:Fraunces:700','002.woff2:Source Sans 3:400','003.woff2:Source Sans 3:600','004.woff2:Source Sans 3:700','005.woff2:IBM Plex Mono:500'].map(x=>{const [f,fam,w]=x.split(':');return `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync('fonts/'+f).toString('base64')}) format("woff2")}`;}).join('\n');
const html=`<!doctype html><meta charset=utf8><style>${fonts} body{margin:0;background:#000}</style><canvas id=c width=1920 height=1080></canvas>
<script>${lib}</script><script>${sc}</script><script>
const ctx=document.getElementById('c').getContext('2d');
function cap(s){ ctx.font=fTekst(44,700); const w=ctx.measureText(s).width; roundRect(ctx,W/2-w/2-32,H-24-80,w+64,80,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill(); text(ctx,s,W/2,H-24-80+52,fTekst(44,700),C.text,'center'); }
window.frame=(name,li,lf,t,caption,vwo,meta)=>{ ctx.clearRect(0,0,W,H); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); SCENES[name](ctx,li,lf,t); ctx.restore();
  if(vwo){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); } else metaText(ctx,'havo · vwo · dna 4/8',60,46,C.text2,'left',24);
  if(caption) cap(caption); return document.getElementById('c').toDataURL('image/png'); };
</script>`;
fs.writeFileSync('afl4/harness.html',html);
const shots=[['open',3,0.9,3,'De bacterie maakt daarmee dezelfde keten van aminozuren als jouw alvleesklier.',0,'afl4_stijlframe_1_opening'],
 ['h1b',4,0.9,3,'Aan de andere kant draagt het tRNA één soort aminozuur.',0,'afl4_stijlframe_2_trna'],
 ['h1b',8,0.85,3,'Het ribosoom koppelt het aminozuur aan de keten. Het lege tRNA laat los.',0,'afl4_stijlframe_3_werktuig'],
 ['h2a',3,0.9,3,'Neem het codon G U G. Eerste base G, tweede base U, derde base G.',0,'afl4_stijlframe_4_codontabel'],
 ['h4b',3,0.9,3,'In beide gevallen is de tweede base veranderd: een U werd een A.',0,'afl4_stijlframe_5_terugredeneren']];
(async()=>{ const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/dnaC/afl4/harness.html'); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,300));
 for(const [n,li,lf,t,c,v,out] of shots){ const u=await p.evaluate((n,li,lf,t,c,v)=>frame(n,li,lf,t,c,v),n,li,lf,t,c,v); fs.writeFileSync('afl4/'+out+'.png',Buffer.from(u.split(',')[1],'base64')); }
 console.log(errs.join('\n')||'no errors'); await b.close(); })();
