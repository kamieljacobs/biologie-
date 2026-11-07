// NODE_PATH=$(npm root -g) node qa6.js <html> <prefix> <ids,komma> [havo]
const chromium=require('playwright').chromium; const fs=require('fs');
(async()=>{ const [file,prefix,ids,niv]=process.argv.slice(2);
 const b=await chromium.launch({args:['--no-sandbox','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']}); const p=await b.newPage(); await p.setViewportSize({width:1400,height:900});
 const errs=[]; p.on('pageerror',e=>errs.push('ERR '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('CON '+m.text()); });
 await p.goto('file://'+file+(niv?'?niveau=havo':''),{waitUntil:'load'}); await new Promise(r=>setTimeout(r,800));
 const times=await p.evaluate(ids=>{ state.started=true; const out=[]; for(const id of ids.split(',')){ const it=state.items.find(x=>x.seg&&x.seg.id===id); if(!it) continue; const sg=it.seg; const bd=[0,...(sg.bounds||[]),sg.dur-0.7];
   for(let i=0;i<bd.length-1;i++){ const a=bd[i],e=bd[i+1]; for(const f of [0.2,0.55,0.95]) out.push(+(it.start+a+(e-a)*f).toFixed(2)); } } return out; },ids);
 const meta=[]; for(const [k,t] of times.entries()){ const info=await p.evaluate(t=>{ seekGlobal(t); render(); const it=state.items[state.idx]; return {t,type:it.type,id:it.seg&&it.seg.id,local:+state.local.toFixed(2),url:document.getElementById('stage').toDataURL('image/png')}; },t);
   fs.writeFileSync(`${prefix}_${String(k).padStart(3,'0')}.png`,Buffer.from(info.url.split(',')[1],'base64')); delete info.url; meta.push(info); }
 const tl=await p.evaluate(()=>state.items.map(x=>[x.type,x.seg&&x.seg.id,+x.start.toFixed(1)]));
 fs.writeFileSync(`${prefix}_meta.json`,JSON.stringify({meta,tl})); console.log('frames',times.length); console.log(errs.join('\n')||'no errors'); await b.close(); })();
