# Bouwt De spleet 2.0 opnieuw. Werkmap buiten de repo: kopieer src/ + bouw/ naar <werk>/eng en de rest naar <werk>/film,
# zet de takes in <werk>/film/film/3-de-spleet/audio (= films/zenuwstelsel/3-de-spleet/audio) en draai dit vanuit <werk>.
# Werkmap 29 okt 2026: /home/claude/werk/zen3.
set -e; cd film; E=../eng
{ cat $E/scenes_kop.js; echo 'const SCENES = {};'; cat $E/lib_anatomie.js $E/lib_bio.js teken_z3.js scenes_z3.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
# daarna: film/3-de-spleet-nieuw.html → films/zenuwstelsel/, themaregel direct na <meta charset> zetten,
# en spelerfix/antwoordtekst/kortantwoord/antwoordletter (+ --check), flipkaarten, tabel_mobiel, licentie_noot, teller draaien.
