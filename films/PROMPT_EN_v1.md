> English films for the channel **Unboxing Biology** (@unboxingbiology) and the English section of the site. This file is Part E: a profile on top of the newest Dutch film prompt (now `films/PROMPT_v10.md`). Shared source for all of Kamiel's Claude accounts; change it here (or make PROMPT_EN_v2.md) and push.
>
> Status: v1, 25 okt 2026, drafted by Claude from Kamiel's choices (international audience 15–18, British English, a completely new cast, stills first). **Not yet reviewed by Kamiel**: open points are listed in E11.

# Part E — English films (Unboxing Biology) — v1

## How to use

Paste Part B and Part C of the newest Dutch prompt, then this Part E. Part E wins over Part B where they differ; Part C (the look) stays binding, with only the text changes in E6. Everything Part B says about pedagogy, simulation, review passes, QA, the bronmap, variatie en selectie and opwaarderen holds unchanged. So every improvement to the Dutch prompt reaches the English films automatically; only what is language-, audience- or channel-specific lives here.

Part D (onderbouw) never applies to English films.

## E1. Audience and levels

- **Audience:** international, age 15–18, watching on YouTube or on the site, in or outside school. No single curriculum: the films teach biology as it is taught at upper-secondary level worldwide.
- **Two levels instead of havo/vwo:** **Core** (the shared upper-secondary core, roughly GCSE / middle years) and **Deeper** (roughly A-level, IB HL, AP, first-year university). A Deeper block follows every rule for vwo blocks in B4: a contiguous segment that deepens what Core just showed, not announced in the narration, marked by the purple bar with DEEPER in Meta (instead of VWO), and the Core line is complete without it.
- NIVEAU in the brief: "core + deeper blocks" (default), "core" or "deeper".
- Player switch **Core / Deeper** in place of Havo / Vwo (`?level=core`, default Deeper). Chapter list, glossary and check questions are tagged the same way.
- **No national exam.** EXAM QUESTIONS from the Dutch CE do not apply, and questions from exam boards (AQA, OCR, Edexcel, IB, College Board) are never copied or paraphrased closely. The film's check and prediction questions are its own, in exam style.
- **SPEC LINKS** (optional brief field, replaces METHOD + CHAPTER): which syllabus points the film covers, e.g. "AQA GCSE Biology 4.2.2, IB Biology B3.2, AP Biology 3.5". Used only in the teacher section, so a teacher anywhere sees where it fits. Never makes the film follow one board's wording.
- **Terms:** the internationally used scientific term (IUPAC names for molecules where students meet them, SI units). Where British and American usage differ, the British term, with the American one in the glossary ("haemoglobin (US: hemoglobin)").

## E2. Language

- **British English**, Oxford spelling in general; for medical and anatomical terms, the spelling the NHS website uses (haemoglobin, oesophagus, fetus). Captions, on-screen text, glossary and page all in the same spelling.
- Spoken style: second person ("you"), active voice, contractions allowed ("it's", "doesn't"), one idea per sentence, mostly under 15 words. Natural spoken British English at the level of a curious 16-year-old, not textbook prose.
- **Word budget:** about 150 words per minute of narration; measure the real rate of the chosen voice on the first film and fix it here.
- **Numbers:** decimal point and comma for thousands (1.5 mm, 37 °C, 10,000 cells), written the way they are said. SI units with a space before the unit. Rounded values with "about" or "roughly".
- **Teleology:** molecules and cells never "want", "try", "know", "look for", "decide" or "need to". The same "two whys" rule as B3.
- **Prediction cards** say "What do you think?"; never "Predict."
- **Translating, not transcribing:** an English film is written in English from the start. When an English film is made from a Dutch one (E9), the script is rewritten for the new audience, never translated sentence by sentence.

## E3. Voice and pronunciation

- **Voice:** one British English ElevenLabs voice for all English films, chosen by Kamiel before the first film from a short test paragraph read by each candidate (one take each, the same paragraph). Candidates: *Alice — Clear, Engaging Educator* (`Xb7hH8MSUJpSbSDYk0k2`, premade, female), *Philippa — Clear British Narrator* (`IbXTsH7MlHi5GQco8zZH`, female), *Benedict — Premium British (RP) Male* (`6q6UVsvekS0UjrUXFz79`, strong on scientific terms). The choice and model go into this section and into every brief (VOICE).
- **Uitspraaklijst:** a separate English list, `films/en/PRONUNCIATION.md` (readable) and `films/en/pronunciation.json` (replacement rules for the voice input). The Dutch lists never apply to English films.
- **Sources** for a risk word: the UK IPA in the Oxford Learner's Dictionaries and the Cambridge Dictionary; for medical terms also the NHS page; for Latin binomials and Greek-derived terms the British scientific pronunciation (note the stressed syllable). If they disagree, mark the word doubtful.
- **Everything else in B5 and B8 holds:** no uitspraaktest before recording, IPA lookup first, one take per paragraph, blind transcription of the real takes, the uitspraakwachtlijst per film that Kamiel listens to in batches. Because English is not Kamiel's first language, the blind transcription is the main check; Kamiel's ear is the second.
- Mastering as B8 (−16 LUFS, true peak ≤ −1 dBTP).

