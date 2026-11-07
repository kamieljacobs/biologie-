import asyncio, os
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page()
        for q in ['?niveau=havo','?niveau=vwo','?niveau=havo&vragen=uit','?niveau=vwo&vragen=uit']:
            await pg.goto('file://'+os.path.abspath('film/standalone.html')+q); await pg.wait_for_timeout(1500)
            print(q, await pg.evaluate("state.total.toFixed(1)"))
        await b.close()
asyncio.run(main())
