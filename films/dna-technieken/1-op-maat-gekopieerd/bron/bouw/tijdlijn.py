import sys, os, asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.abspath('film/film/standalone.html')); await pg.wait_for_timeout(800)
        for niv in ['vwo','havo']:
            for vr in ['aan','uit']:
                r = await pg.evaluate(f"()=>{{ state.niveau='{niv}'; state.vragen='{vr}'; buildTimeline(); return [state.total, state.items.length, state.items.filter(i=>i.type==='card').map(i=>i.chapter.slice(0,12)).join('|')]; }}")
                print(niv, vr, round(r[0],1), r[1], r[2])
        print(errs)
        await b.close()
asyncio.run(main())
