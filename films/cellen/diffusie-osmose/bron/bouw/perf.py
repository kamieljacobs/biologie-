import asyncio, os, json
from playwright.async_api import async_playwright
d=json.load(open('filmdata.json'))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
        await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(1000)
        cdp=await pg.context.new_cdp_session(pg); await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
        out=[]
        for s in d['segments']:
            if s['kind']!='speech': continue
            ms=await pg.evaluate(f"""()=>{{ const i=state.items.findIndex(it=>it.seg&&it.seg.id==='{s['id']}'); gotoItem(i,{s['dur']*0.6}); render(); const t0=performance.now(); for(let k=0;k<20;k++){{ state.local={s['dur']*0.6}+k*0.03; render(); }} return (performance.now()-t0)/20; }}""")
            out.append((s['id'],round(ms,1)))
        print(sorted(out,key=lambda x:-x[1])[:8])
        await b.close()
asyncio.run(main())
