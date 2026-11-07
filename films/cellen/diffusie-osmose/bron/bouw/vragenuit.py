import asyncio
from playwright.async_api import async_playwright
from PIL import Image
URL = 'http://127.0.0.1:8766/films/cellen/diffusie-osmose/index.html?vragen=uit'
async def main():
    errs = []
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL); await pg.wait_for_timeout(1500)
        info = await pg.evaluate("""()=>{ const out=[]; const SEGS=window.FILMDATA.segments; state.items.forEach((it,i)=>{ if(!it.seg||it.type!=='speech') return; const si=SEGS.findIndex(s=>s.id===it.seg.id); const nx=SEGS[si+1]; if(nx&&nx.kind==='question') out.push({i,id:it.seg.id,dur:it.dur,cuts:it.cuts,start:it.start}); }); return {n:state.items.length,q:state.items.filter(x=>x.type==='question').length,out}; }""")
        print('items', info['n'], 'vragen', info['q'])
        shots = []
        for o in info['out']:
            for dt in [-5, -2, -0.3, 0.5, 3]:
                g = o['start'] + o['dur'] + dt
                await pg.evaluate(f"()=>{{ seekGlobal({g}); }}"); await pg.wait_for_timeout(60)
                cur = await pg.evaluate("()=>{ const it=state.items[state.idx]; return (it.seg?it.seg.id:it.type)+' '+state.local.toFixed(1); }")
                f = f'vu/{o["id"]}_{dt}.png'; el = await pg.query_selector('#stage'); await el.screenshot(path=f); shots.append((f, cur))
            print(o['id'], 'cuts', o['cuts'])
        await b.close()
    ims = [Image.open(f).resize((384, 216)) for f, _ in shots]
    sheet = Image.new('RGB', (384 * 5, 216 * ((len(ims) + 4) // 5)))
    for k, im in enumerate(ims): sheet.paste(im, ((k % 5) * 384, (k // 5) * 216))
    sheet.save('vu/sheet.png'); print('errors', errs)
asyncio.run(main())
