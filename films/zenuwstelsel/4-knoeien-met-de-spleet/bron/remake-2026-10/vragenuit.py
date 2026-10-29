import asyncio, json, sys, subprocess, os
from playwright.async_api import async_playwright
URL = 'http://127.0.0.1:8765/films/zenuwstelsel/4-knoeien-met-de-spleet-nieuw.html?vragen=uit'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        pg = await b.new_page(viewport={'width': 1280, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(2500)
        info = await pg.evaluate("""()=>state.items.map(it=>({type:it.type,id:it.seg?it.seg.id:null,start:it.start,dur:it.dur,cuts:it.cuts||[],
            kept:it.seg&&it.seg.words?it.seg.words.filter(w=>!(it.cuts||[]).some(c=>w.s>=c[0]-0.02&&w.s<c[1]-0.02)).map(w=>w.t).join(' '):''}))""")
        print('items', len(info), 'question items:', sum(1 for i in info if i['type']=='question'), 'totaal', round(sum(i['dur'] for i in info),1))
        for i in info:
            if i['id'] in ('s03','s05','s06','s08','s10','s12','s13','s15','s16','s18'): print(i['id'], round(i['dur'],1), '|', i['kept'][:110])
        # echt afspelen rond elke (weggevallen) vraag: 5 s voor het eind van de vraagzin-alinea tot 5 s erna
        for qid, aid in [('s03','s05'),('s06','s08'),('s10','s12'),('s13','s15'),('s16','s18')]:
            it = next(x for x in info if x['id']==aid); g0 = it['start'] - 5
            await pg.evaluate(f"()=>{{ seekGlobal({g0}); state.started=true; play(); }}"); log = []
            for k in range(40):
                await pg.wait_for_timeout(250)
                r = await pg.evaluate("""()=>{ const it=state.items[state.idx]; if(!it||it.type!=='speech') return [it?it.type:'-', '']; const t=state.local; const w=(it.seg.words||[]).find(w=>t>=w.s&&t<w.e+0.05); const muted=document.getElementById('narration').muted; return [it.seg.id, (w?w.t:'')+(muted?' [stil]':'')]; }""")
                if not log or log[-1] != r: log.append(r)
            await pg.evaluate("()=>pause()")
            print(qid, '->', aid, ' '.join(f"{a}:{b}" for a, b in log if b)[:400])
        print('fouten', errs[:3]); await b.close()
asyncio.run(main())
