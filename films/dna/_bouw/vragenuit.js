// NODE_PATH=$(npm root -g) node vragenuit.js <html> [havo] — speelt de tijdlijn na met Vragen uit (state.vragen='uit'): JS-fouten en totale duur
const {chromium}=require('playwright');
(async()=>{ const [file,niv]=process.argv.slice(2); const b=await chromium.launch(); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+file+'?vragen=uit'+(niv==='havo'?'&niveau=havo':''),{waitUntil:'load'}); await p.waitForTimeout(700);
 const r=await p.evaluate(()=>{ state.started=true; if(state.vragen!=='uit'){ state.vragen='uit'; if(typeof buildTimeline==='function') buildTimeline(); } const ids=state.items.map(i=>i.seg&&i.seg.id).filter(Boolean); for(let g=0.5;g<state.total;g+=7){ seekGlobal(g); render(); } return {vragen:state.vragen,total:state.total,ids:ids.join(' ')}; });
 console.log(JSON.stringify(r)); console.log(errs.join('\n')||'geen fouten'); await b.close(); })();
