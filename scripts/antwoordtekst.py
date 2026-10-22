#!/usr/bin/env python3
"""Antwoordtekst (22 okt 2026): bij Vragen uit geen tekst in beeld die naar een vraag verwijst.

Kamiel: "als vragen uitstaan moet het ook niet als tekst een referentie naar de vraag".
De speler knipt bij Vragen uit al de gesproken vraag en de gesproken onthulling ("Antwoord aa.").
Dit script doet hetzelfde voor de tekst op het canvas: het voegt een klein script toe dat de
tekenhulpjes `tag` en `regel` (en zo ook `antwoord`, `vkAntwoord`, `antwoordLabel`, die via
`regel` tekenen) omwikkelt. Staan de vragen uit, dan:
  - 'antwoord a' / 'Antwoord b' / 'het antwoord is c'  -> wordt niet getekend;
  - 'antwoord b: ecosysteem'                           -> 'Ecosysteem' (alleen de inhoud blijft).
Staan de vragen aan, dan verandert er niets.

Gebruik:
    python3 scripts/antwoordtekst.py [bestand ...]   # zonder argumenten: alle films (niet examens/, bron/, presentaties)
    python3 scripts/antwoordtekst.py --check
Idempotent (marker ANTWOORDTEKST_MARK). Draai het na elke (her)bouw van een film, net als spelerfix.py.
"""
import glob, os, re, sys

MARK = 'ANTWOORDTEKST_MARK'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

JS = r"""<script>/*ANTWOORDTEKST_MARK v1 22okt2026: bij Vragen uit geen 'antwoord a' in beeld*/
(function(){
  function uit(){ try{ if(typeof state!=='undefined'&&state&&state.vragen) return state.vragen==='uit'; }catch(e){}
    try{ var p=new URLSearchParams(location.search).get('vragen'); if(p) return p==='uit'; return localStorage.getItem('bk-vragen')==='uit'; }catch(e){ return false; } }
  var RE=/^\s*(het\s+)?(juiste\s+)?antwoord(?=[\s:.]|$)(\s+(is|was))?\s*:?\s*(\(?([a-d]|aa|bee|cee|dee)\)?(?=[\s:.,;]|$))?\s*[:.,;–—-]?\s*/i;
  function schoon(s){ if(typeof s!=='string') return s; var m=s.match(RE); if(!m) return s; var rest=s.slice(m[0].length);
    if(!m[5]&&!/:/.test(m[0])&&rest) return s; if(!rest) return ''; return rest.charAt(0).toUpperCase()+rest.slice(1); }
  window.bkAntwoordSchoon=schoon;
  function wikkel(o){ return function(ctx,s){ if(uit()){ var n=schoon(s); if(n==='') return; if(n!==s){ var a=Array.prototype.slice.call(arguments); a[1]=n; return o.apply(this,a); } } return o.apply(this,arguments); }; }
  try{ if(typeof tag==='function') tag=wikkel(tag); }catch(e){}
  try{ if(typeof regel==='function') regel=wikkel(regel); }catch(e){}
})();
</script>"""


def alle_films():
    fs = []
    for f in glob.glob(os.path.join(ROOT, 'films', '**', '*.html'), recursive=True):
        r = os.path.relpath(f, ROOT)
        if '/bron/' in r or 'presentatie' in os.path.basename(r) or r.startswith('films/examens/'):
            continue
        fs.append(f)
    return sorted(fs)


def doel(s):
    """Alleen films met de vragenknop en met tekenhulpjes tag of regel."""
    return 'bk-vragen' in s and re.search(r'function (tag|regel)\s*\(', s) is not None


def fix(s):
    if MARK in s or not doel(s):
        return s, False
    i = s.rfind('</body>')
    if i < 0:
        return s + JS, True
    return s[:i] + JS + '\n' + s[i:], True


def main(argv):
    check = '--check' in argv
    fs = [os.path.abspath(a) for a in argv if not a.startswith('--')] or alle_films()
    nieuw = mist = 0
    for f in fs:
        s = open(f, encoding='utf-8').read()
        if check:
            if doel(s) and MARK not in s:
                mist += 1; print('mist:', os.path.relpath(f, ROOT))
            continue
        s2, ok = fix(s)
        if ok:
            open(f, 'w', encoding='utf-8').write(s2); nieuw += 1
    if check:
        print('alles in orde' if not mist else f'{mist} films missen de fix'); return 1 if mist else 0
    print(f'{nieuw} films aangepast')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
