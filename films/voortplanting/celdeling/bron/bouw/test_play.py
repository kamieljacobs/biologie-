import asyncio, os
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg=await b.new_page(viewport={'width':1280,'height':720})
        errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type=='error' and 'ERR_TUNNEL' not in m.text else None)
        await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(1000)
        info=await pg.evaluate("()=>({items:state.items.length,total:state.total,chapters:document.querySelectorAll('#chapters li').length,gloss:document.querySelectorAll('#glossary .term').length})")
        print('vwo timeline',info)
        await pg.evaluate("()=>{ audio.playbackRate=8; play(); }")
        await pg.wait_for_timeout(4000)
        st=await pg.evaluate("()=>({idx:state.idx,local:state.local,type:state.items[state.idx].type,playing:state.playing,audioT:audio.currentTime,paused:audio.paused,src:audio.src.slice(-12)})")
        print('after 4s', st)
        # jump to first question and simulate countdown->wait->answer->reveal
        await pg.evaluate("()=>{ const i=state.items.findIndex(it=>it.type==='question'); gotoItem(i,0); clockStart=performance.now()/1000-8.5; }")
        await pg.wait_for_timeout(300)
        print('q phase', await pg.evaluate("()=>state.qPhase.phase"))
        await pg.evaluate("()=>answer(2)"); await pg.wait_for_timeout(200)
        print('after answer', await pg.evaluate("()=>({phase:state.qPhase.phase,chosen:state.qPhase.chosen})"))
        await pg.evaluate("()=>{ clockStart=performance.now()/1000-20; }"); await pg.wait_for_timeout(400)
        print('advanced to', await pg.evaluate("()=>({idx:state.idx,type:state.items[state.idx].type,id:state.items[state.idx].seg&&state.items[state.idx].seg.id})"))
        # havo mode
        await pg.click('#niveau button[data-v=havo]'); await pg.wait_for_timeout(500)
        info=await pg.evaluate("()=>({items:state.items.length,total:state.total,vwo:state.items.filter(i=>i.level==='vwo').length,idx:state.idx})")
        print('havo timeline',info)
        # fps measure
        fps=await pg.evaluate("()=>new Promise(r=>{ let n=0; const t0=performance.now(); function f(){ n++; if(performance.now()-t0<2000) requestAnimationFrame(f); else r(n/2); } requestAnimationFrame(f); })")
        print('fps', fps)
        print('errors', errs[:5])
        await b.close()
asyncio.run(main())
