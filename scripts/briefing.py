#!/usr/bin/env python3
"""Zet de docentbriefing (tools/docent/<les>/briefing.md) als uitklapblok 'Briefing voor de docent' in de les.

Opbouw van briefing.md: een korte intro, daarna per onderwerp een kop '### Titel' met tekst in Markdown
(lijsten met een lege regel ervoor, bronnen als [titel](url) in de laatste alinea).
Het blok komt direct na het blok 'Voor de docent'; draai dit script na elke wijziging (idempotent).
"""
import glob, os, re, sys
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSS = '''details.briefing{margin-top:18px}
details.briefing>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:44px}
details.briefing>summary::-webkit-details-marker{display:none}
details.briefing>summary h2{font-size:24px}
details.briefing>summary::after{content:"+";margin-left:auto;font:600 22px/1 var(--meta);color:var(--goud-text)}
details.briefing[open]>summary::after{content:"–"}
.briefing .intro{color:var(--text2);max-width:72ch}
.briefing details.onderwerp{border-top:1px solid var(--line2);padding:4px 0}
.briefing details.onderwerp>summary{cursor:pointer;font-weight:700;padding:10px 0;font-size:18px}
.briefing details.onderwerp>div{max-width:76ch;padding-bottom:10px}
.briefing details.onderwerp p{margin:8px 0;line-height:1.55}
.briefing details.onderwerp ul,.briefing details.onderwerp ol{margin:6px 0 8px;padding-left:22px;line-height:1.5}
.briefing details.onderwerp p:last-child{font-size:14px;color:var(--text2)}
.briefing details.onderwerp a{color:var(--goud-text)}
.briefing details.onderwerp em{color:var(--text2)}
body.presenteer details.briefing{display:none!important}
'''


def lijsten_los(md):
    """Markdown wil een lege regel vóór een lijst; voeg die toe waar hij ontbreekt."""
    uit = []
    for regel in md.split('\n'):
        if re.match(r'^(- |\d+\. )', regel) and uit and uit[-1].strip() and not re.match(r'^(- |\d+\. )', uit[-1]):
            uit.append('')
        uit.append(regel)
    return '\n'.join(uit)


def blok(md):
    delen = re.split(r'^### ', lijsten_los(md), flags=re.M)
    intro = markdown.markdown(delen[0].strip())
    items = []
    for d in delen[1:]:
        kop, _, tekst = d.partition('\n')
        h = markdown.markdown(tekst.strip()).replace('<a href=', '<a target="_blank" rel="noopener" href=')
        items.append(f'  <details class="onderwerp"><summary>{kop.strip()}</summary><div>{h}</div></details>')
    return ('<details class="briefing" id="briefing">\n  <summary><h2>Briefing voor de docent</h2></summary>\n'
            f'  <div class="intro">{intro}</div>\n' + '\n'.join(items) + '\n</details>'), len(items)


def main():
    for md_pad in sorted(glob.glob(os.path.join(ROOT, 'tools/docent/*/briefing.md'))):
        html_pad = os.path.join(os.path.dirname(md_pad), 'index.html')
        s = open(html_pad, encoding='utf-8').read()
        nieuw, n = blok(open(md_pad, encoding='utf-8').read())
        if 'id="briefing"' in s:
            s = re.sub(r'<details class="briefing" id="briefing">.*?\n</details>', lambda m: nieuw, s, count=1, flags=re.S)
        else:
            i = s.index('<details class="docent">')
            j = s.index('</details>', i) + len('</details>')
            s = s[:j] + '\n' + nieuw + s[j:]
        if 'details.briefing{' not in s:
            s = s.replace('details.docent{margin-top:28px}', CSS + 'details.docent{margin-top:28px}', 1)
        open(html_pad, 'w', encoding='utf-8').write(s)
        print(f'{os.path.relpath(html_pad, ROOT)}: {n} onderwerpen')


if __name__ == '__main__':
    sys.exit(main())
