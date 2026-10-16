import asyncio, os, json
from playwright.async_api import async_playwright
OUT='../na'
async def main():
    errs=[]
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg=await b.new_page(viewport={'width':1280,'height':900})
        pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
        pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
        # serve via http for audio
        await pg.goto('http://127.0.0.1:8765/film/index.html'); await pg.wait_for_timeout(1500)
        r=await pg.evaluate("()=>({total:state.total, n:state.items.length})"); print('vwo',r)
        await pg.click('#niveau button[data-v=havo]'); await pg.wait_for_timeout(300)
        print('havo',await pg.evaluate("()=>({total:state.total, vwoItems:state.items.filter(i=>i.level==='vwo').length})"))
        await pg.click('#niveau button[data-v=vwo]'); await pg.wait_for_timeout(300)
        await pg.click('#vragen button[data-v=uit]'); await pg.wait_for_timeout(300)
        print('vragen uit',await pg.evaluate("()=>({total:state.total, q:state.items.filter(i=>i.type==='question').length})"))
        await pg.click('#vragen button[data-v=aan]'); await pg.wait_for_timeout(300)
        # play + seek
        await pg.click('#play'); await pg.wait_for_timeout(1500)
        t1=await pg.evaluate("()=>state.items[state.idx].start+state.local")
        await pg.evaluate("()=>seekGlobal(state.items.find(i=>i.seg&&i.seg.id==='s21').start+12)"); await pg.wait_for_timeout(1500)
        t2=await pg.evaluate("()=>({g:state.items[state.idx].start+state.local, id:state.items[state.idx].seg&&state.items[state.idx].seg.id, a:document.getElementById('narration').currentTime, paused:document.getElementById('narration').paused})")
        print('play',round(t1,2),'seek',t2)
        await pg.screenshot(path=OUT+'/speler_s21.png')
        # question q19: jump and answer
        await pg.evaluate("()=>{ const i=state.items.findIndex(i=>i.seg&&i.seg.id==='q19'); gotoItem(i,0); }"); await pg.wait_for_timeout(500)
        await pg.mouse.click(*(await pg.evaluate("()=>{ const c=document.getElementById('stage').getBoundingClientRect(); return [c.left+c.width*0.5, c.top+c.height*(430+112+48)/1080]; }")))
        await pg.wait_for_timeout(800)
        print('q19',await pg.evaluate("()=>({ph:state.qPhase&&state.qPhase.phase, chosen:state.qPhase&&state.qPhase.chosen, explain:state.items[state.idx].seg.explain})"))
        await pg.screenshot(path=OUT+'/speler_q19.png')
        await pg.click('#play'); await b.close()
        b=await p.chromium.launch()
        for niv in ['vwo']:
            pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
            pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
            await pg.goto('http://127.0.0.1:8765/film/index.html'); await pg.wait_for_timeout(1200)
            print('390 scrollWidth',await pg.evaluate("()=>[document.documentElement.scrollWidth, document.body.scrollWidth, innerWidth]"))
            await pg.evaluate("()=>{ const i=state.items.findIndex(i=>i.seg&&i.seg.id==='s21'); gotoItem(i,20); state.local=20; render(); }")
            await pg.screenshot(path=OUT+'/telefoon_390_s21.png')
            await pg.evaluate("()=>{ const i=state.items.findIndex(i=>i.seg&&i.seg.id==='s32'); gotoItem(i,9.6); state.local=9.6; render(); }")
            await pg.screenshot(path=OUT+'/telefoon_390_s32.png')
            await pg.evaluate("()=>document.querySelector('.tabelkader').scrollIntoView()"); await pg.wait_for_timeout(200)
            await pg.screenshot(path=OUT+'/telefoon_390_docent.png')
        await b.close()
    print('errors:',[e for e in errs if 'goatcounter' not in e])
asyncio.run(main())
