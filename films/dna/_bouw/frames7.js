// node frames3.js : render style frames for film 3 via a harness page
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
const lib=fs.readFileSync('src/lib.js','utf8')+'\n'+fs.readFileSync('src/dnalib.js','utf8'); const sc=fs.readFileSync('src/scenes7.js','utf8');
const fonts=['001.woff2:Fraunces:700','002.woff2:Source Sans 3:400','003.woff2:Source Sans 3:600','004.woff2:Source Sans 3:700','005.woff2:IBM Plex Mono:500'].map(x=>{const [f,fam,w]=x.split(':');return `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync('fonts/'+f).toString('base64')}) format("woff2")}`;}).join('\n');
const html=`<!doctype html><meta charset=utf8><style>${fonts} body{margin:0;background:#000}</style><canvas id=c width=1920 height=1080></canvas>
<script>${lib}</script><script>${sc}</script><script>
const ctx=document.getElementById('c').getContext('2d');
function cap(s){ ctx.font=fTekst(44,700); const w=ctx.measureText(s).width; roundRect(ctx,W/2-w/2-32,H-24-80,w+64,80,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill(); text(ctx,s,W/2,H-24-80+52,fTekst(44,700),C.text,'center'); }
window.frame=(name,li,lf,t,caption,vwo,meta)=>{ ctx.clearRect(0,0,W,H); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); SCENES[name](ctx,li,lf,t); ctx.restore();
  if(vwo){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); } else metaText(ctx,'havo · vwo · dna 7/8',60,46,C.text2,'left',24);
  if(caption) cap(caption); return document.getElementById('c').toDataURL('image/png'); };
</script>`;
fs.writeFileSync('afl7/harness.html',html);
const shots=[['open',0,0.9,3,'Op een kapotte ruit: een paar druppels bloed van de dader.',0,'f_open0'],
 ['open',1,0.9,3,'Het DNA-profiel komt met niemand in de databank overeen.',0,'f_open1'],
 ['open',3,0.9,3,'En hoe vind je een dader die nergens geregistreerd staat?',0,'f_open3'],
 ['h1a',0,0.9,3,'Rode bloedcellen hebben geen kern, dus geen DNA.',0,'f_h1a0'],
 ['h1a',1,0.9,3,'Dat heet PCR. Alleen nu in een buisje, met de temperatuur als schakelaar.',0,'f_h1a1'],
 ['h1a',2,0.9,3,'Verhitten tot bijna honderd graden: de strengen gaan uit elkaar.',0,'f_h1a2'],
 ['h1a',3,0.9,3,'Afkoelen: primers binden aan het begin van het stuk.',0,'f_h1a3'],
 ['h1a',4,0.9,3,'Een hittebestendige polymerase bouwt vanaf elke primer een nieuwe streng.',0,'f_h1a4'],
 ['h1a',5,0.95,3,'Dertig cycli later: meer dan een miljard kopieën.',0,'f_h1a5'],
 ['h1b',1,0.9,3,'Dát meet je: het gekopieerde stuk, niet het virus zelf.',0,'f_h1b1'],
 ['h1b',2,0.9,3,'Een zelftest vangt eiwitten van het virus.',0,'f_h1b2'],
 ['h1v',1,0.9,3,'Reverse transcriptase schrijft het RNA eerst over naar DNA.',1,'f_h1v1'],
 ['h1v',2,0.9,3,'Je kiest de primers zo dat ze alleen passen op het virus-DNA.',1,'f_h1v2'],
 ['h2a',1,0.9,3,'Een kort motief dat steeds herhaald wordt: G A T A, G A T A.',0,'f_h2a1'],
 ['h2a',2,0.9,3,'Van elke plek heb je twee versies. Bijvoorbeeld acht keer en elf keer.',0,'f_h2a2'],
 ['h2g',1,0.9,3,'DNA is negatief geladen, dus kruipt het naar de pluspool.',0,'f_h2g1'],
 ['h2g',2,0.9,3,'Na een tijdje zie je banden. Hoe verder van de start, hoe korter het stuk.',0,'f_h2g2'],
 ['h2g',3,0.9,3,'Een DNA-profiel. Een streepjescode van een mens.',0,'f_h2g3'],
 ['h2c',2,0.9,3,'Een schoon wattenstaafje is de controle: daar hoort geen band te staan.',0,'f_h2c'],
 ['h2v',1,0.9,3,'Van je vader acht en van je moeder elf: twee banden.',1,'f_h2v1'],
 ['h2v',2,0.9,3,'Alle twintig plekken precies gelijk? Kleiner dan één op een miljard.',1,'f_h2v2'],
 ['h3a',1,0.9,3,'Met een kleur, en zodra er één wordt ingebouwd, stopt de keten.',0,'f_h3a1'],
 ['h3a',2,0.98,3,'Kijk naar het laatste blokje: rood, groen, blauw, geel. Dat is de volgorde.',0,'f_h3a2'],
 ['h3a',3,0.9,3,'Een heel genoom in een dag.',0,'f_h3a3'],
 ['h3b',0,0.9,3,'De computer zoekt op waar in het genoom die volgorde thuishoort.',0,'f_h3b0'],
 ['h3b',1,0.9,3,'Ongeveer één op de tien is van het kind.',0,'f_h3b1'],
 ['h3b',2,0.9,3,'Iets meer stukjes van chromosoom een-en-twintig dan je verwacht.',0,'f_h3b2'],
 ['h3b',3,0.9,3,'Een buisje bloed van de moeder, niet meteen een naald in de baarmoeder.',0,'f_h3b3'],
 ['h3v',2,0.9,3,'Weten wat een variant betekent, is het echte werk.',1,'f_h3v'],
 ['h4a',1,0.9,3,'Miljoenen mensen hebben hun DNA naar een stamboomsite gestuurd.',0,'f_h4a1'],
 ['h4a',2,0.9,3,'Honderdduizenden plekken waar mensen van elkaar verschillen.',0,'f_h4a2'],
 ['h4a',3,0.9,3,'In Nederland alleen in de eigen databank, ook naar verwanten.',0,'f_h4a3'],
 ['h4b',0,0.9,3,'Van elke grootouder een kwart, van elke overgrootouder een achtste.',0,'f_h4b0'],
 ['h4b',2,0.9,3,'Hoe langer en hoe meer, hoe nauwer verwant.',0,'f_h4b2'],
 ['h4b',3,0.9,3,'Tot er één persoon overblijft die past in leeftijd en woonplaats.',0,'f_h4b3'],
 ['h4b',4,0.9,3,'Profiel vergelijken. Match.',0,'f_h4b4'],
 ['h4c',1,0.9,3,'Geknipt met een restrictie-enzym, en geplakt in een plasmide.',0,'f_h4c1'],
 ['h4c',2,0.9,3,'CRISPR: een moleculaire schaar die op één gekozen plek knipt.',0,'f_h4c2'],
 ['h4c',3,0.9,3,'Lezen, vergelijken, veranderen. Mag dat, en wie beslist?',0,'f_h4c3'],
 ['h4v',2,0.9,3,'Elke generatie knipt crossing-over ze in kleinere delen.',1,'f_h4v2'],
 ['recap',3,0.9,3,'En vinden: via verre familie die vrijwillig haar DNA deelde.',0,'f_recap'],
 ['recap2',1,0.9,3,'Wat zou jij uit je eigen DNA willen weten? Dat is aflevering acht.',0,'f_recap2']];
(async()=>{ const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/dnaC/afl7/harness.html'); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,300));
 for(const [n,li,lf,t,c,v,out] of shots){ const u=await p.evaluate((n,li,lf,t,c,v)=>frame(n,li,lf,t,c,v),n,li,lf,t,c,v); fs.writeFileSync('afl7/'+out+'.png',Buffer.from(u.split(',')[1],'base64')); }
 console.log(errs.join('\n')||'no errors'); await b.close(); })();
