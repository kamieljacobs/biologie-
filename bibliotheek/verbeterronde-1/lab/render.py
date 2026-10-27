import asyncio, sys, json, os, random
from playwright.async_api import async_playwright
D=os.path.dirname(os.path.abspath(__file__)); BASE='http://localhost:8797'+D
objs=sys.argv[1:]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
    for o in objs:
      sk=os.path.join(D,o,'sleutel.json')
      if not os.path.exists(sk):
        v=['A','B'] if os.path.exists(os.path.join(D,o,'B.js')) else ['A']; random.shuffle(v)
        json.dump(dict(zip('XYZ',v)),open(sk,'w'))
      key=json.load(open(sk))
      for L,v in key.items():
        errs.clear()
        await pg.goto(f'{BASE}/harness.html?obj={o}&v={v}'); await pg.wait_for_function('window.KLAAR',timeout=15000)
        f=await pg.evaluate('window.FOUT||""')
        await pg.screenshot(path=os.path.join(D,o,L+'.png'))
        print(o,L,v,'FOUT:'+f[:300] if f else 'ok', errs[:3])
    await b.close()
asyncio.run(main())
from PIL import Image
for o in objs:
  key=json.load(open(os.path.join(D,o,'sleutel.json'))); ims=[Image.open(os.path.join(D,o,L+'.png')) for L in sorted(key)]
  W=Image.new('RGB',(1280,360*((len(ims)+1)//2)))
  for i,im in enumerate(ims): W.paste(im.resize((640,360)),((i%2)*640,(i//2)*360))
  W.save(os.path.join(D,'_kijk_'+o+'.png'))
