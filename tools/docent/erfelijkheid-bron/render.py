#!/usr/bin/env python3
"""Fotografeert elke stap van een les in eindstand en maakt per les contactvellen.
Gebruik: python3 render.py <n> [--havo] [--licht] [--scherm i,j] [--breed 960]
Uit: shots/les<n>[-havo][-licht]/s<scherm>_<stap>.png en vel_<k>.png (6 beelden per vel, met tekst eronder),
plus console-fouten op stdout. Server: python3 -m http.server <poort> in de repo (--poort, standaard 8765)."""
import asyncio, sys, os, json
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont

n = int(sys.argv[1]); havo = '--havo' in sys.argv; licht = '--licht' in sys.argv
breed = int(sys.argv[sys.argv.index('--breed') + 1]) if '--breed' in sys.argv else 960
poort = sys.argv[sys.argv.index('--poort') + 1] if '--poort' in sys.argv else '8765'
alleen = [int(x) for x in sys.argv[sys.argv.index('--scherm') + 1].split(',')] if '--scherm' in sys.argv else None
uit = os.path.join('/tmp', 'erfelijkheid-shots', f'les{n}' + ('-havo' if havo else '') + ('-licht' if licht else ''))
os.makedirs(uit, exist_ok=True)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': breed + 80, 'height': int(breed * 9 / 16) + 400})
        fouten = []
        pg.on('console', lambda m: fouten.append(m.text) if m.type == 'error' else None)
        pg.on('pageerror', lambda e: fouten.append('PAGEERROR ' + str(e)))
        await pg.goto(f'http://localhost:{poort}/tools/docent/erfelijkheid-{n}/index.html?niveau={"havo" if havo else "vwo"}')
        if licht: await pg.evaluate("()=>{localStorage.setItem('thema','light');}"); await pg.reload()
        await pg.wait_for_timeout(1500)
        N = await pg.evaluate('()=>__les.n()'); beelden = []
        for i in range(N):
            if alleen and i not in alleen: continue
            k = await pg.evaluate(f'()=>__les.stappen({i})')
            for j in range(k):
                await pg.evaluate(f'()=>__les.naar({i},{j})'); await pg.wait_for_timeout(260)
                pad = os.path.join(uit, f's{i:02d}_{j}.png'); await (await pg.query_selector('#stage')).screenshot(path=pad)
                tekst = await pg.evaluate("()=>document.getElementById('capTxt').innerText")
                beelden.append((pad, f'{i + 1}.{j + 1}  {tekst}'))
        await b.close()
    print('stappen:', len(beelden)); print('fouten:', len(fouten)); [print('  ', f[:300]) for f in fouten[:20]]
    # contactvellen: 2 kolommen × 3 rijen, beeld 760 breed met 2 regels tekst
    try: font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 15)
    except Exception: font = ImageFont.load_default()
    W, Hb, Ht = 760, 428, 46
    for v in range(0, len(beelden), 6):
        vel = Image.new('RGB', (W * 2 + 10, (Hb + Ht) * 3), (30, 30, 30)); d = ImageDraw.Draw(vel)
        for q, (pad, t) in enumerate(beelden[v:v + 6]):
            im = Image.open(pad).convert('RGB').resize((W, Hb)); x, y = (q % 2) * (W + 10), (q // 2) * (Hb + Ht); vel.paste(im, (x, y))
            regels = [t[:105], t[105:210]]; [d.text((x + 6, y + Hb + 4 + r * 19), s, fill=(235, 235, 235), font=font) for r, s in enumerate(regels)]
        vel.save(os.path.join(uit, f'vel_{v // 6:02d}.png'))
    print('vellen in', uit)
asyncio.run(main())
