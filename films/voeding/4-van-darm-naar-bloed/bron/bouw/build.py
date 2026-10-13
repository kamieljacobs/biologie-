"""Bouwt film/<slug>.html (site, met navigatie) en film/standalone.html."""
import json, sys, os, html
fdir = sys.argv[1]; E = os.path.dirname(os.path.abspath(__file__))
film = json.load(open(os.path.join(fdir, 'film.json'), encoding='utf-8'))
page = open(os.path.join(E, 'page.html'), encoding='utf-8').read()
fonts = open(os.path.join(E, 'fonts.css'), encoding='utf-8').read() if os.path.exists(os.path.join(E, 'fonts.css')) else ''
if fonts:
    i = page.index('<link rel="preconnect"'); j = page.index('rel="stylesheet">') + len('rel="stylesheet">')
    page = page[:i] + '<style>' + fonts + '</style>' + page[j:]
rep = {'/*TITLE*/': html.escape(film['title'] + ' · ' + film['sub']), '/*SERIESLINE*/': film['seriesline'], '/*H1*/': film['title'], '/*LEAD*/': film['lead'],
       '/*SECTIONS*/': film['sections'], '/*FOOTER*/': film['footer'], '/*GLOSSARY*/': json.dumps(film['glossary'], ensure_ascii=False),
       '/*FILMDATA*/': json.dumps(json.load(open(os.path.join(fdir, 'filmdata.json'))), ensure_ascii=False),
       '/*LIB*/': open(os.path.join(E, 'lib.js'), encoding='utf-8').read(), '/*LIBSERIES*/': open(os.path.join(E, 'lib_voeding.js'), encoding='utf-8').read(),
       '/*SCENES*/': open(os.path.join(fdir, 'scenes.js'), encoding='utf-8').read(), '/*PLAYER*/': open(os.path.join(E, 'player.js'), encoding='utf-8').read()}
for k, v in rep.items(): page = page.replace(k, v)
hf = film['hoofdstuk']; hn = film['hoofdstukNaam']
nav = f'<nav class="sitenav nav"><a href="../../index.html#home">Biologie bij Kamiel</a><a href="../../index.html#{hf}" id="back" class="terug">← Terug naar {hn}</a></nav><script>document.getElementById("back").addEventListener("click",function(e){{ try{{ if(document.referrer && new URL(document.referrer).origin===location.origin && history.length>1){{ e.preventDefault(); history.back(); }} }}catch(_){{}} }});</script>'
os.makedirs(os.path.join(fdir, 'film'), exist_ok=True)
open(os.path.join(fdir, 'film', film['slug'] + '.html'), 'w', encoding='utf-8').write(page.replace('/*NAV*/', nav))
open(os.path.join(fdir, 'film', 'standalone.html'), 'w', encoding='utf-8').write(page.replace('/*NAV*/', ''))
print('built', len(page))
