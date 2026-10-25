import sys, os, asyncio
from playwright.async_api import async_playwright
from PIL import Image
OUT=sys.argv[1]; ids=sys.argv[2:]; os.makedirs(OUT,exist_ok=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080})
        pg.on('pageerror', lambda e: print('PAGEERROR', e)); pg.on('console', lambda m: print('C',m.text) if m.type=='error' else None)
        await pg.goto('file://'+os.path.abspath('kf/kf.html')); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(600)
        for i in ids:
            await pg.evaluate(f"teken('{i.split(':')[0]}')"); await pg.wait_for_timeout(80)
            f=f'{OUT}/{i.split(":")[1] if ":" in i else i}.png'; await (await pg.query_selector('canvas')).screenshot(path=f)
            Image.open(f).convert('RGB').resize((960,540),Image.LANCZOS).save(f.replace('.png','.webp'),quality=78); os.remove(f)
        await b.close()
asyncio.run(main())
