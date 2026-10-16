// NODE_PATH=$(npm root -g) node grabseg.js <html> <outdir> <id,id,...> [havo] [n=6] — stills per segment (gelijk verdeeld) + JS-fouten
const {chromium}=require('playwright'); const fs=require('fs');
(async()=>{ const [file,out,ids,niv,nn]=process.argv.slice(2); const N=+(nn||6); fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1400,height:900}}); const errs=[];
 p.on('pageerror',e=>errs.push('ERR '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('CON '+m.text()); });
 await p.goto('file://'+file+(niv==='havo'?'?niveau=havo':''),{waitUntil:'load'}); await p.waitForTimeout(700);
 await p.evaluate(()=>{ state.started=true; });
 const segs=await p.evaluate(()=>state.items.map(it=>({id:it.seg&&it.seg.id,start:it.start,dur:it.dur,type:it.type})));
 const want=ids==='all'?segs.filter(s=>s.id).map(s=>s.id):ids.split(',');
 for(const id of want){ const s=segs.find(x=>x.id===id); if(!s){ console.log('niet gevonden',id); continue; }
   for(let k=0;k<N;k++){ const t=s.start+s.dur*(k+0.5)/N; const url=await p.evaluate(t=>{ seekGlobal(t); render(); return document.getElementById('stage').toDataURL('image/png'); },t);
     fs.writeFileSync(`${out}/${id}_${k}.png`,Buffer.from(url.split(',')[1],'base64')); } console.log(id,'start',s.start.toFixed(1),'dur',s.dur.toFixed(1)); }
 console.log('totaal',(await p.evaluate(()=>state.total)).toFixed(1)); console.log(errs.join('\n')||'geen fouten'); await b.close(); })();
