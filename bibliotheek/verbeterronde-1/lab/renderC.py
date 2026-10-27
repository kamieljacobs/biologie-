import asyncio, sys, os
from playwright.async_api import async_playwright
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__)); BASE='http://localhost:8797'+D
objs=sys.argv[1:]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    for o in objs:
      errs.clear(); await pg.goto(f'{BASE}/harness.html?obj={o}&v=C'); await pg.wait_for_function('window.KLAAR',timeout=15000)
      f=await pg.evaluate('window.FOUT||""'); await pg.screenshot(path=os.path.join(D,o,'C.png')); print(o,'FOUT:'+f[:300] if f else 'ok',errs[:3])
    await b.close()
asyncio.run(main())
for o in objs:
  Image.open(os.path.join(D,o,'C.png')).resize((960,540)).save(os.path.join(D,'_kijkC_'+o+'.png'))
