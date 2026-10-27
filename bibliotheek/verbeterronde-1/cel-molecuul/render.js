// node render.js <obj> [versies...]  -> schrijft X/Y/Z volgens sleutel.json, of los: obj/_<v>.png
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{ const obj=process.argv[2]; const poort=process.env.POORT||8811; const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:1280,height:720}});
 const errs=[]; pg.on('pageerror',e=>errs.push(String(e))); pg.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
 let key=null; try{ key=JSON.parse(fs.readFileSync(obj+'/sleutel.json')); }catch(e){}
 const jobs = process.argv.length>3 ? process.argv.slice(3).map(v=>[v,obj+'/_'+v+'.png']) : Object.entries(key).map(([L,v])=>[v,obj+'/'+L+'.png']);
 for(const [v,out] of jobs){ await pg.goto(`http://localhost:${poort}/harness.html?obj=${obj}&v=${v}&scene=${process.env.SCENE||"scene.js"}`); await pg.waitForFunction('window.KLAAR',null,{timeout:15000});
   const f=await pg.evaluate('window.FOUT'); if(f) errs.push(v+': '+f); await (await pg.$('#c')).screenshot({path:out}); }
 console.log(obj, jobs.map(j=>j[1]).join(' '), 'fouten:', errs.length?errs.slice(0,5):'geen'); await b.close(); })();
