"""python3 render.py <outdir> id[:naam] ...  → webp, 960 px breed. kf.html, nieuw_erf3.js en de libs (lib.js, lib_cast.js, lib_bio.js, lib_dieren.js, fonts.css) in dezelfde map."""
import sys, os, asyncio
from playwright.async_api import async_playwright
from PIL import Image
out = sys.argv[1]; os.makedirs(out, exist_ok=True); specs = sys.argv[2:]
here = os.path.dirname(os.path.abspath(__file__))
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' else None)
        for s in specs:
            sid, naam = (s.split(':') + [s])[:2]
            await pg.goto('file://' + os.path.join(here, 'kf.html') + '#' + sid)
            await pg.reload()
            await pg.wait_for_function('window.KLAAR === true', timeout=10000)
            png = os.path.join(out, naam + '.png'); await (await pg.query_selector('canvas')).screenshot(path=png)
            im = Image.open(png).convert('RGB').resize((960, 540), Image.LANCZOS); im.save(os.path.join(out, naam + '.webp'), 'WEBP', quality=80); os.remove(png)
            print('ok', naam)
        if errs: print('ERRORS', errs[:8])
        await b.close()
asyncio.run(main())
