# Zwanger — bouwen vanuit de repo-root:  bash films/voortplanting/zwanger/bron/bouw.sh
# Werkmap /tmp/zwanger-bouw; schrijft films/voortplanting/zwanger/index.html. Audio staat al in ../audio.
set -e; B=films/voortplanting/zwanger/bron; W=${W:-/tmp/zwanger-bouw}; rm -rf $W; mkdir -p $W/words $W/eng
cp $B/src/* $B/bouw/stills.py $W/eng/; cp $B/film.py $B/sections.html $B/segments.json $W/; cp $B/stem/woordtijden/*.json $W/words/
cd $W; { cat eng/scenes_kop.js; echo 'const SCENES = {};'; cat eng/lib_bio_deel.js eng/teken_zw.js eng/scenes_zw.js; } > scenes.js
python3 film.py >/dev/null && python3 eng/build_data.py . && python3 eng/build.py .
cd - >/dev/null; cp $W/film/index.html films/voortplanting/zwanger/index.html; cp $W/film.json $W/filmdata.json $B/
ln -sfn "$(pwd)/films/voortplanting/zwanger/audio" $W/film/audio
echo "klaar: draai daarna scripts/teller.py, flipkaarten.py, oefenen.py, licentie_noot.py, spelerfix.py, antwoordtekst.py, kortantwoord.py, antwoordletter.py, microteken.py (zie info.md)"
