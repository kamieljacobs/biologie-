import asyncio, os, sys
from playwright.async_api import async_playwright
# Vragen uit: welke knippen maakt de speler, en stills rond elke vraagplek
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        await pg.goto('file://' + os.path.abspath('film/standalone.html') + '?vragen=uit'); await pg.wait_for_timeout(2500)
        it = await pg.evaluate("state.items.map(it=>({t:it.type,id:it.seg?it.seg.id:null,dur:+it.dur.toFixed(2),cuts:it.cuts||[]}))")
        for x in it:
            if x['cuts']: print(x['id'], x['dur'], x['cuts'])
        print('vragen in tijdlijn:', [x['id'] for x in it if x['t'] == 'question'])
        os.makedirs('vu', exist_ok=True)
        for sid in ['s07', 's09', 's12', 's14', 's20', 's22', 's28', 's30']:
            for f in [0.05, 0.5, 0.95]:
                ok = await pg.evaluate(f"(()=>{{ const it=state.items.find(i=>i.seg&&i.seg.id==='{sid}'); if(!it) return false; return __still('{sid}', it.dur*{f}, null); }})()")
                el = await pg.query_selector('#stage'); await el.screenshot(path=f'vu/{sid}_{f}.png')
        await b.close()
asyncio.run(main())
