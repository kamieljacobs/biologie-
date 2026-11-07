"""Film van de katachtigen-pop: python3 referentie/pop/katten/werk/render_film.py (vanuit /home/claude/evo2)
252 frames (10,5 s) van TV_pop_katten.film -> out/pop/katten/frames/, dan katten.mp4 (1280x720, 24 fps) en katten.gif (640 breed)."""
import asyncio, os, subprocess
from playwright.async_api import async_playwright
from PIL import Image
os.chdir('/home/claude/evo2')
F = 'teken_evo1,teken_evo2,teken_evo3,teken_evo4,teken_evo5,teken_evo6,teken_evo7,teken_evo8,dieren_zoog,dieren_overig,micro_evo,pop_katten,tv_pop_katten'
OUT = 'out/pop/katten'; FR = os.path.join(OUT, 'frames'); os.makedirs(FR, exist_ok=True)
N = 252
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 1920, 'height': 1080})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + os.path.abspath('render.html') + '?f=' + F); await pg.evaluate('window.__ready'); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(300)
        c = await pg.query_selector('#c')
        for f in range(N):
            await pg.evaluate(f"__draw('TV_pop_katten', 'film', {f})")
            png = os.path.join(FR, f'f{f:03d}.png'); await c.screenshot(path=png)
            Image.open(png).convert('RGB').resize((1280, 720), Image.LANCZOS).save(png)
        if errs: print('ERRORS', errs[:5])
        await b.close()
asyncio.run(main())
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '24', '-i', os.path.join(FR, 'f%03d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', os.path.join(OUT, 'katten.mp4')], check=True)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '24', '-i', os.path.join(FR, 'f%03d.png'), '-vf', 'scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4', os.path.join(OUT, 'katten.gif')], check=True)
print('klaar', os.path.getsize(os.path.join(OUT, 'katten.mp4')), os.path.getsize(os.path.join(OUT, 'katten.gif')))
