#!/usr/bin/env python3
"""Opent elke vraag van elke opgave (vrij doorklikken, hulpstand) en meldt consolefouten.
Gebruik: python3 test.py [opgave-nr ...]  (voegt frag/opg*.js samen in een tijdelijke pagina in tools/)"""
import sys,os,subprocess,json
from playwright.sync_api import sync_playwright
d=os.path.dirname(os.path.abspath(__file__))
tools=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),'tools') if os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','tools')) else '/home/claude/biologie-/tools'
import re
g=open(os.path.join(d,'geraamte.html')).read()
KEY=re.search(r'const TOOL="([^"]+)"',g).group(1)
uit=os.path.join(tools,'_test-examen-'+KEY+'.html')
subprocess.run([sys.executable,os.path.join(d,'samenvoegen.py'),uit],check=True)
want=[int(a) for a in sys.argv[1:]]
errs=[]
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':900,'height':1200})
  pg.on('console',lambda m: m.type=='error' and errs.append(m.text))
  pg.on('pageerror',lambda e: errs.append('PAGEERROR '+str(e)))
  pg.add_init_script("localStorage.setItem('examen-"+KEY+"',JSON.stringify({scores:{},mode:'hulp',vrij:true}))")
  pg.goto('file://'+uit);pg.wait_for_timeout(400)
  opgs=pg.evaluate("[...document.querySelectorAll('#opgs button')].map(b=>b.textContent)")
  print('opgaven:',opgs)
  for i,t in enumerate(opgs):
    nr=int(t.split('·')[0])
    if want and nr not in want: continue
    pg.click(f'#opgs button >> nth={i}');pg.wait_for_timeout(150)
    tabs=pg.evaluate("[...document.querySelectorAll('#tabs button')].map(b=>b.textContent)")
    for k,tb in enumerate(tabs):
      pg.click(f'#tabs button >> nth={k}');pg.wait_for_timeout(120)
      info=pg.evaluate("({papier:!!document.querySelector('#main .papier'),think:document.querySelectorAll('#main .think .step').length,ans:document.querySelectorAll('#main .ans button, #main .ans textarea, #main .ans select, #main .ans input').length})")
      print(f'  opg {nr} vraag {tb}: {info}')
  b.close()
os.remove(uit)
print('FOUTEN:' if errs else 'geen consolefouten',*errs,sep='\n')
