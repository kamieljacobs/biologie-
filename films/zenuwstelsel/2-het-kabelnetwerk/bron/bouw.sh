# Bouwt Het kabelnetwerk 2.0 opnieuw uit deze bronmap (werkmap buiten de repo).
# 1. Werkmap: W=/home/claude/werk/zen2; mkdir -p $W/eng $W/film/raw $W/film/words
#    cp bron/src/{player.js,page.html,kop.js,lib.js,fonts.css,lib_*.js} bron/bouw/*.py $W/eng/
#    cp bron/src/{teken_z2.js,scenes_z2.js} bron/{film.py,sections.html,glossary.json,segments.json} $W/film/
#    cp bron/stem/woordtijden/*.json $W/film/words/ ; cp ../audio/*.mp3 $W/film/raw/
# 2. Bouwen (dit script) en daarna de film in de repo zetten met de themaregel na <meta charset> en de site-scripts
#    (spelerfix, antwoordtekst, kortantwoord, flipkaarten, tabel_mobiel, licentie_noot, teller; zie remake-2026-10/naar_repo.sh).
set -e; cd /home/claude/werk/zen2/film; E=../eng
{ cat $E/kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js teken_z2.js scenes_z2.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
