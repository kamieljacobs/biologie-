// node frames3.js : render style frames for film 3 via a harness page
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
const lib=fs.readFileSync('src/lib.js','utf8')+'\n'+fs.readFileSync('src/dnalib.js','utf8'); const sc=fs.readFileSync('src/scenes6.js','utf8');
const fonts=['001.woff2:Fraunces:700','002.woff2:Source Sans 3:400','003.woff2:Source Sans 3:600','004.woff2:Source Sans 3:700','005.woff2:IBM Plex Mono:500'].map(x=>{const [f,fam,w]=x.split(':');return `@font-face{font-family:"${fam}";font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync('fonts/'+f).toString('base64')}) format("woff2")}`;}).join('\n');
const html=`<!doctype html><meta charset=utf8><style>${fonts} body{margin:0;background:#000}</style><canvas id=c width=1920 height=1080></canvas>
<script>${lib}</script><script>${sc}</script><script>
const ctx=document.getElementById('c').getContext('2d');
function cap(s){ ctx.font=fTekst(44,700); const w=ctx.measureText(s).width; roundRect(ctx,W/2-w/2-32,H-24-80,w+64,80,12); ctx.fillStyle=rgba(C.kast,0.9); ctx.fill(); text(ctx,s,W/2,H-24-80+52,fTekst(44,700),C.text,'center'); }
window.frame=(name,li,lf,t,caption,vwo,meta)=>{ ctx.clearRect(0,0,W,H); ctx.fillStyle=C.bgMicro; ctx.fillRect(0,0,W,H); ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,CAPTION_Y-8); ctx.clip(); SCENES[name](ctx,li,lf,t); ctx.restore();
  if(vwo){ ctx.fillStyle=C.paars; ctx.fillRect(0,0,6,H); metaText(ctx,'vwo',60,46,C.paars,'left',28); } else metaText(ctx,'havo · vwo · dna 6/8',60,46,C.text2,'left',24);
  if(caption) cap(caption); return document.getElementById('c').toDataURL('image/png'); };
</script>`;
fs.writeFileSync('afl6/harness.html',html);
const shots=[['open',1,0.9,3,'De ene loopt elke ochtend hard. De andere rookt, en heeft last van haar hart.',0,'f_open1'],
 ['open',3,0.9,3,'Hoe kan dat: hetzelfde kookboek, en toch twee verschillende mensen?',0,'f_open3'],
 ['h1a',1,0.9,3,'Alle drie zijn ze ontstaan uit dezelfde bevruchte eicel.',0,'f_h1a'],
 ['h1b',0,0.9,3,'Elke cel met een kern heeft alle twintigduizend genen.',0,'f_h1b0'],
 ['h1b',1,0.9,3,'Een gen gebruiken heet genexpressie.',0,'f_h1b1'],
 ['h1b',3,0.9,3,'Hetzelfde kookboek, andere pagina’s open.',0,'f_h1b3'],
 ['h1c',1,0.9,3,'Zijn genotype verandert niet. Zijn genexpressie wel.',0,'f_h1c'],
 ['h2a',1,0.9,3,'Eerst moet er een eiwit op de promotor gaan zitten: een transcriptiefactor.',0,'f_h2a1'],
 ['h2a',2,0.3,3,'Is die er, dan bindt de polymerase en gaat het gen aan.',0,'f_h2a2'],
 ['h2a',3,0.9,3,'De genen voor de schakelaars heten regulatorgenen.',0,'f_h2a3'],
 ['h2b',0,0.5,3,'Oestradiol bindt in de cel aan een receptor.',0,'f_h2b0'],
 ['h2b',2,0.9,3,'Zo komt een signaal van buiten bij het DNA terecht.',0,'f_h2b2'],
 ['h2v',1,0.9,3,'Een repressor zit in de weg en houdt het gen uit.',1,'f_h2v1'],
 ['h2v',2,0.9,3,'Het bindt aan een enhancer: een stuk DNA, soms ver van het gen.',1,'f_h2v2'],
 ['h3a',1,0.9,3,'In een embryo: embryonale stamcellen. In je beenmerg: volwassen stamcellen.',0,'f_h3a1'],
 ['h3a',2,0.9,3,'Een stamcel kan twee dingen.',0,'f_h3a2'],
 ['h3a',3,0.95,3,'Na nog een reeks delingen is zij een rode bloedcel.',0,'f_h3a3'],
 ['h3b',1,0.9,3,'In een cel die rode bloedcel wordt, gaat het gen voor hemoglobine aan.',0,'f_h3b1'],
 ['h3b',2,0.9,3,'Zo verdwijnen de vliezen tussen je vingers vóór je geboorte.',0,'f_h3b2'],
 ['h3b',3,0.9,3,'Alle genen zitten er nog, ze staan alleen op slot.',0,'f_h3b3'],
 ['h3b',4,0.9,3,'Zet een paar regulatorgenen aan in een huidcel, en ze wordt weer een stamcel.',0,'f_h3b4'],
 ['h3v',4,0.9,3,'Hoe verder een cel is gedifferentieerd, hoe minder soorten cel ze nog kan worden.',1,'f_h3v'],
 ['h4a',1,0.9,3,'Ze hangt er een chemisch slotje aan: een methylgroep op het DNA.',0,'f_h4a1'],
 ['h4a',2,0.9,3,'Zit dat slotje erop, dan kan de transcriptiefactor er niet bij.',0,'f_h4a2'],
 ['h4a',3,0.9,3,'Het heet een epigenetische verandering: iets óp het DNA, niet ín het DNA.',0,'f_h4a3'],
 ['h4b',0,0.9,3,'Zo onthoudt een levercel na elke deling dat ze levercel is.',0,'f_h4b0'],
 ['h4b',2,0.9,3,'Roken geeft echte mutaties. Maar daarnaast verandert het welke genen aan staan.',0,'f_h4b2'],
 ['h4b',3,0.9,3,'Zelfde DNA, andere slotjes.',0,'f_h4b3'],
 ['h4b',4,0.9,3,'Epigenetica is de wetenschap van alles wat genen aan of uit zet.',0,'f_h4b4'],
 ['h4c',0,0.9,3,'De baarmoeder valt af: de moeders aten gewoon.',0,'f_h4c0'],
 ['h4c',2,0.9,3,'De meeste slotjes worden gewist. Maar sommige blijven zitten.',0,'f_h4c2'],
 ['h4v',1,0.9,3,'Zitten er acetylgroepen op die histonen, dan zit het DNA los: open.',1,'f_h4v1'],
 ['h4v',2,0.9,3,'In elke cel wordt vroeg in het embryo één willekeurig uitgeschakeld.',1,'f_h4v2'],
 ['h4v',3,0.9,3,'Dan krijg je plukjes oranje en plukjes zwart.',1,'f_h4v3'],
 ['h4v',4,0.9,3,'Daarom zijn lapjeskatten bijna altijd vrouwtjes.',1,'f_h4v4'],
 ['recap',3,0.9,3,'Welke pagina’s open liggen, dat maakt jou.',0,'f_recap'],
 ['recap2',0,0.9,3,'Hoe lees je DNA? Dat zie je in aflevering zeven.',0,'f_recap2']];
(async()=>{ const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file:///home/claude/dnaC/afl6/harness.html'); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,300));
 for(const [n,li,lf,t,c,v,out] of shots){ const u=await p.evaluate((n,li,lf,t,c,v)=>frame(n,li,lf,t,c,v),n,li,lf,t,c,v); fs.writeFileSync('afl6/'+out+'.png',Buffer.from(u.split(',')[1],'base64')); }
 console.log(errs.join('\n')||'no errors'); await b.close(); })();
