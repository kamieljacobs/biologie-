const fs=require('fs'); const D=JSON.parse(fs.readFileSync('filmdata.json','utf8')); const src=fs.readFileSync('src/scenes.js','utf8');
const parts=src.split(/\n(?=s\d\d\(ctx)/); let bad=0;
const norm=s=>s.toLowerCase().replace(/[^a-zà-ÿ0-9]/g,'');
for(const p of parts){ const m=p.match(/^(s\d\d)\(ctx/); if(!m) continue; const id=m[1]; const seg=D.segments.find(s=>s.id===id); if(!seg){ console.log('NO SEG',id); bad++; continue; }
  for(const c of p.matchAll(/q\.(?:at|on)\('([^']+)'(?:,(\d+))?/g)){ const w=norm(c[1]), n=+(c[2]||1); const hits=seg.words.filter(x=>norm(x.t).includes(w)); if(hits.length<n){ console.log('MISSING',id,c[1],n,'hits',hits.length); bad++; } } }
console.log('bad',bad);
