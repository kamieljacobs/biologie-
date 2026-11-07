import asyncio, os
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':1920,'height':1080})
        await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(800)
        print(await pg.evaluate("()=>({boardTimes:state.boardTimes.map(x=>x.toFixed(1)), vwoStarts:state.items.filter((it,i)=>it.level==='vwo'&&(i===0||state.items[i-1].level!=='vwo')).map(it=>[it.seg.id,it.start.toFixed(1)])})"))
        # determinism: render twice at same time after different paths
        await pg.evaluate("()=>{ gotoItem(5,10); state.local=10; render(); }"); a=await pg.evaluate("()=>document.getElementById('stage').toDataURL().length")
        await pg.evaluate("()=>{ gotoItem(5,30); state.local=30; render(); gotoItem(5,10); state.local=10; render(); }"); b2=await pg.evaluate("()=>document.getElementById('stage').toDataURL().length")
        print('determinism same length', a==b2)
        # throttled performance
        cdp=await pg.context.new_cdp_session(pg); await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
        await pg.evaluate("()=>{ gotoItem(14,5); state.local=5; }")
        stats=await pg.evaluate("()=>new Promise(r=>{ const ts=[]; let last=performance.now(); let n=0; function f(){ const now=performance.now(); ts.push(now-last); last=now; state.local+=0.016; render(); if(++n<90) requestAnimationFrame(f); else r({max:Math.max(...ts.slice(5)).toFixed(1),avg:(ts.slice(5).reduce((a,b)=>a+b,0)/(ts.length-5)).toFixed(1)}); } requestAnimationFrame(f); })")
        print('frame ms at 4x throttle (H6 timelapse)', stats)
        await cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
        await b.close()
        # phone sideways + portrait
        b=await p.chromium.launch()
        for (w,h,name) in [(844,390,'phone_landscape'),(390,844,'phone_portrait')]:
            pg=await b.new_page(viewport={'width':w,'height':h},device_scale_factor=2,is_mobile=True,has_touch=True)
            await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(800)
            await pg.evaluate("()=>{ gotoItem(5,20); state.local=20; render(); }")
            await pg.screenshot(path=f'qa/{name}.png')
            await pg.evaluate("()=>{ gotoItem(1,2); state.local=2; state.qPhase={phase:'wait',start:0,chosen:null}; render(); }")
            await pg.screenshot(path=f'qa/{name}_q.png')
        await b.close()
asyncio.run(main())
