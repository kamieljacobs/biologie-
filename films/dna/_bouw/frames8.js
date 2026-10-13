// node frames3.js : render style frames for film 3 via a harness page
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
const lib=fs.readFileSync('src/lib.js','utf8')+'\n'+fs.readFileSync('src/dnalib.js','utf8'); const sc=fs.readFileSync('src/scenes8.js','utf8');
const fonts=['001.woff2:Fraunces:700','002.woff2:Source Sans 3:400','003.woff2:Source Sans 3:600','004.woff2:Source Sans 3:700','005.woff2:IBM Plex Mono:500'].map(x=>{const [f,fam,w]=x.split(':');return `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync('fonts/'+f).toString('base64')}) format("woff2")}`;}).join('\n');
const html=`<!doctype html><meta charset=utf8><style>${fonts} body{margin:0;background:#000}</style><canvas id=c width=1920 height=1080></canvas>
<script>${lib}</script><script>${sc}</script><script>
const ctx=document.getElementById('c').getContext('2d');
function cap(s){ ctx.font=fTekst(44,700); const w=ctx.measureText(s).width; roundRect(ctx,W/2-w/2-32,H-24-80,w+64,80,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill(); text(ctx,s,W/2,H-24-80+52,fTekst(44,700),C.text,'center'); }
window.frame=(name,li,lf,t,caption,vwo,meta)=>{ ctx.clearRect(0,0,W,H); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); SCENES[name](ctx,li,lf,t); ctx.restore();
  if(vwo){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); } else metaText(ctx,'havo · vwo · dna 8/8',60,46,C.text2,'left',24);
  if(caption) cap(caption); return document.getElementById('c').toDataURL('image/png'); };
</script>`;
fs.writeFileSync('afl8/harness.html',html);
const shots=[['open',0,0.9,3,'Deze laatste gaat over jou.',0,'f_open0'],
 ['open',1,0.95,3,'Een doosje van internet. Een test bij de dokter. Een telefoontje van een tante.',0,'f_open1'],
 ['open',3,0.9,3,'Geen vwo-blokken deze keer: alles is voor iedereen.',0,'f_open3'],
 ['h1a',1,0.95,3,'Waar je voorouders vandaan komen. Of je koriander naar zeep vindt smaken.',0,'f_h1a1'],
 ['h1a',2,0.9,3,'Een paar honderdduizend plekken waar mensen verschillen.',0,'f_h1a2'],
 ['h1a',3,0.95,3,'Bij een ander bedrijf komt er soms een ander percentage uit.',0,'f_h1a3'],
 ['h1a',4,0.9,3,'Lactose hangt bijna helemaal van één plek af. Koriander maar voor een deel.',0,'f_h1a4'],
 ['h1a',5,0.95,3,'Honderden varianten een kleine rol, en je leefstijl een grote.',0,'f_h1a5'],
 ['h1b',1,0.95,3,'Gewicht, eten en bewegen wegen zwaarder dan de varianten die de chip leest.',0,'f_h1b1'],
 ['h1b',4,0.9,3,'En in sommige landen zoekt de politie erin.',0,'f_h1b4'],
 ['h1b',5,0.9,3,'Dan ligt een deel van je broer, je moeder en je nichtje mee op tafel.',0,'f_h1b5'],
 ['h1b',7,0.9,3,'Welke kant zwaarder weegt, verschilt per persoon.',0,'f_h1b7'],
 ['h2a',0,0.9,3,'Een paar druppels bloed uit de hiel. De hielprik.',0,'f_h2a0'],
 ['h2a',2,0.95,3,'Een dieet, een medicijn, een behandeling die schade voorkomt of beperkt.',0,'f_h2a2'],
 ['h2a',3,0.95,3,'Bijna alle ouders doen mee.',0,'f_h2a3'],
 ['h2a',4,0.9,3,'De NIPT telt stukjes DNA van het kind in het bloed van de moeder.',0,'f_h2a4'],
 ['h2a',5,0.95,3,'Een extra chromosoom 21 heet downsyndroom.',0,'f_h2a5'],
 ['h2a',6,0.95,3,'Er volgt een vervolgtest, en daarna een keuze waar geen lab het antwoord op heeft.',0,'f_h2a6'],
 ['h2b',2,0.9,3,'Er is nog een test, vóór een zwangerschap: de dragerschapstest.',0,'f_h2b2'],
 ['h2b',3,0.9,3,'Je hebt het allel één keer.',0,'f_h2b3'],
 ['h2b',4,0.95,3,'Zijn beide ouders drager, dan is de kans één op vier.',0,'f_h2b4'],
 ['h2b',5,0.9,3,'Op de balans: zekerheid vooraf, tegenover een vraag waar je niet om gevraagd had.',0,'f_h2b5'],
 ['h3a',0,0.9,3,'Het lab vond een variant in het gen BRCA1.',0,'f_h3a0'],
 ['h3a',2,0.9,3,'Zonder de variant is dat in Nederland ongeveer één op de zeven.',0,'f_h3a2'],
 ['h3a',3,0.95,3,'Vaker controleren, of een operatie uit voorzorg.',0,'f_h3a3'],
 ['h3a',4,0.95,3,'Allebei kan. En ook mannen kunnen de variant hebben en doorgeven.',0,'f_h3a4'],
 ['h3a',5,0.95,3,'Vrijwel zeker, meestal tussen je dertigste en vijftigste.',0,'f_h3a5'],
 ['h3b',0,0.9,3,'Zit de variant niet in jouw DNA, dan krijgen je kinderen hem niet van jou.',0,'f_h3b0'],
 ['h3b',1,0.95,3,'Had je de variant wél, dan had elk kind de helft kans.',0,'f_h3b1'],
 ['h3b',2,0.9,3,'Was je vader nooit getest, dan weet je nu ook iets over hem.',0,'f_h3b2'],
 ['h3b',3,0.9,3,'Via een klinisch geneticus: een arts voor erfelijkheid.',0,'f_h3b3'],
 ['h3b',4,0.9,3,'Bij een levensverzekering tot een paar ton mag een verzekeraar niet vragen.',0,'f_h3b4'],
 ['h4a',2,0.95,3,'Het enzym werkt te langzaam, het medicijn stapelt zich op.',0,'f_h4a2'],
 ['h4a',3,0.95,3,'Met de variant krijg je een lagere dosis, of een ander middel.',0,'f_h4a3'],
 ['h4b',1,0.95,3,'De test voorkomt een bijwerking, en de uitslag gaat bijna alleen over jou.',0,'f_h4b1'],
 ['h4b',2,0.95,3,'De boer spuit minder gif, het zaadbedrijf verdient aan het zaad.',0,'f_h4b2'],
 ['h4b',3,0.95,3,'Worden insecten ongevoelig, waait het stuifmeel over?',0,'f_h4b3'],
 ['h4b',4,0.95,3,'Wie wint en wie het risico draagt, zijn hier niet dezelfde.',0,'f_h4b4'],
 ['recap',2,0.9,3,'Hoe zwaar ze wegen, bepaalt niemand voor je. Ook deze film niet.',0,'f_recap2'],
 ['recap2',1,0.95,3,'Acht afleveringen DNA. Het begon in een cel. Het eindigt bij jou.',0,'f_recap2b']];
(async()=>{ const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/dnaC/afl8/harness.html'); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,300));
 for(const [n,li,lf,t,c,v,out] of shots){ const u=await p.evaluate((n,li,lf,t,c,v)=>frame(n,li,lf,t,c,v),n,li,lf,t,c,v); fs.writeFileSync('afl8/'+out+'.png',Buffer.from(u.split(',')[1],'base64')); }
 console.log(errs.join('\n')||'no errors'); await b.close(); })();
