"""python3 render.py <bestand> <OBJECT> [sleutels...]  → out/<bestand>/<sleutel>.webp (1280×720) ; zonder sleutels: alle"""
import sys, os, asyncio
from playwright.async_api import async_playwright
from PIL import Image
f, obj, keys = sys.argv[1], sys.argv[2], sys.argv[3:]
out = os.path.join('out', f); os.makedirs(out, exist_ok=True)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto('file://' + os.path.abspath('render.html') + '?f=' + f)
        await pg.evaluate('window.__ready'); await pg.evaluate("Promise.all(['700 64px Fraunces','400 36px \"Source Sans 3\"','600 36px \"Source Sans 3\"','700 36px \"Source Sans 3\"','800 36px \"Source Sans 3\"','500 28px \"IBM Plex Mono\"'].map(f=>document.fonts.load(f)))"); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
        ks = keys or await pg.evaluate(f'__keys({obj!r})')
        for k in ks:
            try: await pg.evaluate(f'__draw({obj!r}, {k!r}, 0)')
            except Exception as e: print('FOUT', k, str(e)[:300]); continue
            png = os.path.join(out, k + '.png'); await (await pg.query_selector('#c')).screenshot(path=png)
            Image.open(png).convert('RGB').resize((1280, 720), Image.LANCZOS).save(os.path.join(out, k + '.webp'), quality=82); os.remove(png)
        if errs: print('ERRORS', errs[:8])
        await b.close(); print('klaar', len(ks))
asyncio.run(main())
