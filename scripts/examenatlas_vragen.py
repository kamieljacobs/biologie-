"""Voegt de echte examenvragen toe aan de Examenatlas.
Gebruik: python3 scripts/examenatlas_vragen.py <knipmap-havo> <knipmap-vwo>
De knipmappen komen uit knip.py (opgavenboekje → per vraag webp-uitsneden: info sinds de vorige vraag + de vraag)
en knip_c.py (correctievoorschrift → per vraag het beoordelingsmodel als webp); beide scripts staan in scripts/examenknip/.
Kopieert de afbeeldingen naar examenatlas/img/<niveau>/<examen>/ en zet per vraag in examenatlas/<niveau>.json:
ni = aantal uitsneden van de vraag, na = aantal uitsneden van het antwoord, nu = uitsneden uit de uitwerkbijlage (knip_u.py), en (als die ontbrak) q = vraagtekst.
Draai dit opnieuw ná scripts/examenatlas_bouwen.py, want dat script schrijft de json opnieuw."""
import json, sys, os, shutil
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for niv, src in zip(('havo', 'vwo'), sys.argv[1:3]):
    p = f'{R}/examenatlas/{niv}.json'; D = json.load(open(p))
    K = json.load(open(f'{src}/{niv}_knip.json')); A = json.load(open(f'{src}/{niv}_antw.json'))
    B = json.load(open(f'{src}/{niv}_bijlage.json')) if os.path.exists(f'{src}/{niv}_bijlage.json') else {}
    dst = f'{R}/examenatlas/img/{niv}'; shutil.rmtree(dst, ignore_errors=True)
    n = 0
    for v in D['vragen']:
        lab = D['exams'][v['e']]['lab']; k = K[lab].get(str(v['nr'])); a = A[lab].get(str(v['nr']), [])
        if not k: continue
        os.makedirs(f'{dst}/{lab}', exist_ok=True)
        u = B.get(lab, {}).get(str(v['nr']), [])
        for f in k['img'] + a + u: shutil.copy(f'{src}/{f}', f'{dst}/{f}')
        v['ni'] = len(k['img']); v['na'] = len(a); n += 1
        if u: v['nu'] = len(u)
        else: v.pop('nu', None)
        if (niv == 'vwo' or not v.get('q')) and k['tekst']: v['q'] = k['tekst']
    json.dump(D, open(p, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(niv, n, 'vragen gekoppeld')
