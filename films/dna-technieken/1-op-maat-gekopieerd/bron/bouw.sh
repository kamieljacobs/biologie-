# Op maat gekopieerd 2.0 — bouwen. Zet een werkmap buiten de repo op:  <werk>/eng = bron/src/* + bron/bouw/*,
# <werk>/film = bron/{segments.json,film.py,sections.html,bouw.sh} + src/{teken_pcr.js,scenes_pcr.js} + audio (../audio/*.mp3)
# + words (= stem/woordtijden). Dan: bash film/bouw.sh  →  film/film/index.html (site) en standalone.html.
# Nieuwe knip uit narration.mp3: python3 eng/knip_take.py omg_tl.json narration.mp3 film && python3 eng/woordtijden.py film omg_tl.json
set -e; cd "$(dirname "$0")"; E=../eng
python3 $E/bio_deel.py $E/lib_bio.js $E/lib_bio_deel.js $E/lib.js $E/lib_voeding.js $E/lib_hormonen.js $E/lib_cast.js -- \
  pcrBuisje thermocycler micropipet polymeraseAchter polymeraseVoor vrijNucleotide d2Base d2Rug baseBruggen dnaLadderHelix dnaDraad cdChromosoom bacterieEcht eiwitVouw DNA_BASE D2 CD
{ cat $E/kop.js; echo 'const SCENES = {};'; cat $E/lib_bio_deel.js teken_pcr.js scenes_pcr.js; } > scenes.js
python3 film.py >/dev/null && python3 $E/build_data.py . && python3 $E/build.py .
