#!/usr/bin/env python3
"""Speelt elke vraag in de toetsstand: antwoord geven, nakijken, 'Laat zien waarom', door alle animatiestappen. Meldt fouten en eindscore."""
import sys, os
from playwright.sync_api import sync_playwright
T = __import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','..')); shots = '/tmp/toets-erf-shots'
JS = r"""async()=>{const m=document.querySelector('#main .phase.ans');const w=ms=>new Promise(r=>setTimeout(r,ms));
 const click=b=>{b&&b.click();};
 const mcb=m.querySelector('.row button.opt, .graphs button');
 if(m.querySelector('textarea')&&!m.querySelector('select')){m.querySelector('textarea').value='Testantwoord met genoeg tekens';click([...m.querySelectorAll('button.go')].find(b=>b.textContent==='Nakijken'));await w(50);m.querySelectorAll('.selfscore input').forEach(i=>{i.checked=true;i.dispatchEvent(new Event('change'))});}
 else if(m.querySelector('select')){m.querySelectorAll('select').forEach(s=>{s.value=s.options.length-1>2?'2':'1';});click([...m.querySelectorAll('button.go')].find(b=>b.textContent==='Nakijken'));}
 else if(m.querySelector('input.num')){m.querySelectorAll('input.num').forEach(i=>i.value='24');click([...m.querySelectorAll('button.go')].find(b=>b.textContent==='Nakijken'));}
 else if(m.querySelector('.chip')){m.querySelectorAll('.row').forEach(r=>click(r.querySelector('.chip')));click([...m.querySelectorAll('button.go')].find(b=>b.textContent==='Nakijken'));}
 else if(mcb){click(mcb);}
 await w(60);const wb=[...m.querySelectorAll('button.ghost')].find(b=>b.textContent.startsWith('Laat zien'));click(wb);await w(60);
 const nx=m.querySelector('.anim .nav button.go');let n=0;if(nx){const k=m.querySelectorAll('.pips span').length;for(;n<k;n++){nx.click();await w(20);}}
 return {waarom:!!wb,anim:n,fb:(m.querySelector('.fb:not([hidden])')||m.querySelector('.score')||{}).textContent?.slice(0,60)};}"""
for niv in sys.argv[1:] or ['havo', 'vwo']:
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 900, 'height': 1400})
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
        pg.on('console', lambda m: m.type == 'error' and 'ERR_' not in m.text and errs.append(m.text))
        pg.add_init_script(f"if(!sessionStorage.getItem('x')){{sessionStorage.setItem('x',1);localStorage.setItem('toets-erfelijkheid-{niv}',JSON.stringify({{scores:{{}},mode:'examen',vrij:true}}))}}")
        pg.goto(f'file://{T}/toets-erfelijkheid-{niv}.html'); pg.wait_for_timeout(400)
        n = pg.evaluate("document.querySelectorAll('#opgs button').length")
        for i in range(n):
            pg.click(f'#opgs button >> nth={i}'); pg.wait_for_timeout(100)
            tabs = pg.evaluate("[...document.querySelectorAll('#tabs button')].map(b=>b.textContent)")
            for k, tb in enumerate(tabs):
                if tb == 'Score': continue
                pg.click(f'#tabs button >> nth={k}'); pg.wait_for_timeout(80)
                r = pg.evaluate(JS); print(f'  {niv} vraag {tb}: {r}')
                pg.screenshot(path=f'{shots}/{niv}-v{tb}.png', full_page=True)
            pg.click('#tabs button.ov'); pg.wait_for_timeout(80)
        print(pg.evaluate("document.querySelector('#main').innerText.split('\\n').filter(l=>l.startsWith('Hele'))"))
        b.close()
    print('FOUTEN:' if errs else 'geen fouten', *errs, sep='\n')
