#!/usr/bin/env python3
"""Zet een aanvulling in een gepubliceerde DNA-film zonder de latere speler- en labelwijzigingen te verliezen
(de gepubliceerde films hebben een nieuwere speler dan src/player.js, src/lib.js en src/page.tpl).
  python3 patch_aanvulling.py <n> <gepubliceerde film> <oude bouw.html> <oude src/scenes<n>.js>
FILMDATA en GLOSSARY komen uit de nieuwe bouw (out/<film>.html, eerst build.py <n>); de scènes en de paginatekst
krijgen alleen de verschillen oud → nieuw (src/scenes<n>.js en oude bouw → nieuwe bouw), toegepast op de gepubliceerde film.
Uitvoer: out/<film>.patched.html en .patched.standalone.html; daarna src/scenes<n>.js = het scèneblok uit de uitvoer."""
import re,difflib,sys,os
from films import FILMS
n=int(sys.argv[1]); F=FILMS[n]['file']
pub=open(sys.argv[2],encoding='utf-8').read(); old=open(sys.argv[3],encoding='utf-8').read(); new=open(f'out/{F}',encoding='utf-8').read()
oldsc=open(sys.argv[4],encoding='utf-8').read(); newsc=open(f'src/scenes{n}.js',encoding='utf-8').read()
def apply(text,ol,nl,what):
    for op,i1,i2,j1,j2 in reversed(difflib.SequenceMatcher(None,ol,nl,autojunk=False).get_opcodes()):
        if op=='equal': continue
        if op=='insert':
            # anker: de regel ná de invoeging (uniek), anders de regel ervoor
            k=next((ol[i] for i in range(i1,len(ol)) if ol[i].strip() and text.count(ol[i])==1),None)
            if k is not None: text=text.replace(k,'\n'.join(nl[j1:j2])+'\n'+k); continue
            k=next(ol[i] for i in range(i1-1,-1,-1) if ol[i].strip() and text.count(ol[i])==1); text=text.replace(k,k+'\n'+'\n'.join(nl[j1:j2])); continue
        o='\n'.join(ol[i1:i2]); m='\n'.join(nl[j1:j2])
        assert text.count(o)==1,(what,op,i1,o[:200]); text=text.replace(o,m)
    return text
out=pub
pat=r'window\.FILMDATA=\{.*?\};</script>'; nf=re.search(pat,new,re.S).group(0); out=re.sub(pat,lambda m:nf,out,count=1,flags=re.S)
pg=r'const GLOSSARY=\[.*?\];'; ng=re.search(pg,new,re.S).group(0); assert len(re.findall(pg,out,re.S))==1; out=re.sub(pg,lambda m:ng,out,count=1,flags=re.S)
head=newsc.split('\n')[0]; a=out.index(head); b=out.index('</script>',a); block=apply(out[a:b],oldsc.split('\n'),newsc.split('\n'),'scenes'); out=out[:a]+block+out[b:]
ol=old.split('\n'); nl=new.split('\n'); cut=next(i for i,l in enumerate(ol) if l.startswith('<footer>')); cutn=next(i for i,l in enumerate(nl) if l.startswith('<footer>'))
ol=[l for l in ol[:cut] if 'window.FILMDATA=' not in l and 'const GLOSSARY=' not in l]; nl=[l for l in nl[:cutn] if 'window.FILMDATA=' not in l and 'const GLOSSARY=' not in l]
hs=[i for i,l in enumerate(ol) if head in l]
if hs: pass
# alleen paginatekst (vóór het eerste <script> met de bibliotheek) vergelijken
lim=next(i for i,l in enumerate(ol) if 'const C = {' in l or l.startswith('// ===== Part C')) if any('const C = {' in l for l in ol) else len(ol)
limn=next(i for i,l in enumerate(nl) if 'const C = {' in l or l.startswith('// ===== Part C')) if any('const C = {' in l for l in nl) else len(nl)
out=apply(out,ol[:lim],nl[:limn],'pagina')
open(f'out/{F.replace(".html",".patched.html")}','w',encoding='utf-8').write(out)
open(f'out/{F.replace(".html",".patched.standalone.html")}','w',encoding='utf-8').write(re.sub(r'<script src="../../js/teller.js"[^>]*></script>','',out))
open(f'out/scenes{n}.published.js','w',encoding='utf-8').write(block)
print('ok',len(out)//1024,'kB')
