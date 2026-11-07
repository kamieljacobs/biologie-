# De cyclus — bouwen vanuit de repo-root:  bash films/voortplanting/cyclus/bron/bouw.sh
# Werkmap /tmp/cyclus-bouw; schrijft films/voortplanting/cyclus/index.html. Audio staat al in ../audio.
set -e; B=films/voortplanting/cyclus/bron; W=/tmp/cyclus-bouw; rm -rf $W; mkdir -p $W/words $W/eng
cp $B/src/* $B/bouw/build.py $B/bouw/build_data.py $W/eng/; cp $B/film.py $B/sections.html $B/segments.json $W/; cp $B/stem/woordtijden/*.json $W/words/
cd $W; { cat eng/scenes_kop.js; echo 'const SCENES = {};'; cat eng/lib_bio_deel.js eng/teken_cy.js eng/scenes_cy.js; } > scenes.js
python3 film.py >/dev/null && python3 eng/build_data.py . && python3 eng/build.py .
cd - >/dev/null; cp $W/film/cyclus.html films/voortplanting/cyclus/index.html; cp $W/film.json $W/filmdata.json $B/
echo "klaar: draai daarna scripts/teller.py, flipkaarten.py, oefenen.py, licentie_noot.py, spelerfix.py, antwoordtekst.py, kortantwoord.py, antwoordletter.py, microteken.py (zie info.md)"
