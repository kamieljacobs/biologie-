// node frames3.js : render style frames for film 3 via a harness page
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
const lib=fs.readFileSync('src/lib.js','utf8')+'\n'+fs.readFileSync('src/dnalib.js','utf8'); const sc=fs.readFileSync('src/scenes5.js','utf8');
const fonts=['001.woff2:Fraunces:700','002.woff2:Source Sans 3:400','003.woff2:Source Sans 3:600','004.woff2:Source Sans 3:700','005.woff2:IBM Plex Mono:500'].map(x=>{const [f,fam,w]=x.split(':');return `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync('fonts/'+f).toString('base64')}) format("woff2")}`;}).join('\n');
const html=`<!doctype html><meta charset=utf8><style>${fonts} body{margin:0;background:#000}</style><canvas id=c width=1920 height=1080></canvas>
<script>${lib}</script><script>${sc}</script><script>
const ctx=document.getElementById('c').getContext('2d');
function cap(s){ ctx.font=fTekst(44,700); const w=ctx.measureText(s).width; roundRect(ctx,W/2-w/2-32,H-24-80,w+64,80,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill(); text(ctx,s,W/2,H-24-80+52,fTekst(44,700),C.text,'center'); }
window.frame=(name,li,lf,t,caption,vwo,meta)=>{ ctx.clearRect(0,0,W,H); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); SCENES[name](ctx,li,lf,t); ctx.restore();
  if(vwo){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); } else metaText(ctx,'havo · vwo · dna 5/8',60,46,C.text2,'left',24);
  if(caption) cap(caption); return document.getElementById('c').toDataURL('image/png'); };
</script>`;
fs.writeFileSync('afl5/harness.html',html);
const shots=[['open',3,0.9,3,'In Nederland krijgen elk jaar bijna 75 000 mensen huidkanker.',0,'f_open'],
 ['h1a',3,0.9,3,'Dat dringt je huid in, tot in de kern van je huidcellen.',0,'f_h1a'],
 ['h1b',0,0.9,3,'UV-licht plakt twee basen aan elkaar. Meestal twee T\u2019s.',0,'f_h1b0'],
 ['h1b',2,0.5,3,'Herstelenzymen knippen het beschadigde stuk eruit.',0,'f_h1b2'],
 ['h1b',3,0.8,3,'Cellen met te veel schade ruimen zichzelf op.',0,'f_h1b3'],
 ['h1b',5,0.9,3,'Tegenover de vastgeplakte basen zet de polymerase soms een verkeerde base.',0,'f_h1b5'],
 ['h1b',6,0.9,3,'Nu is het een mutatie. Elke dochtercel krijgt hem mee.',0,'f_h1b6'],
 ['h1c',3,0.9,3,'Een mutatie ontstaat toevallig.',0,'f_h1c'],
 ['h2a',4,0.9,3,'Wat dat met het eiwit doet, zoek je op in de codontabel.',0,'f_h2a'],
 ['h2b',1,0.9,3,'G A G: glutaminezuur, een ander aminozuur.',0,'f_h2b'],
 ['h2c',2,0.9,3,'Vanaf de deletie klopt geen enkel codon meer.',0,'f_h2c'],
 ['h2c',3,0.9,3,'Haal je er precies drie weg, dan valt er alleen één aminozuur af.',0,'f_h2c3'],
 ['h2v',2,0.9,3,'In een promotor verandert hoeveel mRNA er wordt gemaakt.',1,'f_h2v'],
 ['h3a',1,0.9,3,'Op één plek zit glutamine, waar histidine hoort.',0,'f_h3a'],
 ['h3b',0,0.9,3,'Eén basenpaar anders in het DNA, één base anders in het mRNA.',0,'f_h3b0'],
 ['h3b',2,0.9,3,'Histidine is C A U of C A C. Glutamine is C A A of C A G.',0,'f_h3b'],
 ['h3c',3,0.9,3,'En de patiënt krijgt leverklachten: organismeniveau.',0,'f_h3c'],
 ['h4a',0,0.9,3,'Bij de meiose kunnen twee chromosomen van een paar bij elkaar blijven.',0,'f_h4a0'],
 ['h4a',2,0.9,3,'Die mutatie zat in een geslachtscel. Daarom zit hij in elke cel.',0,'f_h4a2'],
 ['h4v1',0,0.9,3,'Dat heet een chromosoommutatie.',1,'f_h4v1'],
 ['h4b',1,0.9,3,'Ze zit nu in een plukje huid.',0,'f_h4b'],
 ['h4c',2,0.9,3,'Een mutatie in een huidcel blijft bij jou.',0,'f_h4c'],
 ['h4d',0,0.9,3,'Maar bij jou blijven ze zitten. En elke zomer komen er bij.',0,'f_h4d0'],
 ['h4d',4,0.9,3,'Zo ontstaat een klomp cellen: een tumor.',0,'f_h4d4'],
 ['h4v',2,0.9,3,'Daar moeten beide allelen uitvallen voordat de rem weg is.',1,'f_h4v2'],
 ['h4v',4,0.9,3,'Ergens in je miljarden cellen valt het tweede vroeg of laat ook uit.',1,'f_h4v4'],
 ['recap',4,0.9,3,'Smeren is geen betutteling. Het is DNA-bescherming.',0,'f_recap'],
 ['recap2',0,0.9,3,'Hoe een cel kiest welke genen ze gebruikt: aflevering zes.',0,'f_recap2']];
(async()=>{ const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/dnaC/afl5/harness.html'); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,300));
 for(const [n,li,lf,t,c,v,out] of shots){ const u=await p.evaluate((n,li,lf,t,c,v)=>frame(n,li,lf,t,c,v),n,li,lf,t,c,v); fs.writeFileSync('afl5/'+out+'.png',Buffer.from(u.split(',')[1],'base64')); }
 console.log(errs.join('\n')||'no errors'); await b.close(); })();
