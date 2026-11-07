import asyncio, os, sys
from playwright.async_api import async_playwright
fdir=sys.argv[1]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); ctxt=await b.new_context(viewport={'width':844,'height':390},device_scale_factor=3,is_mobile=True,has_touch=True)
        pg=await ctxt.new_page(); await pg.goto('file://'+os.path.abspath(os.path.join(fdir,'film','standalone.html'))); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(600)
        await pg.evaluate("__still('s20',28)"); await pg.wait_for_timeout(100); await pg.evaluate("render()"); await pg.evaluate("document.getElementById('playerwrap').scrollIntoView()"); await pg.wait_for_timeout(200)
        await pg.screenshot(path=os.path.join(fdir,'frames','telefoon_s20.png')); await b.close()
asyncio.run(main())
