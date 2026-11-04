"""Bouwt het twijfelblad Mariene biologie (één pagina, keuzes in db-collectie 'keuring')."""
import re, json, base64, html, pathlib
H = pathlib.Path('/home/claude/hw')

def b64(p, mime):
    return f'data:{mime};base64,' + base64.b64encode(pathlib.Path(p).read_bytes()).decode()

def sectie(d, t):
    s = (H / d / 'twijfels.md').read_text()
    m = re.search(rf'^## {t}\b.*?$(.*?)(?=^## |\Z)', s, re.M | re.S)
    tw = wa = ''
    for r in m.group(1).strip().splitlines():
        r = r.strip()
        if r.startswith('- **Twijfel:**'): tw = r[len('- **Twijfel:**'):].strip()
        elif r.startswith('- **Waarom:**'): wa = r[len('- **Waarom:**'):].strip()
    return tw, wa

def tabel(d):
    s = (H / d / 'twijfels.md').read_text(); out = {}
    for r in s.splitlines():
        m = re.match(r'^\| (t\d+) \| (.*?) \| (.*?) \| (.*?) \|\s*$', r)
        if m: out[m.group(1)] = m.group(2, 3, 4)
    return out

def md(s):  # klein: **vet**, `code`
    s = html.escape(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s); s = re.sub(r'`(.+?)`', r'<code>\1</code>', s)
    return s

def item(id_, titel, twijfel, waarom, voorstel, anders, beeld=None):
    return dict(id=id_, titel=titel, twijfel=md(twijfel), waarom=md(waarom), voorstel=md(voorstel), anders=md(anders), beeld=beeld)

def filmitems(d, ts):
    tb = tabel(d); L = []
    for t in ts:
        naam, vs, an = tb[t]; tw, wa = sectie(d, t)
        L.append(item(f'{d}-{t}', naam, tw or naam, wa, vs, an))
    return L

def script(d):
    s = (H / d / 'script_v2.md').read_text()
    a = s.index('## Cold open'); b = s.find('\n## Keuzes'); s = s[a:b if b > 0 else None]
    out = []
    for blok in s.split('\n## ')[0:]:
        blok = blok.lstrip('# ').strip()
        kop, _, rest = blok.partition('\n')
        m = re.match(r'(.*?)\s*\[Schema:(.*)\]\s*$', kop)
        k, sch = (m.group(1), m.group(2)) if m else (kop, '')
        out.append(f'<h4>{html.escape(k)}</h4>' + (f'<p class="sch">Beeld: {html.escape(sch.strip())}</p>' if sch else '') +
                   ''.join(f'<p>{md(p)}</p>' for p in rest.strip().split('\n') if p.strip()))
    return ''.join(out)

def tel(d):
    s = (H / d / 'script_v2.md').read_text()
    return s.count('[VRAAG]')

C = H / 'cast'; D = H / 'decor'
reeks = [
    item('mb-r1', 'Sams kleding aan boord en op het wad',
         'Sam heeft alleen practicumkleding. Aan dek (film 1) en op het wad (film 3) heeft hij een jas en laarzen nodig: een nieuwe outfit, één keuze voor de hele reeks.',
         'Hij moet duidelijk anders blijven dan de mariene bioloog (geen tweede oranje werkjas). A is een nieuwe teal regenjas met gele laarzen (zoals op een schip gebruikelijk). B is zijn bestaande winterjas met groene laarzen. In het lab draagt hij gewoon practicumkleding.',
         'A · teal regenjas, gele laarzen', 'B · zijn winterjas, groene laarzen', b64(C / 'sam_outfit_s.png', 'image/png')),
    item('mb-r2', 'Drie decors (al gemaakt)',
         'Schip, lab met aquaria en wad bij laag water: nieuw beeld, gemaakt als edit met een bestaand decor als stijlreferentie (± 433 credits per stuk, één variant).',
         'Het dek heeft een groot A-frame bovenin; het midden blijft vrij voor de cast. Op het lab staan vijf bakken, handig voor de proef met controlegroep in film 2.',
         'Zo gebruiken', 'Eén opnieuw maken (zeg welke in de opmerking)', [b64(D / 'schip_prev.jpg', 'image/jpeg'), b64(D / 'lab_prev.jpg', 'image/jpeg'), b64(D / 'wad_prev.jpg', 'image/jpeg')]),
    item('mb-r3', 'Nieuwe tekeningen',
         'Nieuw voor de bibliotheek: schol (beide ogen boven), otoliet met jaarringen, haring, kabeljauw (film 1); oesterlarve en oesterschelp (film 2); kanoet, kokkel, nonnetje, wadpier met hoopje, mossel, mosselkotter en invanginstallatie (film 3).',
         'Een testvel voorkomt dat een dier verkeerd in de film komt, maar kost een extra keuringsronde voor het bouwen. Echte verhoudingen en schelpen of organen in een zoomcirkel naast het dier staan vast (beeldafspraken).',
         'Eerst één testvel voor alle drie de films, dan bouwen', 'Meteen bouwen; je keurt de tekeningen in de reviewstand'),
    item('mb-r4', 'Visser en mosselkweker',
         'In film 1 vist een boot uit de modelzee, in film 3 zaait een mosselkweker mosselzaad uit. Beide zijn figuranten zonder naam in de stem.',
         'Dezelfde figurant als visser én als kweker oogt vreemd in één reeks. Joost is de vaste figurant voor zulke rollen (Erik is de verdachte). Geen bedrijfsnaam of logo op de boten.',
         'Film 1 alleen een vissersboot in de verte, film 3 Joost als mosselkweker', 'Joost in allebei'),
    item('mb-r5', 'Opleidingen in de recap',
         "Eén vaste zin in alle drie de films: Marine Sciences in Wageningen, of biologie in Groningen en daarna de master Marine Biology, of op het hbo Kust- en zeemanagement in Leeuwarden.",
         'Eerst stond er "biologie, ook in Nijmegen". Volgens de RUG geeft alleen de eigen bachelor Biologie (Ecology and Evolution) directe toegang tot de master Marine Biology; een andere bachelor, zoals die van Nijmegen, wordt per persoon beoordeeld. Daarom is Nijmegen eruit. Dicht bij huis kan het dus niet direct.',
         'Zonder Nijmegen (zoals nu)', 'Nijmegen toch noemen, met "via een beoordeling"'),
]

