import sys, asyncio
from playwright.async_api import async_playwright
async def main():
    uit = sys.argv[1]; namen = sys.argv[2:]
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width':1920,'height':1080})
        fouten=[]; pg.on('pageerror', lambda e: fouten.append(str(e))); pg.on('console', lambda m: m.type=='error' and fouten.append(m.text))
        await pg.goto('file://'+__import__('os').path.abspath('kf.html')); await pg.wait_for_timeout(800)
        if not namen: namen = await pg.evaluate('window.namen')
        for n in namen:
            try: await pg.evaluate(f"window.teken('{n}')")
            except Exception as e: print('FOUT', n, e); continue
            await pg.locator('#c').screenshot(path=f'{uit}/{n}.png')
        print('fouten:', fouten[:5]); await b.close()
asyncio.run(main())
