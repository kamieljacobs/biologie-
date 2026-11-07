import asyncio, sys, json, os
from playwright.async_api import async_playwright
W=os.path.dirname(os.path.abspath(__file__)); PORT=int(sys.argv[1]); objs=sys.argv[2:]
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
    errs=[]; pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None); pg.on('requestfailed',lambda r: errs.append('FAIL '+r.url)); pg.on('pageerror',lambda e: errs.append(str(e)))
    for o in objs:
      sl={'C':'C'} if os.environ.get('ALLEENC') else json.load(open(f'{W}/{o}/sleutel.json'))
      for letter,v in sl.items():
        errs.clear(); await pg.goto(f'http://localhost:{PORT}{W}/page.html?obj={o}&v={v}')
        try: await pg.wait_for_function('window.KLAAR',timeout=8000)
        except Exception as e: print('TIMEOUT',o,v,errs[:5]); continue
        await pg.wait_for_timeout(200)
        await pg.screenshot(path=f'{W}/{o}/{letter}.png')
        print(o,letter,v,'fouten:',errs[:3])
    await b.close()
asyncio.run(main())
