import sys, os, asyncio, json
from playwright.async_api import async_playwright
fdir, out = sys.argv[1], sys.argv[2]; specs = sys.argv[3:]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        await pg.goto('file://' + os.path.abspath(os.path.join(fdir, 'film', 'standalone.html'))); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(600)
        for sp in specs:
            sid, t = sp.rsplit(':', 1); await pg.evaluate(f"__still({json.dumps(sid)},{t})"); el = await pg.query_selector('#stage'); await el.screenshot(path=f'{out}/{sid[:6].replace(":","_")}_{t}.png')
        await b.close()
asyncio.run(main())
