const fs=require('fs'), vm=require('vm'); global.dierOog=()=>{};
vm.runInThisContext(fs.readFileSync(process.env.HOME+'/evo2/src/pop_darwin.js','utf8').replace(/^const /mg,'var ').replace(/^x9(nandoe|gordeldier|schildpad) =/mg,'var _x ='));
const r=[]; let maxN=0,maxG=0;
for (let i=0;i<40;i++){const t=i/40; const m=NandoePop.meet({houding:'lopen',t}); const g=GordelPop.meet({houding:'lopen',t}); m.forEach(b=>maxN=Math.max(maxN,b.rek)); Object.values(g).forEach(b=>maxG=Math.max(maxG,b.rek)); if(i%5==0) console.log(t.toFixed(3), m.map(b=>b.rek.toFixed(3)+(b.steun?'s':'z')).join(' '), '|', Object.entries(g).map(([k,b])=>k+b.rek.toFixed(2)).join(' '));}
console.log('max rek nandoe',maxN.toFixed(3),'gordel',maxG.toFixed(3));
console.log('staan', NandoePop.meet({}).map(b=>b.rek.toFixed(3)), Object.values(GordelPop.meet({})).map(b=>b.rek.toFixed(3)));
// glijden: steunvoet in wereldcoördinaten bij vooruit
for (const [nm,Pp] of [['nandoe',NandoePop],['gordel',GordelPop]]) { let maxs=0; const S=Pp.D.gang.S; let prev=null;
  for(let i=0;i<=400;i++){const t=i/400; const h=Pp.houding({houding:'lopen',t}); const vs = nm==='nandoe'? h.poten.map(p=>[p.k[0]+S*t,p.steun]) : Object.entries(h.voeten).map(([k,v])=>[v[0]+S*t, v[1]>-0.01]);
    if(prev) vs.forEach((v,j)=>{ if(v[1]&&prev[j][1]) maxs=Math.max(maxs,Math.abs(v[0]-prev[j][0])); }); prev=vs; }
  console.log(nm,'glijden max per stap (cm)',maxs.toFixed(4)); }
