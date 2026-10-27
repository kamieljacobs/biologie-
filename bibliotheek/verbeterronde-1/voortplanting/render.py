# gebruik: python3 render.py obj [obj...]   (rendert oud/A/B volgens sleutel.json, of preview als geen sleutel: oud.png A.png B.png in _p/)
import asyncio, sys, json, os
from playwright.async_api import async_playwright
BASE='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/voortplanting'
PORT=int(os.environ.get('PORT','8811'))
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); errs=[]
    for obj in sys.argv[1:]:
      d=f'{BASE}/{obj}'
      vs=[('oud',None)]+[(v,v+'.js') for v in 'AB' if os.path.exists(f'{d}/{v}.js')]
      sl=f'{d}/sleutel.json'; key=json.load(open(sl)) if os.path.exists(sl) else None
      os.makedirs(f'{d}/_p',exist_ok=True)
      for naam,f in vs:
        pg=await b.new_page(viewport={'width':1280,'height':720})
        pg.on('pageerror',lambda e,o=obj,n=naam: errs.append(f'{o}/{n}: {e}'))
        pg.on('console',lambda m,o=obj,n=naam: errs.append(f'{o}/{n} console: {m.text}') if m.type=='error' else None)
        url=f'http://localhost:{PORT}{BASE}/h.html?d={d}'+(f'&v={f}' if f else '')
        await pg.goto(url)
        try: await pg.evaluate('window.KLAAR')
        except Exception as e: errs.append(f'{obj}/{naam}: {str(e)[:200]}')
        await pg.wait_for_timeout(150)
        await (await pg.query_selector('#c')).screenshot(path=f'{d}/_p/{naam}.png')
        if key:
          for L,v in key.items():
            if v==naam: await (await pg.query_selector('#c')).screenshot(path=f'{d}/{L}.png')
        await pg.close()
    print('fouten:',errs if errs else 'geen'); await b.close()
asyncio.run(main())
