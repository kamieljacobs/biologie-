import asyncio, sys, json
from playwright.async_api import async_playwright
G='/tmp/claude-0/-home-claude/e75e0248-f5fb-529e-a3c8-e7a66e083834/scratchpad/beeldbank/ronde/organen-plant'
PORT=sys.argv[1]; jobs=sys.argv[2:]  # obj:v:out
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
        errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
        for j in jobs:
            parts=j.split(':'); o,v,out=parts[:3]; ex=('&extra='+parts[3]) if len(parts)>3 else ''
            errs.clear()
            await pg.goto(f'http://localhost:{PORT}{G}/test.html?obj={o}&v={v}{ex}'); await pg.wait_for_timeout(500)
            t=await pg.title()
            await (await pg.query_selector('#c')).screenshot(path=f'{G}/{o}/{out}')
            print(o,v,out,t,errs[:3])
        await b.close()
asyncio.run(main())
