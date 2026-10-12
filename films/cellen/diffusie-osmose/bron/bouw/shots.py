"""Render stills of the film at given (segment id, local time) pairs. Usage: python3 shots.py out_dir spec... where spec = segid:time[:niveau]"""
import sys, os, json, asyncio
from playwright.async_api import async_playwright
OUT=sys.argv[1]; specs=sys.argv[2:]
os.makedirs(OUT,exist_ok=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium' if os.path.exists('/opt/pw-browsers/chromium/chrome') else None)
        pg=await b.new_page(viewport={'width':1920,'height':1080})
        pg.on('console', lambda m: print('CONSOLE', m.type, m.text) if m.type in ('error','warning') else None)
        pg.on('pageerror', lambda e: print('PAGEERROR', e))
        await pg.goto('file://'+os.path.abspath('film/index.html'))
        await pg.wait_for_timeout(1500)
        for sp in specs:
            parts=sp.split(':'); sid=parts[0]; t=float(parts[1]); niv=parts[2] if len(parts)>2 else 'vwo'
            await pg.evaluate(f"""()=>{{ state.niveau='{niv}'; buildTimeline(); const i=state.items.findIndex(it=>(it.seg&&it.seg.id==='{sid}')||it.type==='{sid}'||(it.type==='card'&&it.chapter.startsWith('{sid}'))); gotoItem(i,{t}); state.local={t}; if(state.items[i].type==='question'){{ state.qPhase={{phase:'{parts[3] if len(parts)>3 else 'countdown'}',start:0,chosen:{parts[4] if len(parts)>4 else 'null'}}}; }} render(); }}""")
            await pg.wait_for_timeout(120)
            # screenshot only the canvas
            el=await pg.query_selector('#stage')
            await el.screenshot(path=f'{OUT}/{sid}_{t:05.1f}_{niv}.png')
            print('shot',sid,t)
        await b.close()
asyncio.run(main())
