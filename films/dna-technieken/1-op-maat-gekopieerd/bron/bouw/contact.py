"""contact.py <filmdir> <uit.png> <niveau> id[:n] ... : n stills per segment (gelijk verdeeld), getegeld 4 breed, 480x270."""
import sys, os, asyncio, json
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw
fdir, out, niv = sys.argv[1], sys.argv[2], sys.argv[3]; specs = sys.argv[4:]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.abspath(os.path.join(fdir, 'film', 'standalone.html'))); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(700)
        await pg.evaluate(f"()=>{{ state.niveau='{niv}'; buildTimeline(); }}")
        items = await pg.evaluate("__items()"); dur = {i['id']: i['dur'] for i in items if i['id']}
        shots = []
        for sp in specs:
            sid, n = (sp.split(':') + ['6'])[:2]; n = int(n)
            if sid not in dur and not sid.startswith(('title','end')): print('niet in tijdlijn', sid); continue
            d = dur.get(sid, 5)
            for k in range(n):
                t = d * (k + 0.5) / n if n > 1 else d * 0.5
                ok = await pg.evaluate(f"__still({json.dumps(sid)},{t})")
                if not ok: continue
                await pg.wait_for_timeout(30); el = await pg.query_selector('#stage'); f = f'/tmp/_c_{len(shots)}.png'; await el.screenshot(path=f); shots.append((f, f'{sid} {t:.1f}'))
        if errs: print('FOUTEN', errs[:5])
        await b.close()
    c = 4; Wd, Hd = 480, 270; r = (len(shots) + c - 1) // c; im = Image.new('RGB', (Wd * c, (Hd + 18) * r)); d = ImageDraw.Draw(im)
    for i, (f, lab) in enumerate(shots):
        x, y = (i % c) * Wd, (i // c) * (Hd + 18); im.paste(Image.open(f).resize((Wd, Hd)), (x, y + 18)); d.text((x + 4, y + 2), lab, fill=(255, 255, 0))
    im.save(out); print(out, len(shots))
asyncio.run(main())
