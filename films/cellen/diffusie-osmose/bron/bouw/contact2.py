import asyncio, os, json, sys
from playwright.async_api import async_playwright
from PIL import Image
OUT=sys.argv[1]; STEP=float(sys.argv[2]) if len(sys.argv)>2 else 4; ONLY=sys.argv[3].split(',') if len(sys.argv)>3 else None
data=json.load(open('filmdata.json'))
os.makedirs(OUT+'/frames',exist_ok=True)
errs=[]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080})
        pg.on('console', lambda m: errs.append(m.text) if m.type=='error' else None)
        pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
        await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(1500)
        specs=[]
        for s in data['segments']:
            if s['kind']=='speech' and (not ONLY or s['id'] in ONLY):
                t=1.0
                while t<s['dur']: specs.append((s['id'],t)); t+=STEP
                specs.append((s['id'],s['dur']-0.3))
        for sid,t in specs:
            await pg.evaluate(f"()=>{{ state.niveau='vwo'; const i=state.items.findIndex(it=>it.seg&&it.seg.id==='{sid}'); gotoItem(i,{t}); state.local={t}; render(); }}")
            await pg.wait_for_timeout(30)
            el=await pg.query_selector('#stage'); await el.screenshot(path=f'{OUT}/frames/{sid}_{t:05.1f}.png')
        # title + end card
        for typ in ['title','end']:
            await pg.evaluate(f"()=>{{ const i=state.items.findIndex(it=>it.type==='{typ}'||(it.seg&&it.seg.kind==='{'title' if typ=='title' else 'card'}')); if(i>=0){{gotoItem(i,3); state.local=3; render();}} }}")
            el=await pg.query_selector('#stage'); await el.screenshot(path=f'{OUT}/frames/z_{typ}.png')
        await b.close()
    from collections import defaultdict
    groups=defaultdict(list)
    for sid,t in specs: groups[sid].append(f'{OUT}/frames/{sid}_{t:05.1f}.png')
    for sid,files in groups.items():
        ims=[Image.open(f).resize((640,360)) for f in files]; rows=(len(ims)+2)//3
        sheet=Image.new('RGB',(1920,360*rows),(0,0,0))
        for i,im in enumerate(ims): sheet.paste(im,((i%3)*640,(i//3)*360))
        sheet.save(f'{OUT}/sheet_{sid}.png')
    print(len(specs),'frames;',len(groups),'sheets; errors:',errs)
asyncio.run(main())
