"""Goedkope keuring van een filmscript vóór de blinde beoordelaar (prompt v10, B15).

python3 scripts/scriptcheck.py <script.md> [<script.md> ...]

Telt gesproken woorden (cold open, per hoofdstuk, totaal) en zoekt raadbare
vraagopties: het goede antwoord is duidelijk de langste optie, alleen de
afleiders hebben absolute woorden (altijd, nooit, elke …), de zin vóór de vraag
herhaalt de woorden van het goede antwoord, of het goede antwoord staat te vaak
op dezelfde letter. Het zijn signalen, geen oordeel: kijk elke melding na.
Format: '## Kop', '[VRAAG] (a) … · (b) … · (c) …', daarna een regel 'Antwoord x.'"""
import re, sys, collections

GRENS_COLD, GRENS_HFST, GRENS_TOTAAL = 48, 230, 900
NIET_GESPROKEN = ('titel', 'eindkaart', 'keuzes', 'twijfels', 'bronnen', 'opmerking', 'storyboard', 'noten', 'beelden')
ABSOLUUT = re.compile(r'\b(altijd|nooit|alle|elke|elk|geen enkele|alleen maar|voor altijd|helemaal)\b', re.I)
STOP = set('dat deze die niet maar want omdat wordt worden heeft hebben zijn waren door voor naar onder tussen alleen'.split())

def woorden(s):
    return re.findall(r"[A-Za-zÀ-ÿ0-9'’-]+", s)

def inhoud(s):
    return {w.lower() for w in woorden(s) if len(w) >= 5 and w.lower() not in STOP}

def check(pad):
    regels = open(pad, encoding='utf-8').read().splitlines()
    secties, kop = collections.OrderedDict(), None
    for r in regels:
        if r.startswith('## '):
            kop = re.sub(r'\s*\[.*$', '', r[3:]).strip()
            secties[kop] = []
        elif kop is not None:
            secties[kop].append(r)
    meld, telling, vragen = [], [], []
    for kop, rs in secties.items():
        if any(kop.lower().startswith(n) for n in NIET_GESPROKEN):
            continue
        n, vorige = 0, ''
        for i, r in enumerate(rs):
            s = r.strip()
            if s.startswith('[VRAAG]'):
                opts = re.findall(r'\(([a-d])\)\s*(.*?)(?=\s*·\s*\([a-d]\)|$)', s)
                na = rs[i + 1:] + [x for k2, rs2 in list(secties.items())[list(secties).index(kop) + 1:] for x in rs2]
                antw = next((re.match(r'Antwoord ([a-d])\b', x.strip()).group(1) for x in na
                             if re.match(r'Antwoord ([a-d])\b', x.strip())), None)
                vragen.append((kop, dict(opts), antw, vorige))
                continue
            if not s or s[0] in '[>|#*-':
                continue
            tekst = re.sub(r'\[[^\]]*\]', '', s)
            n += len(woorden(tekst)); vorige = tekst
        telling.append((kop, n))
        if kop.lower().startswith('cold open') and n > GRENS_COLD:
            meld.append(f'lengte: cold open {n} woorden (grens {GRENS_COLD}, ± 20 s)')
        elif n > GRENS_HFST:
            meld.append(f'lengte: {kop} {n} woorden (grens ± {GRENS_HFST}; vaak twee leerdoelen)')
    totaal = sum(n for _, n in telling)
    if totaal > GRENS_TOTAAL:
        meld.append(f'lengte: totaal {totaal} gesproken woorden (grens ± {GRENS_TOTAAL})')
    letters, langste = [], []
    for kop, opts, antw, vorige in vragen:
        if not antw or antw not in opts:
            meld.append(f'vraag in {kop}: geen "Antwoord x." gevonden, niet gecontroleerd'); continue
        letters.append(antw)
        goed = opts[antw]; rest = [v for k, v in opts.items() if k != antw]
        lg, lr = len(woorden(goed)), max(len(woorden(v)) for v in rest)
        if lg >= lr + 3 and lg >= 1.3 * lr:
            meld.append(f'raadbaar ({kop}): goede optie {antw} is veel langer ({lg} tegen max {lr} woorden)')
        langste.append(lg > lr)
        if not ABSOLUUT.search(goed) and sum(bool(ABSOLUUT.search(v)) for v in rest) >= 2:
            meld.append(f'raadbaar ({kop}): alleen de afleiders hebben absolute woorden')
        ig, iv = inhoud(goed), inhoud(vorige)
        if ig:
            og = len(ig & iv) / len(ig)
            orr = max((len(inhoud(v) & iv) / len(inhoud(v)) if inhoud(v) else 0) for v in rest)
            if og >= 0.5 and og >= 2 * orr and len(ig & iv) >= 2:
                meld.append(f'voorgezegd ({kop}): de zin vóór de vraag bevat {len(ig & iv)} woorden van optie {antw}')
    if len(langste) >= 3 and sum(langste) / len(langste) > 0.5:
        meld.append(f'raadbaar (film): goede optie is in {sum(langste)} van {len(langste)} vragen de langste')
    if len(letters) >= 3:
        c = collections.Counter(letters)
        l, k = c.most_common(1)[0]
        if k / len(letters) > 0.6:
            meld.append(f'positie: {k} van {len(letters)} goede antwoorden op {l}')
        for j in range(len(letters) - 2):
            if letters[j] == letters[j + 1] == letters[j + 2]:
                meld.append(f'positie: drie keer achter elkaar {letters[j]}'); break
    print(f'== {pad}')
    print('   woorden: ' + ' · '.join(f'{k} {n}' for k, n in telling) + f' · totaal {totaal}')
    print(f'   vragen: {len(vragen)}, antwoorden ' + ''.join(letters))
    for m in meld:
        print('   ! ' + m)
    if not meld:
        print('   geen meldingen')
    return len(meld)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    tot = sum(check(p) for p in sys.argv[1:])
    print(f'\n{tot} meldingen')