## E4. Hooks, examples and data

- **Daily-life hooks** from the world of a 15–18-year-old anywhere: school, sport, food, phones, pets, weather, travel, health. Understandable without knowing the Netherlands or the UK; nothing that only one country has (Dutch holidays, one country's school system, one brand).
- **Health systems and law** differ per country: where they matter (vaccination schedules, screening, organ donation), say whose rule it is ("in the UK…", "in many countries…") or keep to the biology.
- **Data:** international sources first (WHO, FAO, IPCC, peer-reviewed reviews); a national figure is labelled with its country and year. Every number still goes into the numbers table with its source (B1).
- **Examples of organisms:** prefer species known widely or shown with a short context; a species that only lives in one region is introduced with where it lives.

## E5. Cast

- The English films have **their own cast**: `personages/en/CAST.md` (roles, names, ages, looks) and, once drawn, `personages/en/lib_cast_en.js` with the same function and options as the Dutch castboek (`persoon(ctx, id, x, y, h, {uit, pose, kijk, zij, gang, t})`, garderobe, the gait engine). English films never use the Dutch cast, and Dutch films never use the English one.
- **Contour lines** (Kamiel 25 okt 2026): characters in the new cast style have a thin dark contour line (a dark tone of their own fill); everything else in the frame keeps Part C (no outlines). See BEELDAFSPRAKEN.md.
- **Stills first** (Kamiel 25 okt 2026): every new character is designed first as an ElevenLabs still (a cast sheet, one variant), approved by Kamiel, and only then drawn in code and checked against the still on a test sheet (C10 steps 3–5). The still is a design plate, never an image in a film.
- Fixed roles as in ROLLEN.md: the same role is always the same person ("you" = Maya, the doctor/researcher = Dr Ana Ribeiro, the teacher = Mr Mensah, family = Maya's family). Origin never decides the role, and no character is a stereotype.
- Every rule in Part C and BEELDAFSPRAKEN.md about people holds: castpersonages with face, skin colour and clothes; no grey placeholder figures; side view for walking and running; human moments that carry the concept.

## E6. Look

Part C is unchanged: same three looks, palette, betekeniskleuren, typography, UI layer and drawing recipes, so both channels look like one family. Only the words change:

- All on-screen text in English. Meta labels in capitals: SCHEMATIC, SIMPLIFIED, MODEL, NOT TO SCALE, MAGNIFIED ×1000, ONE BETA CELL; speed labels "1 s = 1 day", "1000× slower".
- Level marker: DEEPER instead of VWO. Lab library variables: INDEPENDENT, DEPENDENT, CONTROL.
- Title card Meta: series and level, e.g. DEEPER · METABOLISM 3/4. Question card: "What do you think?".
- English words run longer than Dutch ones only sometimes, but check every label for overlap after translating (B11): a label that no longer fits gets a shorter word, never a smaller font than Part C allows.
- Text that appears in a scene lives in a string table per language (`TEKST.en`, `TEKST.nl`), never hard-coded in the drawing code, so a scene can be reused in the other language.

## E7. Site

- **Files:** `films/en/<theme>/<n>-<slug>.html` with the bron folder next to it as in B12; English slugs (`films/en/cells/1-inside-a-cell.html`). The page has `lang="en"`.
- **English section:** `en/index.html`, the English counterpart of the themes page, built when the first English film is ready (themes as in `BASIS`, English titles; the same medallions). The navigation bar of an English film reads "Unboxing Biology" (link to `../../../en/index.html`) and, in gold, "← Back to <theme>".
- **Language link:** when a film exists in both languages, each page links to the other ("English" / "Nederlands") at the top, recorded in both bron/info.md files.
- **Shared site tools need English labels before the first English film:** flashcards (`js/flipkaarten.js`), exercises (`js/oefenen.js`), the feedback button (`js/feedback.js`), the licence note (`scripts/licentie_noot.py`), the review mode and the player's buttons and help box. They pick the language from `<html lang>`; Dutch stays the default. Make this once, as its own task, not per film.
- Analytics (GoatCounter), licence (CC BY-NC-SA 4.0), dark mode as default and the review mode work as on the Dutch site.

## E8. YouTube delivery

Every English film is delivered for YouTube as well as for the site. Upload is done by Kamiel on the channel Unboxing Biology; Claude prepares everything in the bron folder under `bron/youtube/`.

- **MP4 always** (not only on request): 1920×1080, 30 fps, H.264 yuv420p + AAC, faststart. Default: the Deeper version (whole film). A Core-only MP4 only when Kamiel asks.
- **Prediction moments in the MP4:** the vraagkaart with a 5-second countdown and the line "Pause the video and decide" in Meta; the answer follows. (On the site the player keeps its 8 s and Leerling/Klas modes.)
- **Captions:** `captions.en.srt` and `.vtt` from the exact script (British spelling), phrase by phrase, synced to the word timestamps. Never auto-generated captions.
- **Chapters:** `chapters.txt` in YouTube format (first line 0:00, at least three chapters, each at least 10 s), from the cue table.
- **Title:** at most 60 characters, the puzzle question or the topic plus a hook, no clickbait the film doesn't answer. **Description:** two lines with the puzzle and what you'll learn, the chapter list, a link to the film's page on the site (with flashcards and exercises), sources in one line, voice and licence (CC BY-NC-SA 4.0, © Kamiel Jacobs). **Tags:** 5–10.
- **Thumbnail:** `thumbnail.png`, 1280×720, made from a style frame: one large object in the film's look, at most four words in the Titel font, readable at phone size. No raster images, no faces of real people.
- **End screen:** the last 15 s hold the end card (three key sentences) in the left two-thirds; the right third stays calm navy for YouTube's end-screen elements.
- **Audience setting** ("made for kids" or not) is Kamiel's choice per channel; Claude notes it in `bron/youtube/upload.md` together with title, description, tags and the playlist the film belongs to.

- **No references to tools** (Dutch prompt B4): the film never points to a tool, exercise or page of the site, and never says it out loud (no "Try it yourself", no "on the website"). The YouTube description may link to the film's page.

## E9. Making an English film from a Dutch one

Fill PREVIOUS VERSION with the Dutch film's path. Claude reads its bron folder first (B13).

- **Reuse:** the film plan, storyboard, simulations, scene code, library objects, numbers table and teacher section structure.
- **Rewrite:** the script, for an international audience (E2, E4): new hook where the Dutch one is Dutch-specific, Dutch exam questions and method references removed, terms per E1. The review passes of B4 run again on the English script, the language pass in English.
- **Replace:** every Dutch castpersonage by the English cast member with the same role (E5); all on-screen text through `TEKST.en` (E6).
- **New:** the English recording, word timestamps, cue table (cues move to the English cue words), captions, the YouTube folder (E8) and the uitspraakwachtlijst for the English risk words.
- bron/info.md of the English film: "Translated from: <Dutch path>" and "Voldoet aan: prompt v10 + EN v1". The Dutch film's info.md gets a line with the English path, and both pages get the language link (E7).
- Good first candidates: films whose topic is the same everywhere (cells, DNA, enzymes, evolution) and whose Dutch version has status 'ok' in the review.

## E10. Brief fields that change

| Field (Part A1/A2) | In English films |
| --- | --- |
| AUDIENCE | "international, 15–18" (default) |
| NIVEAU | core + deeper blocks / core / deeper (E1) |
| METHOD + CHAPTER | replaced by SPEC LINKS (E1) |
| EXAM QUESTIONS | not used (E1) |
| KERNDOEL | not used |
| VOICE | the English voice from E3 |
| SERIES | English series; glossary and uitspraaklijst per E3 |
| PREVIOUS VERSION | an English film to change (B13), or a Dutch film to make an English one from (E9) |
| YOUTUBE | optional: playlist, audience setting, Core-only MP4 yes/no |

## E11. Open points for Kamiel

1. Choose the voice (E3) after the test paragraph.
2. Approve the cast sheet (vel 1, `personages/en/CAST.md`); then vel 2 (Maya's family).
3. First film: a new topic or an English version of an existing Dutch film (E9)? Proposal: one of the cell or DNA films with status 'ok'.
4. Approve the YouTube conventions in E8 (5 s countdown in the MP4, end screen, thumbnail style).
5. When to build the English section of the site and the English labels for the shared tools (E7).

## Wijzigingen

● EN v1 (25 okt 2026): first version. Part E on top of prompt v10: international audience 15–18 with Core/Deeper levels, British English, own voice and English uitspraaklijst, own cast with stills first, English section of the site, YouTube delivery, making English films from Dutch ones.
