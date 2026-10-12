#!/usr/bin/env python3
"""filmbron.py — uitlegfilms uit- en inpakken.

Een film op de site is één HTML-bestand waarin audio, lettertypen en
beelden vaak als base64-tekst zijn ingebakken. Dat maakt het bestand
onleesbaar groot om te bewerken. Dit programma haalt die blobs eruit en
zet ze er later exact (byte voor byte) weer in.

  uitpakken  <film.html> <map>   film -> <map>/film.src.html + <map>/blobs/ + manifest.json
  inpakken   <map> <film.html>   omgekeerd
  controleer <film.html> [...]    pakt uit en weer in en vergelijkt byte voor byte
  overzicht  <film.html> [...]    laat zien welke blobs erin zitten

In film.src.html staat op de plek van elke blob een merkteken
@@BLOB:<naam>@@. Bewerk film.src.html (tekst, timing, beeld), vervang
desgewenst een bestand in blobs/ (bijv. een opnieuw opgenomen alinea, zelfde
naam), en pak weer in. Bij een vervangen blob wordt de nieuwe inhoud gebruikt.

Werkmappen horen niet in de repository: pak uit in een tijdelijke map.
"""
import base64, hashlib, json, os, re, sys

URI = re.compile(r'data:([a-z]+/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]{1000,})')
RAW = re.compile(r'(["\'`])([A-Za-z0-9+/=]{20000,})\1')
MARK = re.compile(r'@@BLOB:([A-Za-z0-9_.-]+)@@')

EXT = {'audio/mpeg': 'mp3', 'audio/mp3': 'mp3', 'audio/wav': 'wav', 'audio/ogg': 'ogg',
       'font/woff2': 'woff2', 'font/woff': 'woff', 'image/png': 'png', 'image/jpeg': 'jpg',
       'image/webp': 'webp', 'image/svg+xml': 'svg'}


def sniff(data: bytes) -> str:
    if data[:3] == b'ID3' or data[:2] in (b'\xff\xfb', b'\xff\xf3', b'\xff\xf2'):
        return 'audio/mpeg'
    if data[:4] == b'wOF2':
        return 'font/woff2'
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return 'image/png'
    if data[:3] == b'\xff\xd8\xff':
        return 'image/jpeg'
    if data[:4] == b'RIFF':
        return 'audio/wav'
    return 'application/octet-stream'


def strip(html: str):
    blobs = []

    def add(mime, b64, kind):
        data = base64.b64decode(b64)
        name = f'{len(blobs) + 1:03d}.{EXT.get(mime, "bin")}'
        blobs.append({'naam': name, 'mime': mime, 'vorm': kind, 'bytes': len(data),
                      'sha256': hashlib.sha256(data).hexdigest(), 'b64_len': len(b64),
                      '_data': data, '_b64': b64})
        return name

    html = URI.sub(lambda m: f'data:{m.group(1)};base64,@@BLOB:{add(m.group(1), m.group(2), "datauri")}@@', html)

    def raw(m):
        b64 = m.group(2)
        try:
            data = base64.b64decode(b64, validate=True)
        except Exception:
            return m.group(0)
        mime = sniff(data)
        if mime == 'application/octet-stream':
            return m.group(0)
        return f'{m.group(1)}@@BLOB:{add(mime, b64, "raw")}@@{m.group(1)}'

    html = RAW.sub(raw, html)
    return html, blobs


def uitpakken(src, out):
    html = open(src, encoding='utf-8', newline='').read()
    stripped, blobs = strip(html)
    os.makedirs(os.path.join(out, 'blobs'), exist_ok=True)
    open(os.path.join(out, 'film.src.html'), 'w', encoding='utf-8', newline='').write(stripped)
    for b in blobs:
        open(os.path.join(out, 'blobs', b['naam']), 'wb').write(b['_data'])
    man = {'bron': os.path.basename(src), 'blobs': [{k: v for k, v in b.items() if not k.startswith('_')} for b in blobs]}
    json.dump(man, open(os.path.join(out, 'manifest.json'), 'w'), indent=1)
    return stripped, blobs


def inpakken(map_, dst):
    man = json.load(open(os.path.join(map_, 'manifest.json')))
    stripped = open(os.path.join(map_, 'film.src.html'), encoding='utf-8', newline='').read()
    info = {b['naam']: b for b in man['blobs']}

    def put(m):
        naam = m.group(1)
        data = open(os.path.join(map_, 'blobs', naam), 'rb').read()
        b64 = base64.b64encode(data).decode()
        oud = info.get(naam)
        # base64 met regelafbreking/zonder padding komt in deze films niet voor;
        # bij ongewijzigde data is de codering dus identiek aan het origineel.
        if oud and hashlib.sha256(data).hexdigest() == oud['sha256'] and len(b64) != oud['b64_len']:
            raise SystemExit(f'{naam}: base64-vorm wijkt af van origineel')
        return b64

    html = MARK.sub(put, stripped)
    open(dst, 'w', encoding='utf-8', newline='').write(html)


def controleer(paths):
    import tempfile
    ok = True
    for p in paths:
        with tempfile.TemporaryDirectory() as t:
            uitpakken(p, t)
            inpakken(t, os.path.join(t, 'terug.html'))
            same = open(p, 'rb').read() == open(os.path.join(t, 'terug.html'), 'rb').read()
        print(('OK    ' if same else 'FOUT  ') + p)
        ok &= same
    return ok


def overzicht(paths):
    for p in paths:
        html = open(p, encoding='utf-8', newline='').read()
        stripped, blobs = strip(html)
        mb = sum(b['bytes'] for b in blobs) / 1e6
        print(f'{p}: {len(blobs)} blobs ({mb:.1f} MB), bron {len(stripped)//1024} KB')
        for b in blobs:
            print(f"   {b['naam']:10} {b['mime']:12} {b['vorm']:8} {b['bytes']/1024:8.0f} KB")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == 'uitpakken':
        uitpakken(args[0], args[1])
    elif cmd == 'inpakken':
        inpakken(args[0], args[1])
    elif cmd == 'controleer':
        sys.exit(0 if controleer(args) else 1)
    elif cmd == 'overzicht':
        overzicht(args)
    else:
        sys.exit(__doc__)
