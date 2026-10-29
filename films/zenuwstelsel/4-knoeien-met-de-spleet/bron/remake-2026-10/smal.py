import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); errs=[]
        for w in (375, 360):
            pg = await b.new_page(viewport={'width': w, 'height': 800}); pg.on('pageerror', lambda e: errs.append(str(e)))
            await pg.goto('http://127.0.0.1:8765/films/zenuwstelsel/4-knoeien-met-de-spleet-nieuw.html'); await pg.wait_for_timeout(2000)
            await pg.evaluate("()=>{ seekGlobal(60); }"); await pg.wait_for_timeout(400)
            sw = await pg.evaluate("document.documentElement.scrollWidth"); print(w, 'scrollWidth', sw)
            await pg.screenshot(path=f'/tmp/z4_smal_{w}.png', full_page=False)
        print('fouten', errs[:3]); await b.close()
asyncio.run(main())
