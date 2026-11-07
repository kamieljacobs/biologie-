import asyncio, sys, os
from playwright.async_api import async_playwright
url, out = sys.argv[1], sys.argv[2]; specs = sys.argv[3:]; os.makedirs(out, exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1200})
        await pg.goto(url); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(1200)
        for s in specs:
            sid, t, *ph = s.split('@'); ph = ph[0] if ph else None
            ok = await pg.evaluate("([a,b,c])=>__still(a,b,c)", [sid, float(t), ph])
            if not ok: print('mist', s); continue
            await pg.wait_for_timeout(40); el = await pg.query_selector('#stage')
            await el.screenshot(path=os.path.join(out, f"{sid.replace(':','_').replace(' ','')[:30]}_{float(t):06.2f}.png"))
        await b.close()
asyncio.run(main())
