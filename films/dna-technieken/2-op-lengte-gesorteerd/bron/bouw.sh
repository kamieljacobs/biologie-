# Bouwt Op lengte gesorteerd 2.0 in een werkmap buiten de repo. Gebruik: bash bouw.sh <werkmap>
# Daarna film/2-op-lengte-gesorteerd.html → ../index.html (regeltje 'donker is standaard' direct na <meta charset> zetten),
# en in de repo spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, tabel_mobiel, licentie_noot, teller, oefenen draaien.
set -e; BRON="$(cd "$(dirname "$0")" && pwd)"; W="$1"; mkdir -p "$W/eng" "$W/words" "$W/raw"
cp "$BRON"/src/*.js "$BRON"/src/*.html "$BRON"/src/*.css "$BRON"/bouw/*.py "$W/eng/"; cp "$BRON"/film.py "$BRON"/oud_page.json "$BRON"/segments.json "$W/"
cp "$BRON"/src/teken_gel.js "$BRON"/src/scenes_gel.js "$W/"; cp "$BRON"/stem/woordtijden/*.json "$W/words/"; cp "$BRON"/../audio/*.mp3 "$W/raw/"
cd "$W"; { cat eng/kop.js; echo 'const SCENES = {};'; cat eng/lib_bio.js teken_gel.js scenes_gel.js; } > scenes.js
python3 film.py >/dev/null && python3 eng/build_data.py . && python3 eng/build.py .
mkdir -p film/audio && cp raw/*.mp3 film/audio/
