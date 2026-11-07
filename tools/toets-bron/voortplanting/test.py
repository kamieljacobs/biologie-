#!/usr/bin/env python3
"""Opent elke vraag (vrij doorklikken), opent de stofuitleg, klikt 'Toon hulpvragen' niet; meldt fouten, punten en schermafdrukken."""
import sys, os
from playwright.sync_api import sync_playwright
T = __import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','..'))
shots = '/tmp/toets-vp-shots'; os.makedirs(shots, exist_ok=True)
for niv in sys.argv[1:] or ['havo', 'vwo']:
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 900, 'height': 1200})
        pg.on('console', lambda m: m.type == 'error' and 'teller' not in m.text and 'ERR_' not in m.text and errs.append(m.text))
        pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
        pg.add_init_script(f"localStorage.setItem('toets-voortplanting-{niv}',JSON.stringify({{scores:{{}},mode:'hulp',vrij:true}}))")
        pg.goto(f'file://{T}/toets-voortplanting-{niv}.html'); pg.wait_for_timeout(500)
        info = pg.evaluate("(()=>{const o=[...document.querySelectorAll('#opgs button')].map(b=>b.textContent);return o})()")
        print(niv, 'opgaven:', info)
        tot = 0
        for i, t in enumerate(info):
            pg.click(f'#opgs button >> nth={i}'); pg.wait_for_timeout(150)
            if i == 0 or True: pg.screenshot(path=f'{shots}/{niv}-opg{i+1}-ctx.png', full_page=False)
            tabs = pg.evaluate("[...document.querySelectorAll('#tabs button')].map(b=>b.textContent)")
            for k, tb in enumerate(tabs):
                if tb == 'Score': continue
                pg.click(f'#tabs button >> nth={k}'); pg.wait_for_timeout(120)
                d = pg.evaluate("""(()=>{const m=document.querySelector('#main');const st=m.querySelector('details.stof');if(st)st.open=true;
                  return {pts:m.querySelector('.papier .pkop .mono:last-child')?.textContent,think:m.querySelectorAll('.think .step').length,stof:!!st,herhaal:!!m.querySelector('.herhaal')}})()""")
                pg.wait_for_timeout(80)
                print(f'  opg {i+1} vraag {tb}: {d}')
                tot += int(d['pts'].split()[0])
        # alles op de telefoon: geen horizontaal scrollen
        pg.set_viewport_size({'width': 375, 'height': 800}); pg.wait_for_timeout(200)
        sw = pg.evaluate('document.documentElement.scrollWidth')
        print('  totaal punten', tot, '· scrollWidth 375 ->', sw)
        b.close()
    print('FOUTEN:' if errs else 'geen fouten', *errs, sep='\n')
