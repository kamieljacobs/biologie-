import re,sys
pub=open(sys.argv[2] if len(sys.argv)>2 else 'orig.html',encoding='utf-8').read(); new=open('out/3-van-dna-naar-eiwit.html',encoding='utf-8').read()
out=pub
def sub1(pat,src_new,flags=re.S):
    global out
    m=re.search(pat,src_new,flags).group(0); assert len(re.findall(pat,out,flags))==1,pat; out=re.sub(pat,lambda _:m,out,count=1,flags=flags)
sub1(r'<script>window\.FILMDATA=\{.*?\};</script>',new)
sub1(r'const GLOSSARY=\[.*?\];',new)
sub1(r'<section><h2>Checkvragen</h2>.*?</section>',new)
sub1(r'<section><h2>Voor de docent</h2>.*?</section>',new)
m=re.search(r'<footer>.*?(?=</footer>)',new,re.S).group(0); a=out.index('<footer>'); b=out.index('<span data-licentie',a); out=out[:a]+m+out[b:]
# scenes block
a=out.index('<script>// ===== DNA 3 · Van DNA naar eiwit'); b=out.index('</script>',a)
out=out[:a]+'<script>'+open('src/scenes3.js',encoding='utf-8').read().rstrip('\n')+'\n'+out[b:]
def R(x,y):
    global out
    if out.count(x)==0 and y in out: return  # al toegepast (idempotent)
    assert out.count(x)==1,x[:100]; out=out.replace(x,y)
# korrel weg (beeldafspraak 15 okt)
R("  if(look==='micro') grain(ctx);\n","  // korrel uit (beeldafspraak 15 okt 2026: geen stippen op de achtergrond)\n")
# metaCase: mRNA, tRNA, DNA ... houden hun schrijfwijze
R("function metaCase(s){ return s.replace(/[^\\s·:→(),]+/g,w=>/^(nm|µm|mm|cm|m|km|s|min|°c|kda)$/i.test(w)? w.toLowerCase().replace('°c','°C') : w.toUpperCase().replace(/\\u039C/g,'µ')); }",
  "const META_KEEP={mrna:'mRNA',trna:'tRNA',rrna:'rRNA',dna:'DNA',rna:'RNA',\"trna's\":\"tRNA's\",\"mrna's\":\"mRNA's\"};\nfunction metaCase(s){ return s.replace(/[^\\s·:→(),]+/g,w=>{ if(/^(nm|µm|mm|cm|m|km|s|min|°c|kda)$/i.test(w)) return w.toLowerCase().replace('°c','°C'); const m=w.match(/^(pre-|vaccin-)?(mrna|trna|rrna|dna|rna|trna's|mrna's)(-[^\\s]*)?$/i); if(m) return (m[1]||'').toUpperCase()+META_KEEP[m[2].toLowerCase()]+(m[3]||'').toUpperCase(); return w.toUpperCase().replace(/\\u039C/g,'µ'); }); } // mRNA/tRNA/DNA houden hun schrijfwijze (16 okt 2026)")
# rustiger cytoplasma
R("if(showRibo){ for(let i=0;i<120;i++){","if(showRibo){ for(let i=0;i<55;i++){")
# meta-labels iets groter (leesbaar op telefoon)
R("if(meta) regels.push([metaCase(meta),fMeta(26),C.grain,28,'3px']);","if(meta) regels.push([metaCase(meta),fMeta(28),C.grain,30,'2px']);")
# telefoon: tabellen in eigen scrollkader, draaihint zichtbaar
R("@media (max-width:700px){ body{font-size:16px} .controls button{padding:8px 10px} }",
  "@media (max-width:700px){ body{font-size:16px} .controls button{padding:8px 10px} .hint{display:block;margin:6px 0 0} }\n.tabelscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}\n.tabelscroll table{min-width:560px}\nmain,footer{overflow-wrap:anywhere}")
# transcript: zelfde knip als de speler ('Voor vwo ...' niet tonen)
R("p.innerHTML=(s.level==='vwo'?'<i>vwo</i> ':'')+(s.kind==='question'?'<b>Vraag:</b> ':'')+s.words.map(w=>w.t).join(' ');",
  "const ws=s.kind==='speech'?(()=>{ const c=vwoCuts(s); return s.words.filter(w=>!c.some(k=>w.s>=k[0]-0.02&&w.s<k[1]-0.02)); })():s.words; p.innerHTML=(s.level==='vwo'?'<i>vwo</i> ':'')+(s.kind==='question'?'<b>Vraag:</b> ':'')+ws.map(w=>w.t).join(' ');")
open(sys.argv[1],'w',encoding='utf-8').write(out); print('ok',len(out)//1024,'kB')
