"""Zet de aanvulling (16 okt 2026) in de gepubliceerde film zonder de latere speler- en labelwijzigingen te verliezen:
FILMDATA, GLOSSARY en de scènes komen uit de nieuwe bouw (build.py 5 / src/scenes5.js); paginatekst via verschil oude bouw → nieuwe bouw.
python3 patch5.py <gepubliceerde film> <oude bouw> → out/5-mutaties.patched(.standalone).html"""
import re,difflib,sys
pub=open(sys.argv[1],encoding='utf-8').read(); old=open(sys.argv[2],encoding='utf-8').read(); new=open('out/5-mutaties.html',encoding='utf-8').read()
pat=r'window\.FILMDATA=\{.*?\};</script>'; nf=re.search(pat,new,re.S).group(0); out=re.sub(pat,lambda m:nf,pub,count=1,flags=re.S)
a=out.index('// ===== DNA 5 · Mutaties — scenes'); b=out.index('</script>',a); out=out[:a]+open('src/scenes5.js',encoding='utf-8').read()+out[b:]
pg=r'const GLOSSARY=\[.*?\];'; ng=re.search(pg,new,re.S).group(0); assert len(re.findall(pg,out,re.S))==1; out=re.sub(pg,lambda m:ng,out,count=1,flags=re.S)
ol=old.split('\n'); nl=new.split('\n'); cut=next(i for i,l in enumerate(ol) if l.startswith('<footer>')); cutn=next(i for i,l in enumerate(nl) if l.startswith('<footer>'))
for op,i1,i2,j1,j2 in difflib.SequenceMatcher(None,ol[:cut],nl[:cutn],autojunk=False).get_opcodes():
    if op=='equal': continue
    o='\n'.join(ol[i1:i2]); n='\n'.join(nl[j1:j2])
    if op=='insert': o=ol[i1-1]; n=o+'\n'+n
    assert out.count(o)==1,(op,i1); out=out.replace(o,n)
f='(geparafraseerd). Versie 1.0 · 13 oktober 2026.<span data-licentie'
if f in out: out=out.replace(f,f.replace('1.0 · 13','1.1 · 16'))
open('out/5-mutaties.patched.html','w',encoding='utf-8').write(out)
open('out/5-mutaties.patched.standalone.html','w',encoding='utf-8').write(re.sub(r'<script src="../../js/teller.js"[^>]*></script>','',out))
print('ok',len(out)//1024,'kB')
