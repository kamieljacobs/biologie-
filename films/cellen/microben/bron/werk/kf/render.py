# python3 render.py <naam> [<naam> ...] → kf/<naam>.png ; naam = sleutel in KF (kf_mi.js)
import sys, asyncio, os
from playwright.async_api import async_playwright
D = os.path.dirname(os.path.abspath(__file__))
async def main(names):
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        msgs = []; pg.on('console', lambda m: msgs.append(m.text)); pg.on('pageerror', lambda e: msgs.append('ERR ' + str(e)))
        await pg.goto('file://' + D + '/kf.html'); await pg.wait_for_timeout(400)
        for n in names:
            await pg.evaluate(f"(()=>{{const c=document.getElementById('c'),x=c.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,1920,1080);KF['{n}'](x);}})()")
            await pg.locator('#c').screenshot(path=os.path.join(D, n + '.png'))
        print('\n'.join(msgs[:20])); await b.close()
asyncio.run(main(sys.argv[1:]))
