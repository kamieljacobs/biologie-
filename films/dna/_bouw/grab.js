// node grab.js <html> <outprefix> <step|t1,t2,...> [havo]
const puppeteer=require('/home/claude/node_modules/puppeteer'); const fs=require('fs');
(async()=>{ const [file,prefix,spec,niv]=process.argv.slice(2);
  const b=await puppeteer.launch({args:['--no-sandbox','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']}); const p=await b.newPage(); await p.setViewport({width:1400,height:900});
  const errs=[]; p.on('pageerror',e=>errs.push('ERR '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('CON '+m.text()); });
  await p.goto('file://'+file+(niv?'?niveau=havo':''),{waitUntil:'load'}); await new Promise(r=>setTimeout(r,800));
  const total=await p.evaluate(()=>{ state.started=true; return state.total; });
  const times= spec.includes(',')||!isFinite(+spec)&&spec.includes('.')? spec.split(',').map(Number) : (()=>{ const a=[]; for(let t=0.5;t<total;t+=+spec) a.push(+t.toFixed(2)); return a; })();
  const meta=[];
  for(const [k,t] of times.entries()){ const info=await p.evaluate(t=>{ seekGlobal(t); render(); const it=state.items[state.idx]; return {t, type:it.type, id:it.seg&&it.seg.id, ch:it.chapter, local:+state.local.toFixed(2), url:document.getElementById('stage').toDataURL('image/png')}; },t);
    fs.writeFileSync(`${prefix}_${String(k).padStart(3,'0')}.png`,Buffer.from(info.url.split(',')[1],'base64')); delete info.url; meta.push(info); }
  fs.writeFileSync(`${prefix}_meta.json`,JSON.stringify({total,meta},null,0)); console.log('total',total.toFixed(1),'frames',times.length); console.log(errs.join('\n')||'no errors'); await b.close(); })();