mb2_t1 = item('mb2-t1', 'Combinatie of variant A',
    'De blinde beoordelaar koos twee keer nipt voor het dossier: eerst variant C (55–53–49), daarna de combinatie (51–49–47). Bij nipt kies jij.',
    'Combinatie: de kijker beslist zelf dat de stempel OORZAAK pas na de controlegroep mag; de hand van de bioloog op de stempel draagt het concept. Maar één misconceptievraag werd zwakker en twee beweringen rusten op één studie (≈). Variant A: alle misconcepties met een eerlijke voorspelvraag en de minste uitspraakrisico\'s, maar de kwekerij loopt dood en het bewijs wordt verteld in plaats van door de kijker beslist.',
    'Combinatie (dossier)', 'Variant A (klassiek)')

films = [
    dict(d='mb1', titel='Hoeveel vis mag eruit?', vraag='Vissers willen elk jaar zoveel mogelijk vangen. Waarom levert minder vangen op den duur méér vis op?',
         b15='Dobbelsteen: B camerabeweging + perspectief, C experiment als kapstok. Ronde 1 B nipt (61–59–50), combinatie wint ronde 2 duidelijk (63–59–57). De drie modelzeeën uit C zitten erin als dialoog.',
         items=filmitems('mb1', ['t5', 't7', 't8', 't10', 't11'])),
    dict(d='mb2', titel='Zuurder water', vraag='De zee neemt ruim een kwart van onze CO₂ op. Waarom is dat slecht nieuws voor een oester?',
         b15='Dobbelsteen: B camerabeweging + voorbeeld, C dossier. Ronde 1 C nipt (55–53–49), ronde 2 combinatie nipt (51–49–47). Daarom de keuze hieronder.',
         items=[mb2_t1] + filmitems('mb2', ['t2', 't3', 't6', 't7', 't8', 't9'])),
    dict(d='mb3', titel='Een zee vol voedsel: de Waddenzee', vraag='Een mosselkweker wil meer mosselen in de Waddenzee. Waarom maken vogelonderzoekers zich daar zorgen over?',
         b15='Dobbelsteen: B perspectief + voorbeeld, C raadsel. B (kanoetperspectief en emmerproef) wint duidelijk (54–50–49), met zinnen uit A en C.',
         items=filmitems('mb3', ['t1', 't5', 't8', 't10', 't11', 't12', 't13'])),
]
for f in films:
    s = (H / f['d'] / 'script_v2.md').read_text(); spoken = s[s.index('## Cold open'):]
    f['vragen'] = tel(f['d']); f['script'] = script(f['d'])
DATA = dict(reeks=reeks, films=films)
t = (H / 'blad' / 'sjabloon.html').read_text().replace('/*DATA*/null', json.dumps(DATA, ensure_ascii=False))
(H / 'blad' / 'twijfelblad-marien.html').write_text(t)
print('ok', len(t) // 1024, 'kB', sum(len(f['items']) for f in films) + len(reeks), 'punten')
