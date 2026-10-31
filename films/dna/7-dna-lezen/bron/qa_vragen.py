import asyncio, os, json, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); out = {}
        for q in ['vragen=uit&niveau=vwo', 'vragen=uit&niveau=havo', 'vragen=aan&niveau=vwo', 'vragen=aan&niveau=havo']:
            pg = await b.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto('file://' + os.path.abspath('film/standalone.html') + '?' + q); await pg.wait_for_timeout(600)
            r = await pg.evaluate("state.items.map(it=>({type:it.type,id:it.seg&&it.seg.id,dur:+it.dur.toFixed(2),cuts:(it.cuts||[]).map(c=>c.map(x=>+x.toFixed(2)))}))")
            tot = sum(x['dur'] for x in r); print(q, 'items', len(r), 'totaal %.0f s = %.1f min' % (tot, tot / 60), 'errors', errs[:3])
            if 'uit&niveau=vwo' in q:
                for x in r:
                    if x['cuts'] or x['type'] == 'question': print('  ', x)
                print('  vraagsegmenten:', [x['id'] for x in r if x['id'] and x['id'].startswith('v') and x['id'][1:].isdigit()])
            await pg.close()
        await b.close()
asyncio.run(main())
