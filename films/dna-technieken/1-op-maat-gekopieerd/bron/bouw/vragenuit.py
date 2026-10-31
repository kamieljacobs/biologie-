import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        await pg.goto('http://localhost:8765/standalone.html?vragen=uit'); await pg.wait_for_timeout(1500)
        # laad de energie-enveloppen voor alle segmenten
        await pg.evaluate("()=>{ for(const s of DATA.segments) if(s.audio) knipEnv(s); }"); await pg.wait_for_timeout(5000)
        await pg.evaluate("()=>{ buildTimeline(); }")
        r = await pg.evaluate("""()=>state.items.filter(it=>it.type==='speech'&&it.cuts&&it.cuts.length).map(it=>({id:it.seg.id, cuts:it.cuts.map(c=>[+c[0].toFixed(2),+c[1].toFixed(2)]), weg:it.seg.words.filter(w=>it.cuts.some(c=>w.s>=c[0]-0.02&&w.s<c[1]-0.02)).map(w=>w.t).join(' '), blijft:it.seg.words.filter(w=>!it.cuts.some(c=>w.s>=c[0]-0.02&&w.s<c[1]-0.02)).slice(0,6).map(w=>w.t).join(' ')}))""")
        for x in r: print(x['id'], x['cuts'], '| WEG:', x['weg'], '| BLIJFT:', x['blijft'])
        print('totaal', await pg.evaluate("state.total"))
        await b.close()
asyncio.run(main())
