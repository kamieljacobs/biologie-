// node qa5.js <html> <outprefix> [havo] — frames uit n24b en n24c (per regel 3 momenten) + n24/n25 rond de overgang
const {chromium}=require('playwright'); const fs=require('fs');
(async()=>{ const [file,prefix,niv]=process.argv.slice(2);
  const b=await chromium.launch({args:['--no-sandbox','--allow-file-access-from-files']}); const p=await b.newPage(); await p.setViewportSize({width:1400,height:900});
  const errs=[]; p.on('pageerror',e=>errs.push('ERR '+e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push('CON '+m.text()); });
  await p.goto('file://'+file+(niv?'?niveau=havo':''),{waitUntil:'load'}); await new Promise(r=>setTimeout(r,800));
  const plan=await p.evaluate(()=>{ state.started=true; const out=[]; state.items.forEach(it=>{ if(!it.seg) return; const id=it.seg.id; if(id==='n24b'||id==='n24c'){ const bs=[0,...it.seg.bounds,it.seg.dur-0.6]; for(let k=0;k<bs.length-1;k++) for(const f of [0.1,0.55,0.97]) out.push(+(it.start+bs[k]+(bs[k+1]-bs[k])*f).toFixed(2)); } if(id==='n24'||id==='n25'||id==='n27') out.push(+(it.start+1).toFixed(2)); }); return {out,total:state.total}; });
  const meta=[]; for(const [k,t] of plan.out.entries()){ const info=await p.evaluate(t=>{ seekGlobal(t); render(); const it=state.items[state.idx]; return {t,type:it.type,id:it.seg&&it.seg.id,local:+state.local.toFixed(2),url:document.getElementById('stage').toDataURL('image/png')}; },t);
    fs.writeFileSync(`${prefix}_${String(k).padStart(3,'0')}.png`,Buffer.from(info.url.split(',')[1],'base64')); delete info.url; meta.push(info); }
  fs.writeFileSync(`${prefix}_meta.json`,JSON.stringify({total:plan.total,meta})); console.log('total',plan.total.toFixed(1),'frames',meta.length); console.log(errs.join('\n')||'no errors'); await b.close(); })();
