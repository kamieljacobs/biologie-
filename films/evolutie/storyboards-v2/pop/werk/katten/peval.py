"""python3 peval.py <files> <js-expressie>  (vanuit /home/claude/evo2) -> print JSON-resultaat"""
import sys, os, asyncio, json
from playwright.async_api import async_playwright
F, expr = sys.argv[1], sys.argv[2]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: print('LOG', m.text))
        await pg.goto('file://' + os.path.abspath('render.html') + '?f=' + F); await pg.evaluate('window.__ready')
        r = await pg.evaluate(expr); print(json.dumps(r))
        if errs: print('ERRORS', errs[:5])
        await b.close()
asyncio.run(main())
