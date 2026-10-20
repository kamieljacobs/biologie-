"""Begrippen per film voor de werksessies (sessie/begrippen.json).

De films bouwen hun begrippenlijst (#glossary .term) met JavaScript, in verschillende bouwvormen.
Dit script opent elke film uit oefenlijst.json in een headless browser en leest de lijst uit:
  {"<href van de film>": [{"t": begrip, "d": uitleg, "vwo": true?}, ...]}
Draai na het toevoegen van een film met oefeningen:  python3 scripts/sessie_begrippen.py
"""
import functools
import http.server
import json
import pathlib
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    lijst = json.loads((ROOT / 'oefenlijst.json').read_text(encoding='utf-8'))
    class Stil(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Stil, directory=str(ROOT))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    basis = f'http://127.0.0.1:{srv.server_address[1]}/'
    uit = {}
    with sync_playwright() as p:
        br = p.chromium.launch()
        pg = br.new_page()
        pg.route(lambda u: u.split('?')[0].rsplit('.', 1)[-1] in ('mp3', 'm4a', 'ogg', 'wav', 'mp4', 'webm'), lambda r: r.abort())
        for href in lijst:
            try:
                pg.goto(basis + href, wait_until='domcontentloaded', timeout=30000)
                pg.wait_for_function("document.querySelectorAll('#glossary .term').length > 0", timeout=8000)
            except Exception:
                print('geen begrippen:', href)
                continue
            termen = pg.evaluate("""() => [...document.querySelectorAll('#glossary .term')].map(t => {
                const b = t.querySelector('b'), d = t.querySelector('p');
                const o = {t: (b ? b.textContent : '').trim(), d: (d ? d.textContent : '').trim()};
                if (t.classList.contains('vwo')) o.vwo = true;
                return o; }).filter(o => o.t && o.d)""")
            uit[href] = termen
            print(f'{len(termen):3d}  {href}')
        br.close()
    srv.shutdown()
    (ROOT / 'sessie' / 'begrippen.json').write_text(json.dumps(uit, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('sessie/begrippen.json:', len(uit), 'films')


if __name__ == '__main__':
    main()
