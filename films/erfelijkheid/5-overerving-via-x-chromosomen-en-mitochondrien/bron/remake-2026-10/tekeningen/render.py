"""python3 render.py <werkmap> <outdir> id[:naam] ...  → webp, 960 px breed.
Zet kf.html + nieuw_erf5.js en de libs (engine van Chromosomen 2.1, personages/lib_cast.js, bibliotheek/lib_bio.js) in <werkmap> en rendert daar."""
import sys, os, asyncio, shutil
from playwright.async_api import async_playwright
from PIL import Image
wm, out = sys.argv[1], sys.argv[2]; specs = sys.argv[3:]; os.makedirs(out, exist_ok=True); os.makedirs(wm, exist_ok=True)
here = os.path.dirname(os.path.abspath(__file__)); repo = os.path.abspath(os.path.join(here, *['..'] * 6))
eng = os.path.join(repo, 'films/erfelijkheid/1-chromosomen/bron/src')
for f in ['lib.js', 'lib_voeding.js', 'lib_micro_evo.js', 'teken_chr1.js', 'fonts.css']: shutil.copy(os.path.join(eng, f), wm)
shutil.copy(os.path.join(repo, 'personages/lib_cast.js'), wm); shutil.copy(os.path.join(repo, 'bibliotheek/lib_bio.js'), wm)
for f in ['kf.html', 'nieuw_erf5.js']: shutil.copy(os.path.join(here, f), wm)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append('console: ' + m.text) if m.type == 'error' else None)
        for s in specs:
            sid, naam = (s.split(':') + [s])[:2]
            await pg.goto('file://' + os.path.join(os.path.abspath(wm), 'kf.html') + '#' + sid); await pg.reload()
            await pg.wait_for_function('window.KLAAR === true', timeout=15000)
            png = os.path.join(out, naam + '.png'); await (await pg.query_selector('canvas')).screenshot(path=png)
            Image.open(png).convert('RGB').resize((960, 540), Image.LANCZOS).save(os.path.join(out, naam + '.webp'), 'WEBP', quality=80); os.remove(png); print('ok', naam)
        if errs: print('ERRORS', errs[:8])
        await b.close()
asyncio.run(main())
