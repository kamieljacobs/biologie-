import asyncio, sys, json
from playwright.async_api import async_playwright
W='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/cel-nieuw'
jobs=json.loads(sys.argv[1])  # [[obj, versie, outpath, extra]]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); errs=[]
        for obj,ver,out,*ex in jobs:
            pg=await b.new_page(viewport={'width':1280,'height':720})
            pg.on('pageerror',lambda e: errs.append(f'{obj}/{ver}: '+str(e)))
            pg.on('console',lambda m: errs.append(f'{obj}/{ver} console: '+m.text) if m.type=='error' and '404' not in m.text else None)
            await pg.goto('http://localhost:8817'+W+'/test.html')
            await pg.evaluate(f'laadVersie({json.dumps(ver)})')
            await pg.wait_for_timeout(200)
            await pg.evaluate(f'teken({json.dumps(obj)},{json.dumps(ver)},{json.dumps(ex[0] if ex else None)})')
            await (await pg.query_selector('#c')).screenshot(path=out)
            await pg.close()
        print('fouten',errs[:10]); await b.close()
asyncio.run(main())
