# gebruik: python3 render.py jobs.json   jobs = [{"uit": pad (rel. verbeterronde-3), "s": scene (rel. bibliotheek), "js": [..], "w": 1280}]
import asyncio, sys, json, os
from playwright.async_api import async_playwright
HIER=os.path.dirname(os.path.abspath(__file__))
async def main():
  jobs=json.load(open(sys.argv[1])); port=os.environ['PORT']
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for jb in jobs:
      pg=await b.new_page(viewport={'width':1280,'height':720}); errs=[]
      pg.on('pageerror',lambda e: errs.append(str(e)[:300])); pg.on('console',lambda m: errs.append('console '+m.text[:300]) if m.type=='error' else None)
      q=f"w={jb.get('w',1280)}&s={jb['s']}&js={','.join(jb.get('js',[]))}&pal={jb.get('pal','B')}"
      await pg.goto(f'http://localhost:{port}/bibliotheek/verbeterronde-3/h.html?{q}')
      try: await pg.evaluate('window.KLAAR')
      except Exception as e: errs.append(str(e)[:300])
      await pg.wait_for_timeout(200)
      uit=os.path.join(HIER,jb['uit']); os.makedirs(os.path.dirname(uit),exist_ok=True)
      await (await pg.query_selector('#c')).screenshot(path=uit)
      print(jb['uit'], 'OK' if not errs else errs[:3]); await pg.close()
    await b.close()
asyncio.run(main())
