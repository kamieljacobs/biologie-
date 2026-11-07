# Bouwt Zenuwstelsel 1 'Eén seconde' 2.0 (lichte remake 29 okt 2026) opnieuw uit deze map.
# Werkmap buiten de repo: kopieer src/ en bouw/ naar <werk>/eng, de rest (film.py, sections.html, segments.json, words/) naar <werk>/film.
set -e; W=${W:-/home/claude/werk/zen1r}; cd $W/film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js teken_z1.js scenes_z1.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
# daarna: film/1-een-seconde-nieuw.html → films/zenuwstelsel/, themaregel na <meta charset>, audio staat in films/zenuwstelsel/1-een-seconde/audio/,
# en de scripts uit CLAUDE.md (spelerfix, antwoordtekst, kortantwoord, antwoordletter, flipkaarten, tabel_mobiel, licentie_noot, teller).
