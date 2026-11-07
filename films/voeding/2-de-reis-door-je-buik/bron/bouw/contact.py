import asyncio, os, json
from playwright.async_api import async_playwright
from PIL import Image
data=json.load(open('filmdata.json'))
os.makedirs('qa/frames',exist_ok=True)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1920,'height':1080})
        await pg.goto('file://'+os.path.abspath('film/index.html')); await pg.wait_for_timeout(1200)
        specs=[]
        for s in data['segments']:
            if s['kind']=='speech':
                t=1.0
                while t<s['dur']: specs.append((s['id'],t)); t+=4
        for sid,t in specs:
            await pg.evaluate(f"()=>{{ const i=state.items.findIndex(it=>it.seg&&it.seg.id==='{sid}'); gotoItem(i,{t}); state.local={t}; render(); }}")
            await pg.wait_for_timeout(40)
            el=await pg.query_selector('#stage'); await el.screenshot(path=f'qa/frames/{sid}_{t:05.1f}.png')
        await b.close()
    # sheets per segment (3 columns)
    from collections import defaultdict
    groups=defaultdict(list)
    for sid,t in specs: groups[sid].append(f'qa/frames/{sid}_{t:05.1f}.png')
    for sid,files in groups.items():
        ims=[Image.open(f).resize((640,360)) for f in files]; rows=(len(ims)+2)//3
        sheet=Image.new('RGB',(1920,360*rows),(0,0,0))
        for i,im in enumerate(ims): sheet.paste(im,((i%3)*640,(i//3)*360))
        sheet.save(f'qa/sheet_{sid}.png')
    print(len(specs),'frames;',len(groups),'sheets')
asyncio.run(main())
