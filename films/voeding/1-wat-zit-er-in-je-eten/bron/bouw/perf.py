import asyncio, os, sys, json
from playwright.async_api import async_playwright
fdir=sys.argv[1]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':800})
        cdp=await pg.context.new_cdp_session(pg); await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
        await pg.goto('file://'+os.path.abspath(os.path.join(fdir,'film','standalone.html'))); await pg.evaluate("document.fonts.ready"); await pg.wait_for_timeout(500)
        res={}
        for sid in ['s04','s05','s10','s17','s20','s25','s31']:
            r=await pg.evaluate(f"""()=>{{ const it=state.items.find(i=>i.seg&&i.seg.id==='{sid}'); const ts=[]; for(let k=0;k<40;k++){{ const t0=performance.now(); state.idx=state.items.indexOf(it); state.local=it.dur*0.2+k*0.033*10; render(); ts.push(performance.now()-t0); }} ts.sort((a,b)=>a-b); return [ts[20],ts[38]]; }}""")
            res[sid]=[round(x,1) for x in r]
        print(res); await b.close()
asyncio.run(main())
