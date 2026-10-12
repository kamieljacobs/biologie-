#!/usr/bin/env python3
"""DNA-reeks (Part C) — bouw film n: python3 build.py 2  →  out/<n>-<slug>.html (site, met sitebalk) en out/<n>-<slug>.standalone.html"""
import json, re, sys, base64, html, os
from films import FILMS
ROOT=os.path.dirname(os.path.abspath(__file__))
def rd(p): return open(os.path.join(ROOT,p),encoding='utf-8').read()
def b64(p): return base64.b64encode(open(os.path.join(ROOT,p),'rb').read()).decode()

def build(n):
    F=FILMS[n]; S=json.load(open(f'{ROOT}/data/afl{n}_script.json')); Wd=json.load(open(f'{ROOT}/data/afl{n}_words.json'))
    segs=[]; chapter='Opening'
    for i,s in enumerate(S['SCRIPT']):
        lev='vwo' if s.get('level')=='v' else 'basis'
        if s['kind']=='card':
            if s.get('sub','').startswith('DNA ·'): segs.append({'id':'title','kind':'title','level':'basis','chapter':'Opening'}); continue
            chapter = s['sub']+' — '+s['title']
            chapter = chapter.replace(' · vwo','')
            continue
        if s['kind']=='end': segs.append({'id':'end','kind':'end','level':'basis','chapter':'Einde'}); continue
        key=('n' if s['kind']=='narr' else 'q')+str(i); w=Wd[key]
        audio='data:audio/mpeg;base64,'+b64(f'data/afl{n}_audio/{key}.mp3')
        if s['kind']=='narr':
            segs.append({'id':key,'kind':'speech','level':lev,'chapter':chapter,'scene':s['scene'],'audio':audio,'dur':round(w['dur']+0.6,3),'bounds':w['bounds'],'words':w['words']})
        else:
            qtext=re.sub(r'\s*Wat denk je\?\s*$','',s['text'])
            segs.append({'id':key,'kind':'question','level':lev,'chapter':chapter,'q':qtext,'options':s['opts'],'correct':s['correct'],'audio':audio,'adur':round(w['dur']+0.3,3),'words':w['words']})
    chapters=[]; [chapters.append(x['chapter']) for x in segs if x['chapter'] not in chapters]
    data={'segments':segs,'chapters':chapters,'film':F['film']}
    gl=[{'t':g[0],'d':g[1],'vwo':g[2]=='v'} for g in S['GLOSSARY']]
    checks=''.join(f'<div class="q{" vwo-only" if lv=="v" else ""}"><b>{k}.</b>{" <span class=tag>vwo</span>" if lv=="v" else ""}<p>{html.escape(q)}</p><details><summary>Antwoord</summary><p>{html.escape(a)}</p></details></div>'
                   for k,(lv,q,a) in enumerate([( 'b',)+tuple(c) for c in S['CHECKS']['b']]+[('v',)+tuple(c) for c in S['CHECKS']['v']],1))
    nums='<details><summary>Getallen achter de film</summary><table><tr><th>Getal</th><th>In de film</th><th>Bron / berekening</th></tr>'+''.join(f'<tr><td>{html.escape(a)}</td><td>{html.escape(b)}</td><td>{html.escape(c)}</td></tr>' for a,b,c in S['NUMBERS'])+'</table></details>'
    teacher=F['teacher_how']+F['teacher_rest'].replace('<!--NUMBERS-->',nums)
    fonts=''.join(f'@font-face{{font-family:"{fam}";font-weight:{wt};font-style:normal;font-display:block;src:url(data:font/woff2;base64,{b64("fonts/"+f)}) format("woff2")}}\n'
                  for f,fam,wt in [('001.woff2','Fraunces',700),('002.woff2','Source Sans 3',400),('003.woff2','Source Sans 3',600),('004.woff2','Source Sans 3',700),('005.woff2','IBM Plex Mono',500)])
    legend=''.join(f'<span><i style="background:{c}"></i>{t}</span>' for c,t in F['legend'])
    page=rd('src/page.tpl')
    for k,v in {'{{TITLE}}':F['title'],'{{HEADMETA}}':F['headmeta'],'{{H1}}':F['film']['title'],'{{LEAD}}':F['lead'],'{{LEGEND}}':legend,'{{CHECKS}}':checks,'{{TEACHER}}':teacher,'{{FOOTER}}':F['footer']}.items(): page=page.replace(k,v)
    page=page.replace('/*FONTS*/',fonts).replace('/*FILMDATA*/',json.dumps(data,ensure_ascii=False)).replace('/*GLOSSARY*/',json.dumps(gl,ensure_ascii=False))
    page=page.replace('/*LIB*/',rd('src/lib.js')+'\n'+rd('src/dnalib.js')).replace('/*SCENES*/',rd(f'src/scenes{n}.js')).replace('/*PLAYER*/',rd('src/player.js'))
    nav=('<nav class="sitenav nav"><a href="../../index.html#home">Biologie bij Kamiel</a><a href="../../index.html#dna" id="back" class="terug">← Terug naar DNA</a></nav>'
         '<script>document.getElementById("back").addEventListener("click",function(e){try{if(document.referrer&&new URL(document.referrer).origin===location.origin&&history.length>1){e.preventDefault();history.back();}}catch(_){}});</script>'
         +F['seriesline'])
    os.makedirs(f'{ROOT}/out',exist_ok=True)
    open(f'{ROOT}/out/{F["file"]}','w',encoding='utf-8').write(page.replace('/*NAV*/',nav))
    open(f'{ROOT}/out/{F["file"].replace(".html",".standalone.html")}','w',encoding='utf-8').write(page.replace('/*NAV*/',''))
    vwo=sum(x.get('dur',0)+x.get('adur',0) for x in segs); bas=sum(x.get('dur',0)+x.get('adur',0) for x in segs if x['level']=='basis')
    print(f'afl {n}: {len(page)//1024} kB · spraak vwo {vwo:.0f} s · basis {bas:.0f} s · hoofdstukken {chapters}')
if __name__=='__main__':
    for a in sys.argv[1:]: build(int(a))
