import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1200})
        await pg.goto(sys.argv[1]); await pg.wait_for_timeout(1200)
        res = await pg.evaluate("""()=>{ const cv=document.getElementById('stage'), c=cv.getContext('2d'); const out=[];
          for(const it of __items()){ if(it.type!=='speech') continue; let first=null;
            for(let t=0;t<4;t+=0.1){ state.captions=false; __still(it.id,t); const d=c.getImageData(0,80,cv.width,820).data; let n=0; for(let i=0;i<d.length;i+=16){ if(Math.abs(d[i]-26)+Math.abs(d[i+1]-39)+Math.abs(d[i+2]-64)>40) n++; } if(n>300){ first=t; break; } }
            out.push([it.id, first===null?'>4':first.toFixed(1)]); } state.captions=true; return out.filter(x=>x[1]!=='0.0'); }""")
        print(res); await b.close()
asyncio.run(main())
