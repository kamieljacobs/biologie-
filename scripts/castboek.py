"""Bouwt personages/index.html (castboek, niet gelinkt, noindex) uit een testpagina met de engine-bibliotheken.
Gebruik: python3 scripts/castboek.py <testpagina.html>   (lib_cast.js wordt vervangen door personages/lib_cast.js)"""
import sys, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
h = pathlib.Path(sys.argv[1]).read_text()
lib = (R / 'personages/lib_cast.js').read_text()
a = h.index('// ===== Vaste personages'); b = h.index('const ctx=document')
h = h[:a] + lib + '\n' + h[b:]
h = h.replace('<head>', '<head><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Castboek</title>', 1)
css = ('body{margin:0;background:#1B2742;font-family:system-ui,sans-serif}#bar{display:flex;flex-wrap:wrap;gap:6px;padding:10px 16px}'
       '#bar button{background:#2A3858;color:#E8ECF4;border:0;border-radius:6px;padding:7px 12px;font:600 14px system-ui;cursor:pointer}'
       '#bar button.on{background:#E0A43A;color:#1B2742}#c{width:100%;height:auto;display:block}')
h = h.replace('</style>', css + '</style>', 1)
bar = '<div id="bar"></div>'
h = h.replace('<canvas id="c"', bar + '<canvas id="c"', 1)
js = """<script>(function(){const bar=document.getElementById('bar');const knop=(t,f)=>{const k=document.createElement('button');k.textContent=t;k.onclick=()=>{bar.querySelectorAll('button').forEach(x=>x.classList.remove('on'));k.classList.add('on');f();};bar.appendChild(k);return k;};
const eerste=knop('Overzicht',()=>teken('blad'));knop('Op een rij',()=>teken('rij'));if(window.jong)knop('Teun en baby',()=>jong());CAST_VOLGORDE.forEach(id=>{knop(CAST[id].naam,()=>los(id));if(CAST[id].garderobe)knop(CAST[id].naam+' · kleding',()=>garderobe(id));});
document.fonts.ready.then(()=>eerste.click());})();</script></body>"""
h = h.replace('</body>', js, 1)
(R / 'personages/index.html').write_text(h)
print('personages/index.html', len(h))
