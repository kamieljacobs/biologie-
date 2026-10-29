# Van bevruchting tot baby 3.0 — bouwen in de FILMDATA-straat (29 okt 2026). Draai vanuit de repo-root:  bash films/voortplanting/1-precies-op-tijd/bron/bouw.sh
# Werkmap buiten de repo (standaard /tmp/vp1-bouw). Resultaat: films/voortplanting/1-precies-op-tijd.html (audio staat al in 1-precies-op-tijd/audio/).
# Daarna in de repo: spelerfix.py, antwoordtekst.py, kortantwoord.py, antwoordletter.py, flipkaarten.py, oefenen.py, licentie_noot.py, teller.py, tabel_mobiel.py.
# Alinea's opnieuw uit de oude hoofdstuk-takes knippen (alleen als dat nodig is): bouw/plan.py (leest FILM.json + blobs van bron/oud/1-precies-op-tijd-v2.6.html, zie info.md).
# lib_bio_deel.js opnieuw uit de beeldbank: python3 bron/bouw/bio_deel.py src/lib_bio.js src/lib_bio_deel.js src/lib.js src/lib_voeding.js src/lib_hormonen.js src/lib_cast.js src/castfiguren.js src/oud_engine.js src/scenes_oud.js -- <namen: zie de tweede regel van lib_bio_deel.js>
set -e
R="$(cd "$(dirname "$0")/../../../.." && pwd)"; B="$R/films/voortplanting/1-precies-op-tijd/bron"; T="${VP1_WERK:-/tmp/vp1-bouw}"
rm -rf "$T"; mkdir -p "$T/eng" "$T/film/words"
cp "$B"/src/{lib.js,lib_hormonen.js,lib_voeding.js,lib_cast.js,page.html,fonts.css,player.js} "$B"/bouw/{build.py,build_data.py} "$T/eng/"
cp "$B"/{film.py,segments.json,sections.html,glossary.json} "$T/film/"; cp "$B"/stem/woordtijden/*.json "$T/film/words/"
S="$B/src"; { cat $S/oud_engine.js $S/vp1_kop.js $S/lib_bio_deel.js $S/castfiguren.js $S/oudfilm.js $S/scenes_oud.js; echo 'const SCENES = {};'; cat $S/vp1_adapter.js; } > "$T/film/scenes.js"
cp "$S/player_vp1.js" "$T/film/player_extra.js"
cd "$T/film" && python3 film.py >/dev/null && python3 ../eng/build_data.py . && python3 ../eng/build.py .
cp film.json filmdata.json "$B/"
THEMA="<script>(function(){try{var t=localStorage.getItem('thema');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script>"
python3 - "$T/film/film/1-precies-op-tijd.html" "$R/films/voortplanting/1-precies-op-tijd.html" "$THEMA" <<'PY'
import sys; h = open(sys.argv[1], encoding='utf-8').read(); t = sys.argv[3]
if "getItem('thema')" not in h: h = h.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + t, 1)
h = h.replace('<script src="../../js/flipkaarten.js" defer></script>', '')
h = h.replace('</body>', '<script src="../../js/flipkaarten.js" defer></script>\n<script src="../../js/oefenen.js?v=bc151008" data-oefenen="1-precies-op-tijd/oefenen.json" defer></script>\n</body>', 1)
open(sys.argv[2], 'w', encoding='utf-8').write(h); print('geschreven', sys.argv[2], len(h))
PY
