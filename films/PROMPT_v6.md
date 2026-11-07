> **Verouderd:** de nieuwste prompt staat in `films/PROMPT_v10.md` (24 okt 2026). Dit bestand blijft alleen staan omdat oudere films ernaar verwijzen.

> Lees ook `films/BEELDAFSPRAKEN.md`: algemene beeldfeedback van Kamiel gaat vóór wat hieronder staat.

# Prompt uitlegfilms biologie — v6
<?claude block asof?> · <?claude block me?> · ◆ = nieuw in v4 · ★ = nieuw in v5 · ● = nieuw in v6
## How to use
v6 is the general prompt: it carries no series-specific content. ◆ The look of the films is now Part C and is binding for every film; the old STYLE link and the design-system rules in B9 are replaced by it. ◆ The DNA series brief has moved to a separate document ("Seriebriefs uitlegfilms biologie"), together with the brief for the cell series (diffusie, organellen, celdeling).
Fill in the film brief (only TOPIC and AUDIENCE are required) and paste it together with Part B and Part C into a new conversation. Leave LEERDOELEN empty and Claude first works out the topic specification with you.
For a series: fill in the series brief (Part A2) once. For each film, paste the series brief, a short film brief (Part A1 with only the fields that differ), Part B and Part C.
◆ Assets from the illustrator (SVG files) attach to the film or series brief under ATTACHMENTS. Part C says how Claude uses them; without assets Claude draws everything itself by the rules in Part C.
★ Onderbouw: when AUDIENCE is onderbouw (leerjaar 1–3), also paste Part D. Part D adapts level, language, length and the brief to the new kerndoelen and wins over Part B where they differ.
● Autonomous mode: with a filled-in series brief and the bouwlijst ("Bouwlijst uitlegfilms biologie"), Claude builds the films of a series one after another without waiting for approval (B7). Kamiel reviews later, in batches, from the checkpoint pages and the films on the site.
★ Storage: every film lives in the site repository (kamieljacobs/biologie-) with a bron/ folder next to it (B12). To change an existing film, give its path under PREVIOUS VERSION and follow B13; no film brief is needed for a small fix.
## Part A1 — Film brief
| Field |  |
| --- | --- |
| TOPIC |  |
| AUDIENCE | e.g. 4 vwo, or "havo + vwo" |
| ★ KERNDOEL | onderbouw only, replaces METHOD + CHAPTER: number and bullets of the SLO kerndoel, e.g. "32A, bullets 1–2" (see Part D) |
| NIVEAU | one level, or "havo + vwo, vwo-blokken gelabeld" (see B4 and B10) |
| LENGTH | target in minutes, or "content decides" |
| USE | zelfstandig / klassikaal / beide (default: beide) |
| METHOD + CHAPTER | optional, e.g. Nectar 4 vwo H6; for two levels name both methods |
| LEERDOELEN | optional, paste them; for two levels tag each leerdoel "basis" or "vwo" |
| TERMS & DEFINITIONS | optional, these override every other source |
| KNOWN MISCONCEPTIONS | optional |
| EXAM STOF / VERDIEPING | optional |
| EXAM QUESTIONS | optional: real CE questions to use, with year, tijdvak and number (see B4) |
| CENTRAL PUZZLE | optional, or "propose three" |
| DAILY-LIFE HOOK | optional: the everyday situation this film opens or closes with |
| LEAVE OUT | optional, e.g. "celdeling: separate film" |
| SERIES | optional, reuse its glossary, uitspraaklijst and player |
| ◆ LOOKS | optional: the look per scene level when the film deviates from the default in Part C (e.g. "orgaan als Macro-lichaam met Micro-zoom", "Macro-dag") |
| ◆ ASSETS | optional: SVG files from the illustrator and what each one shows; attached assets override Claude's own drawings of the same object |
| ◆ PREVIOUS VERSION | ★ optional: the film's path in the site repo (films/<hoofdstuk>/<n>-<slug>.html) or a link; Claude reads its bron/ folder first and reuses script, numbers and cue table; the look is always rebuilt by Part C |
| ATTACHMENTS | optional, e.g. chapter pages, begrippenlijst, previous film folder |
| VOICE | Roos (ElevenLabs); add the model if you know it |
| NOTES |  |
◆ The STYLE field is gone: the look is Part C and is not chosen per film.
## Part A2 — Series brief
Filled in once per series; every film brief inherits it. ◆ Filled-in series briefs (DNA, Cel) live in the separate document "Seriebriefs uitlegfilms biologie".
| Field |  |
| --- | --- |
| SERIES NAME |  |
| FILMS | numbered list with working titles |
| AUDIENCE + NIVEAU |  |
| METHODS | per level |
| ◆ SERIES COLOURS | which objects of this series get which of the six betekeniskleuren from Part C, fixed in film 1 and reused; a series never adds a seventh colour, it may add tints of one colour for a family of objects (e.g. the four basen as four tints of paars) |
| ◆ SERIES LIBRARY | the recurring objects of this series (molecules, organelles, organisms, lab objects) that must look identical in every film; the first film that draws one fixes it |
| NIVEAU LABEL | as in Part C (paarse balk + VWO); only note here if a series needs it announced differently in the narration |
| PLAYER | reuse the series player; list the switches it must have |
| GLOSSARY | shared; each film adds to it, never redefines |
| UITSPRAAKLIJST | the series copy of the list in B5, grows with every film |
| RECURRING CHARACTER / RODE DRAAD | optional |
| DAILY-LIFE HOOKS | per film |
| LENGTH | per film or "content decides" |
| VOICE |  |
| LEAVE OUT |  |
| SERIES PAGE | all films on one page with the shared glossary |
◆ SHARED COLOUR MEANINGS from v3 is replaced by SERIES COLOURS: the meanings are fixed in Part C for all films; a series only maps its own objects onto them.
## Part B — Production standard
Make an animated explainer film about the topic in the brief, in Dutch, as one web page. Work in this order: topic specification (only if needed) → diagnosis → script → pronunciation → storyboard and style frames → checkpoint → audio → build → QA → delivery.
### 1. The bar
A film that a Feynman-level domain expert, a pedagogy expert and a top science-animation studio would each sign off on. In practice, four tests:
Why test: every claim about how something works follows from a mechanism the viewer has actually seen on screen. What can't be shown (names, measured values, history, or a mechanism that another film covers) is presented as a given fact ("dat is gemeten", "dat zie je in de film over celdeling"), never dressed up as an explanation.
Learning test: a student from the audience who watches once can answer the opening puzzle and the check questions. With two levels: a havo student who watches without the vwo blocks passes the basis questions.
Pause test: any paused frame could go into a textbook. One focal point, readable text, consistent colour meanings, nothing irrelevant. ◆ And it obeys Part C: a paused frame is recognisably one of the three looks with the UI layer in place.
Accuracy test: every number, unit and scale is checked (µm vs mm, orders of magnitude) and listed with its source. Rounded values are said with "ongeveer". Simplifications are labelled "vereenvoudigd", "niet op schaal" or "model".
When rules conflict, this order decides: (1) scientific correctness, (2) clarity for the audience, (3) the pedagogy rules, (4) ◆ the look in Part C, (5) visual ambition such as continuous movement and real simulation, (6) the length target. Break the lower rule and note it in the QA report.
The brief binds: my definitions are used as given. Doubts about them are raised in the specification or at the checkpoint, never resolved by you.
### 2. Topic specification
Leerdoelen given: use them, and any terms and definitions, exactly as given. My definitions override the method, other sources and your own preferences. If something I gave is wrong or conflicts with the CE syllabus, flag it; never change it silently. Anything you add (terms, misconceptions, a puzzle) is marked and shown at the checkpoint.
No leerdoelen: before writing anything, propose a short specification and discuss it with me:
4–8 leerdoelen ("de leerling kan …") at the audience's level; with two levels, each tagged basis or vwo;
the key terms, with the definitions you would use, in the wording of Dutch biology methods;
the scope: what's in, what's out, and what is exam stof versus verdieping;
the 3–5 most common misconceptions about this topic;
three candidate central puzzles, each starting from something students have seen themselves;
the chapter types from section 3.
Then wait for my answer.
Central puzzle: if CENTRAL PUZZLE says "propose three" and leerdoelen are given, send only the three puzzles in one short message and wait for my pick. If it's empty, choose one and explain why at the checkpoint.
Sources you can't open: if you can't open something (the method, a previous film, an asset file, the web), say so in your first reply. Never attribute wording to a method you haven't seen, and mark unchecked items "niet gecontroleerd".
### 3. Diagnose the topic: how the film adapts
Give every chapter one primary type. The type sets the axis the film moves along, the simulation, the expert who reviews it and the extra checks. Most films mix two or three types. ◆ The look of each scene follows from its scale level by the rules in Part C, not from the type.
| Type and typical topics | Axis | Simulation and visuals | Expert | Extra checks |
| --- | --- | --- | --- | --- |
| A. Mechanism at a smaller scale: diffusie, osmose, enzymwerking, membraantransport, dissimilatie, fotosynthese, eiwitsynthese, DNA-replicatie, impulsgeleiding | Scale: one continuous zoom from the everyday to molecules and back, with a true scale bar | Particles that really move, collide and bind | Biochemist or biophysicist | Net effects are statistics of random motion, not intention; orders of magnitude |
| B. Structure and function: celorganellen, bladbouw, hart, nefron, longblaasjes, darmvlokken, bouw van DNA | Space: zoom, cutaway, exploded view, layer by layer | The 3D object before any cross-section; counterfactuals ("wat als dit oppervlak kleiner was?") | Cell biologist or anatomist | Function follows from structure, never just a list of parts |
| C. Process in time: celcyclus, mitose en meiose, bevruchting, embryonale ontwikkeling, menstruatiecyclus, spijsvertering | Time: a visible clock or timeline | The same objects transform (a chromosome stays that chromosome); graphs draw themselves in sync | Developmental or reproductive biologist | Order, durations and time scales |
| D. Regulation and feedback: homeostase, bloedglucose, temperatuurregeling, hormoonregulatie, genregulatie | A cause-and-effect loop | A live model with sensor, set point and effector; scripted disturbances the loop responds to; graphs computed by the model, not drawn | Physiologist | Negative vs positive feedback, delays; "het lichaam wil" never appears |
| E. Inheritance and chance: kruisingsschema's, stambomen, X-chromosomale overerving, koppeling, mutatie en toeval | Generations and probability | Real random draws (gametes from a bag), so ratios emerge and wobble in small families; worked examples that fade into "nu jij" | Geneticist | Ratios are probabilities, not guarantees; notation exactly as in the method |
| F. Populations, ecosystems and evolution: populatiegroei, draagkracht, voedselweb, energiestroom, kringlopen, natuurlijke selectie, soortvorming | Time (years, generations) and scale upwards: individual → population → ecosystem | Agent-based simulation; follow one hero individual or atom | Ecologist or evolutionary biologist | Energy flows, matter cycles; populations change, individuals don't adapt; evolution has no goal |
| G. Method and reasoning: onderzoek doen, variabelen, betrouwbaarheid en validiteit, grafieken, vergroting berekenen, DNA-technieken (PCR, gel, sequencing) | Reasoning steps, often along a historical experiment | Reconstructed experiments with realistic measurement noise; the viewer predicts each choice before the film shows it | Research methodologist | Conclusions never outrun the data; correlation is not causation |
| H. Frontier science: veroudering, epigenetica, microbioom | Evidence | Each claim carries its evidence level on screen (vastgesteld, waarschijnlijk, hypothese); models labelled as models | Researcher in the field | An evidence table per claim before writing, weighted by study quality and by how many independent studies agree; say what we don't know |
| I. Application and choice: DNA-testen, erfelijkheidsadvies, GM-voedsel, vaccins, leefstijl en gezondheid | A decision the viewer may face, from the everyday situation down to the mechanism and back to the decision | A case the viewer recognises, with the molecular zoom from the earlier films; a decision tree or balance that fills in as evidence appears | Clinical geneticist, physician or ethicist | Separate what is known from what is value-laden; never prescribe a personal choice; name who benefits and who bears the risk |
For every type:
Start from something the audience has seen, move continuously along the axis to where the explanation lives, and come back to the everyday observation at the end.
Within a chapter: no hard cuts, no empty frames, no pop-ins. Use camera moves, morphs and time-scrubs. ◆ The one exception is a change of look, which happens only by the zoomcirkel or by a cut to a Schema card (Part C, keuzeregels). Between chapters: a chapter card. For axes that aren't space or time, continuity means one persistent diagram, loop or evidence board that grows, never a new slide.
Simulate, don't illustrate: wherever a process can be simulated, what happens on screen comes from the simulation.
Two whys: say whether a chapter explains how something works or why it evolved, and never present a function as a cause. Molecules and cells don't "willen", "proberen", "weten" or "zoeken".
A topic that fits none of the types: define a new type in the same five columns and show it at the checkpoint, or in the specification when there is one.
### 4. Script
Chapters of short spoken lines: one idea per sentence, mostly under 15 words, active voice, je-vorm, numbers written the way they are said.
Word budget: about 140 words per minute of narration; calibrate on the uitspraaktest clip.
Structure: cold open with the puzzle (at most 20 s) → title → chapters → recap that answers the puzzle → end card. Every chapter has its own mini-question and payoff, so it also works when shown on its own.
Daily-life hook: when the brief gives one, it is the cold open or the final beat, and the recap connects the mechanism back to it.
At least one prediction question per chapter, with 2–4 options, one of which is a known misconception. Open prediction questions are phrased "Wat denk je?", never "Voorspel."
Misconceptions: name the tempting idea, let the simulation show it failing, and end on the correct idea.
Terms exactly as in the brief or the method, introduced one at a time, each tied to something visible.
Mark verdieping clearly whenever the film goes beyond exam stof.
Two levels (NIVEAU "havo + vwo, vwo-blokken gelabeld")
The basis line is complete and correct on its own: a viewer who skips every vwo block never misses a step that a later basis step needs.
A vwo block is a contiguous segment that deepens a process the basis has just shown (mechanism, direction, enzyme, exception). It is announced in the narration ("Voor vwo gaan we hier nog een stap verder" or a shorter variant) and closed with a one-line return to the basis.
A vwo block is exam stof for vwo, so it is not "verdieping". Verdieping stays its own label and is rare.
Each level has its own check questions. A basis question never needs a vwo block to answer; a vwo question may.
The coverage table has a level column: leerdoel → level → chapter → question.
Terms used only in vwo blocks are tagged vwo in the glossary.
Real exam questions (EXAM QUESTIONS filled in)
Paraphrase the question or quote it briefly with the source on screen (CvTE, examen biologie havo/vwo, jaar, tijdvak, vraagnummer). Redraw tables, gels, karyograms and diagrams in the Schema look of Part C; never paste the original.
Keep the biology of the question intact: same data, same reasoning steps, same answer. The correctievoorschrift decides what counts as correct; say when the film's wording is simpler than the correctievoorschrift.
Let the viewer work the question as a prediction moment before the film solves it.
Review passes. Each pass returns a numbered list of concrete problems and fixes, not a verdict. Revise after each pass.
Expert (chosen per chapter type): run as a separate agent that sees only the brief and the script, when agents are available.
Pedagogy: misconceptions, prediction questions, one new idea at a time, pacing. With two levels: the basis line read without the vwo blocks.
Language: natural spoken Dutch at the audience's level, teleology, sentences the voice will stumble over.
Curriculum: terms and definitions match the brief; a coverage table leerdoel → (level →) chapter → question. Each leerdoel is tested by at least one check question or prediction question; one check question may cover two leerdoelen.
### 5. Pronunciation
List every risk word: biological and chemical terms, abbreviations, Latin and Greek words, species and person names, English loanwords, numbers with units.
Check the uitspraaklijst below first; it always wins.
For every biological term not on the list, cross-reference the correct Dutch pronunciation in at least two written sources where they exist (IPA on nl.wiktionary.org; syllables and stress in Van Dale, woorden.org or another Dutch dictionary). Note the syllables and the stressed syllable. If sources disagree or none exist, mark the word as doubtful.
Decide what the voice receives: the word itself, a respelling ("ei-chromosoom"), or IPA if the model supports it. The captions always keep the correct spelling; keep both text versions in sync.
● No uitspraaktest before recording. For every risk word not on the list, look up the IPA and the stressed syllable first (nl.wiktionary.org, Van Dale, woorden.org; for medical and chemical terms also the Dutch pages of the term), decide the voice input from that, and record the paragraph once. Put the word on the uitspraakwachtlijst (a tab of the bouwlijst): film, word, voice input, the paragraphs it occurs in. Kamiel listens later to many films in one batch; only the paragraphs with a wrong word are re-recorded.
Record one take per paragraph; do not generate several variants per paragraph.
After the final recording, transcribe the real takes blind (the audio uploaded as a file, not connected to the text node, because a transcript connected to the text echoes the text) for every paragraph with a risk word, and compare. A word that comes back wrong is re-recorded with a respelling before delivery; a word that comes back right stays on the wachtlijst for Kamiel's ear.
● A word that sounds wrong in one place (Kamiel's review or the blind transcript) is a word to check everywhere: find every other paragraph in this film and in the other films where the same word occurs (also inflected and in compounds), test it there too (same voice and model), and only then fix the voice input. The approved voice input then goes into this uitspraaklijst and into films/UITSPRAAK.md + films/uitspraak.json, so every later film gets it right from the start (Kamiel 24 Oct 2026).
Approved entries join the uitspraaklijst with the exact voice input and the model they were tested with. At delivery, give the updated list as a block I can paste into Part B.
Uitspraaklijst (updated with everything approved up to October 2026)
| Word | Must sound like (capitals mark the stress where it matters) | Voice input |
| --- | --- | --- |
| erwten | "erten" (ER-tən), not "erften" | respelling as needed |
| vetoplosbaar | vet-oplosbaar, short e as in "vet", not "veet-" |  |
| Y-chromosoom | ei-chromosoom | "ei-chromosoom" |
| oxytocine | ok-sie-too-SIE-nə, ends in a schwa, not "-nee" |  |
| koolstofdioxide | kool-stof-die-ok-sie-də: "die", not English "dai" |  |
| ATP | aa-tee-PEE, Dutch letters, said fluently | ATP (plain spelling; 'aa-tee-pee' was heard as 'AATP', test 24 Oct) |
| cider | SIE-dər, Dutch, not English |  |
| DNA | the letters dee-en-AA, stress on the last letter | DNA (plain spelling; 'deeënaa' put the stress wrong, test 24 Oct) |
| zesenveertig, allel, genotype, Post voor iedereen | as written | plain spelling (test 24 Oct) |
| haploïd | HAA-plo-ïd with a long aa | haaploïd (test 24 Oct) |
| PCR | pee-cee-er | "pee cee er" |
| gel | as the English word gel, not Dutch "geld" |  |
| template | stress on the last syllable |  |
| acetyl-coA | acetyl ko-aa, coA as a word, not spelled |  |
| hypothalamus | hy-po-THA-la-mus, not stress on "mus" |  |
| ACTH, CRH | written as is; do not respell as letters | as written |
| Beagle (Darwin's ship) | English, not Dutch "Biegel" |  |
| muilezel | muil-eezel | "muil-eezel" |
| negentig | neguntig (stomme e) | "neguntig" |
| 95 graden | not as digits, not "vijfennegentig" | "vijf en neguntig graden" |
| 5'-uiteinde, 3'-uiteinde | vijf-accent-uiteinde, drie-accent-uiteinde | "vijf-accent-uiteinde" / "drie-accent-uiteinde" |
| jaartallen | as digits preceded by "het jaar", never written out in words | "in het jaar 1977" |
| voorspelvraag | open the question with "Wat denk je?"; the TTS mispronounces "voorspel" | "Wat denk je?" |
### 6. Storyboard and style frames
Film plan: per chapter its type, axis, central simulation and the misconceptions it tackles. With two levels: which segments are vwo blocks. ◆ Per scene: its scale level and therefore its look (Micro, Macro or Schema), and every change of look with the transition used.
Storyboard: one row per narration line, with the line, its cue words, what's on screen, the on-screen text and the simulation state. A level column (basis / vwo). ◆ A look column.
Cue table: built from the storyboard once the audio exists. One row per cue (a line can have several), with its kind (term, question, answer, action, hold, level-start, level-end, ◆ look-change), its anchor (a word in the narration, or an offset within a silent segment), its time and its duration. The player runs on it, and the computed checks in section 11 use it.
Style frames: 3–4 stills in final quality: the opening, the key mechanism moment, a prediction question, and one moment as seen on a phone. For later films in a series, only the new key visuals. For a two-level film, one frame shows the level label in place. ◆ Every style frame is checked against Part C before the checkpoint: look, palette, typography, UI layer; deviations are listed, not hidden.
### 7. Checkpoint
● Default (autonomous mode): the checkpoint is a self-check. Claude makes the checkpoint page as below, judges it against Part B and Part C as a demanding outsider would, writes down what it chose, added or flagged, saves the page in the film's bron/ folder (bron/checkpoint.html) and builds on. Claude stops only for a decision it cannot take alone: a contradiction in the brief, a CE question that decides the topic, a puzzle choice with no preference given; that question goes into the bouwlijst as an open item and Claude continues with the next film. Every finished film is published on the site and gets status "Gebouwd · wacht op review" in the bouwlijst; Kamiel's later review turns that into "Gereviewd" or "Aanpassen" with his points, and Claude works those through film by film (B13).
Only when the brief says CHECKPOINT: wait, this is the moment I review. Deliver in one go:
the reviewed script, with a short summary of each review pass;
the film plan and the storyboard;
the style frames;
the uitspraakwachtlijst for this film (word, voice input, paragraphs);
the coverage table;
everything you added or flagged, including new chapter types ◆ and any object drawn for the first time that joins the series library;
the numbers table with sources, plus the evidence table for type H;
the expected running time (about 2,4 words per second for Roos); for two levels: with and without the vwo blocks.
In autonomous mode the page is delivered as above but not waited on. When the brief says CHECKPOINT: wait, wait for my approval, then build the whole film without check-ins, and only stop for a problem you can't solve without me.
### 8. Audio
ElevenLabs, with the voice and model from the brief, the same for the whole film and the whole series.
Record continuous takes per paragraph, one take each.
Word-level timestamps: from the voice's own timestamp output when available, otherwise by transcription or forced alignment. ● A transcription connected to the recording's text node gives timings only; it is not a pronunciation check (B5).
If the tool returns several takes, choose by checks you can run: the transcript matches the text including every risk word, the duration is plausible, no clipping. Keep the rejected takes.
The timeline is the narration takes plus fixed silent segments: title and chapter cards, holds and prediction countdowns. During narration the audio is the master clock, and every cue is tied to a word.
Mastering: all takes at the same loudness (−16 LUFS, true peak at most −1 dBTP), consistent pauses between paragraphs, no clicks at the joins.
No music under the narration. Sound effects only where they carry meaning; a short sting on the title and chapter cards is fine.
### 9. Build
Engine
One web page that runs from a web server and by double-click: scripts, styles, fonts and caption data inline, audio as files next to the page. ◆ Fonts: the three typefaces of Part C, embedded.
Deterministic: simulations run on a fixed time step with cached snapshots and seeded randomness, so every moment looks the same whether reached by playing or by seeking.
Timed chance: choose seeds so key events land on their cue word, or script one hero particle among truly random ones. Statistical outcomes such as ratios and distributions always come from the actual simulation. Say so in the teacher section.
MP4 on request: 1920×1080, 30 fps, H.264 (yuv420p) with AAC audio and faststart, plus the captions as a .vtt file. For two levels: a full MP4 and a basis-only MP4 that skips the vwo blocks at their level-start/level-end cues.
If the series already has a player, reuse and improve it instead of rebuilding it.
◆ Keyboard, everywhere on the page (not only when the seek bar has focus): space = play/pause, ← → = 5 s back/forward, Shift+← → = 30 s, ↑ ↓ = previous/next chapter (↑ within the first 2 s of a chapter goes to the previous one), A/B/C or 1/2/3 = answer, Enter = continue in klas mode. Pressing an arrow before Start starts the film. List the keys in the help box under the player.
◆ Site navigation: a slim bar above the title with "Biologie bij Kamiel" (link to ../../index.html#home) and, in gold, "← Terug naar <hoofdstuk>" (link to ../../index.html#<hoofdstuk>). The series line links to the sibling films by relative path (<n>-<slug>.html), never to Claude artifacts; a film that does not exist yet is "· volgt". Files live at films/<hoofdstuk>/<n>-<slug>.html in the site repository.
◆ Look
The design system of v3 (colour, text, motion, time and scale, signalling, level label) is replaced by Part C. Part C is binding for every film and every series. What stays here is what Part C doesn't say:
Time and scale: any speed that isn't real time is labelled ("1 s = 1 dag", "1000× vertraagd"). The scale bar is true for the structures in view; anything drawn larger is tagged "vergroot", with the factor where useful. These labels are set in Meta-mono.
Hold 1–2 s after a key insight.
Colour-blind safe: koraal and groen never carry a contrast on their own; where both are on screen, shape, label or position also tells them apart. Check with a colour-blindness simulation.
Readability on a phone held sideways rules every text size (Part C, Typografie).
Pedagogy in the player
Each prediction moment is a fixed segment in the timeline: the question, the options and an 8-second countdown as thinking time. ◆ It is drawn as the vraagkaart of Part C.
The player has a Leerling/Klas switch. USE sets the default (beide: Leerling, with the switch visible), and a link ending in ?modus=klas opens in Klas mode.
With two levels the player also has a Havo/Vwo switch. Vwo shows everything; Havo skips the vwo blocks and hides vwo check questions and vwo glossary terms. A link ending in ?niveau=havo opens in Havo mode; the default is Vwo. Skipping is seamless: the basis line is written so the audio joins cleanly at every level cue.
Leerling: the film waits until the student taps an option (a tap during the countdown ends it), and after the reveal shows whether the choice was right. Klas: the question stays up until the teacher presses "verder". A setting lets both continue automatically after the countdown.
MP4: the segment simply plays.
No answer appears before it is asked or spoken, and terms stay on screen for at least 5 s. Both are checked on the cue table.
Captions and phones
Captions phrase by phrase, at most two lines, synced to the word timestamps, in the ondertitelkast of Part C. Word highlighting is optional and off by default.
Captions never cover content: on narrow screens the kast sits in a band below the picture; otherwise it sits in a reserved caption zone at the bottom of the stage that no animation or label enters.
Touch-friendly controls. On iPhone, fullscreen is a full-viewport mode with a hint to turn the phone sideways, because iPhone Safari can't make page elements fullscreen.
Smooth playback on a mid-range phone, measured in QA. ◆ The Micro grain is drawn once as a cached texture, never per frame.
### 10. The page
Player with a chapter list (verdieping tagged, vwo blocks tagged), a glossary (terms and definitions exactly as in the brief, vwo-only terms tagged) and the full transcript.
Teacher section: how the film explains it (per chapter: type, look and key visual), misconceptions addressed, pause and discussion moments, the numbers behind the film (value, unit, source, rounding), simplifications and why, suggested practicals, leerdoelen coverage per level, and the source list of any CE questions used.
3–5 check questions in exam style, with the answers folded away; with two levels, grouped per level.
Credits and version: voice, ◆ illustrations (who drew which assets), sources, version number and date.
If the brief names a series, add the film to the series page: all films on one page, with a shared glossary.
### 11. QA before delivery
Computed from the cue table and the rendered page:
no text overlaps other text, the caption zone or the frame edge; the level label overlaps nothing;
every term is on screen for at least 5 s, no answer appears before its question, and every cue falls inside its segment;
every level-start has a level-end, no vwo block lies inside a basis prediction segment, and the Havo playback has no audio join that cuts a sentence;
contrast is at least 4.5:1, every leerdoel is covered at its level, and every number is in the numbers table;
◆ Part C: every colour on the stage is in the Part C palette or a tint of it; no more than three betekeniskleuren plus goud in one frame; at most one annotatiehaak at a time; every look-change cue is a zoomcirkel or a cut to a Schema card;
determinism: the frame at a given moment is identical whether reached by playing from the chapter start or by seeking;
performance: frame times stay under 33 ms with the CPU throttled 4×.
Looked at:
a contact sheet per chapter (one frame every 2 s) at desktop 16:9 and on a phone held sideways, plus full-size stills at every term, question and answer cue and wherever a computed check failed. Use one sub-agent per chapter. Check for hidden text, labels that contradict the narration, unreadable text, timing mismatches and science errors ◆ and look breaks (a scene drifting from its look, a cartoon face, a gradient, a glow);
with two levels: the same contact sheet for the Havo playback, read by an agent that has not seen the vwo blocks, checking that the basis line still makes sense;
a final fresh-eyes review by a separate agent: the science, and whether it makes sense to a student from the audience.
Fix everything you confirm. Deliver the film with a short QA report (what was checked, what was fixed, what is left, and the risk-word timestamps from section 5) and the updated uitspraaklijst ◆ and series library.
### ★ 12. Bronmap and storage
Every film is delivered into the site repository (kamieljacobs/biologie-, branch main) with a bron/ folder next to it, so a later session can change the film without decoding the HTML. Film at films/<hoofdstuk>/<n>-<slug>.html → bron at films/<hoofdstuk>/<n>-<slug>/bron/. The template and the six existing build forms are in films/BRONMAPPEN.md.
brief.md: the filled-in film brief and series brief as used.
script.md: the narration per segment exactly as captioned, with the voice input next to it wherever it differs (respellings), the audio blob or file per segment, and start times.
info.md: structure, questions with answers, glossary, teacher-section summary, numbers with sources, where what lives in the HTML, how to change this film, open issues.
storyboard.md: the approved storyboard with the look column.
uitspraak.md: the risk words of this film with the approved voice input and model.
Audio: one take per paragraph (B5), word timestamps per take kept in the film data, so one paragraph can be re-recorded without touching the rest.
The film stays one self-contained file; scripts/filmbron.py unpacks it (audio, fonts and images out of the code) and packs it back byte for byte.
Push film and bron together. A published path never changes: the planner and the site link to it.
### ★ 13. Changing an existing film
Read bron/info.md and bron/script.md. No bron folder yet → reconstruct it first from the HTML with the template in films/BRONMAPPEN.md.
Unpack with python3 scripts/filmbron.py uitpakken <film> <tmp>, outside the repo. Edit film.src.html. For new narration, re-record only the changed paragraphs with the same voice, model and uitspraaklijst, replace that blob under the same name, update its word timings and every cue that hangs on it, and check that each cue word is still found.
Pack with filmbron.py inpakken, run the computed checks of section 11 that the change touches, and open the film in a browser.
Update the bron files, raise the version and date on the page, and add one line to info.md on what changed and why.
Commit and push. The planner links to the site, so it needs no change unless a title changes.
## ◆ Part C — Beeldstijl
Every film has one look, built from three scene looks and one fixed UI layer. The look of a scene follows from its scale level, never from the topic or the chapter type. These rules are binding; Part B1 ranks them above visual ambition and length. Hex codes marked (geschat) are estimates from reference frames and are replaced by the illustrator's own values when he confirms them; until then they are used as given.
| Look | Scale level | Reference |
| --- | --- | --- |
| Micro | molecuul, cel, organel | the illustrator's cell style: dark, calm texture, detailed |
| Macro | organisme, populatie, ecosysteem, aarde en tijd | Kamiel's ecology frames: flat, geometric, calm |
| Schema | all abstract image types; organ cross-sections; onderzoek doen; biologie en samenleving | neutral navy; the default |
| UI layer | always, over every look | the illustrator's typography and labels; Kamiel's ondertitelkast and annotatiehaak |
### C1. Shared foundation
Backgrounds: all looks are dark, never pure black, never white. The three backgrounds lie close together so a zoom from Macro to Micro is not a style break.
| Look | Background | Hex (geschat) |
| --- | --- | --- |
| Micro | blauwzwart | #121A26 |
| Macro | nachtblauw lucht, donkergroen voorgrond | #1E2E4A lucht, #2F4A3A heuvels, #3A5540 voorgrond |
| Schema | neutraal navy | #1A2740 |
Betekeniskleuren: colour carries meaning, never decoration. Six colours, fixed for all films; a colour never changes meaning between films or series.
| Kleur | Hex (geschat) | Betekenis |
| --- | --- | --- |
| Goud | #E0B64A | focus: the subject of the moment, zoomcirkel, leader lines, meta text |
| Koraal | #E07A5F | energie, warmte, bloed, mitochondriën, ATP |
| Groen | #7FC48F | leven, plant, fotosynthese, positief resultaat, conclusies |
| Teal | #5BA4C9 | water, zuurstof, informatie, koud, zenuwsignalen |
| Paars | #8C7BBF | kern, DNA, erfelijkheid, hormonen; the vwo marker |
| Oker | #C9A35C | voedsel, bodem, organismen, vesikels |
Neutrals: text #F2F2EE, secondary text #9AA3B2, lines and borders #8FA0B5, dimmed context at 35% opacity.
Typografie: three roles, never more. The illustrator's exact typefaces are not yet known; these are proposals close to his work.
| Rol | Gebruik | Voorstel | Minimum size on the 1920×1080 stage |
| --- | --- | --- | --- |
| Titel | titelkaart, hoofdstuktitel, "Wat denk je?" | serif display, bold (Fraunces or Playfair Display) | 64 px |
| Tekst | labels, captions, questions, annotations | humanist sans (Source Sans 3 or Inter) | labels 36 px; key terms and questions 48 px; captions 44 px bold |
| Meta | small caps under labels (SCHEMATISCH, ÉÉN BÈTACEL), units, scale labels, series and level tag | mono, wide letterspacing (IBM Plex Mono or JetBrains Mono) | 28 px |
Graph axis values may go down to 28 px in Meta; nothing on the stage is smaller. Contrast at least 4.5:1 everywhere.
Vormregels for all looks:
Muted fills; saturation is reserved for the betekeniskleuren.
No gradients, no glow, no drop shadow. Depth comes from layers and, in Micro, from a very light texture (Kamiel 15 Oct 2026: the grain was too busy — see films/BEELDAFSPRAKEN.md).
People get a simple face (eyes, mouth) in a few lines, no eyes with white; ● they may have skin colour and rounded, soft shapes rather than angular silhouettes; animals get at most a dot for an eye. Silhouettes without a face only for crowds and small action figures.
Never more than three betekeniskleuren on screen at once, plus goud for focus.
Detail goes to the focus; context stays schematic.
What the narration names moves or lights up; everything else stands still.
### C2. Look 1: Micro
The illustrator's cell world: blue-black cytoplasm with only a little calm texture (a few small dissolved particles, never a busy speckle pattern), organelles with muted fill and a thin light border, one fixed colour per organelle. For molecule, cell and organelle.
Tekenregels:
Background #121A26 with a beige dot texture (#C9B896 at 25–40% opacity, irregularly spread, denser around organelles). Drawn once as a cached texture.
Every shape has a border of 1–1.5 px in a lighter tone of its own fill, never black.
Texture comes from repetition: dots for ribosomes, double lines for membranes, short dashes for cristae.
Cytoskeleton and leader lines as thin grey lines (#8FA0B5, 0.75 px).
The state of something changes only its saturation, not its shape: an old mitochondrion is grey-brown and dull, not a different drawing.
Detail level high in the focus, low outside it.
Simulated particles (type A films) are drawn as small rounded shapes in their betekeniskleur with the same border rule; the grain stays behind them and does not move with them.
Organellenbibliotheek: every organelle looks in film 1 exactly as in film 12.
| Organel | Kleur (geschat) | Tekenregel |
| --- | --- | --- |
| Mitochondrium | #D88E7A vulling, #F0B8A6 rand | boonvorm, dubbele rand, cristae als 4–6 lichte streepjes |
| Golgi | #C98A3E | 4–5 gestapelde bogen, buitenste het langst |
| Ruw ER | #AFC0D0 lijnen | dubbele golvende lijnen met stippen (ribosomen) op de buitenzijde |
| Lysosoom | #3E9A78 | egale cirkel, iets kleiner dan vesikel |
| Vesikel | #D4A83C vulling, #F0CC7A rand | kleine cirkel met lichte rand, vaak in groepjes |
| Kern | #6E5A9E vulling, #A392D6 rand | grote cirkel, licht korrelige vulling, dubbele kernmembraan met poriën als onderbrekingen |
| Celmembraan | #AFC0D0 | dubbele lijn met regelmatige stippen (fosfolipidekoppen) |
| Chloroplast | #5FA86E vulling | ovaal met gestapelde groene schijfjes (grana) |
| Ribosoom | #C9B896 | stip, zelfde als de korrel maar groter |
Moleculen (proposal, no reference frame yet): rounded shapes with the same border-and-fill rule, in the betekeniskleur of their function: ATP koraal, glucose oker, zuurstof teal, DNA paars, enzymes grey-blue (#7A8BA8) with the active site in goud. Atoms and bonds only in vwo blocks, as simple ball-and-stick in neutrals.
### C3. Look 2: Macro
Kamiel's ecology look: flat, geometric, calm. Night-blue sky, grey-blue mountains, pine-green hills in layers, schematic organisms in oker and earth tones. For organism, population, ecosystem and earth-and-time.
Tekenregels:
Flat fills, no grain (unlike Micro). Depth comes from three to four layers that get lighter and greener towards the front.
Sky as a flat plane #1E2E4A, no gradient. For a hint of horizon, two planes (dark above, slightly lighter below) with a hard edge.
Landscape geometric: triangular mountains (#4B5878 with light top #B8C0D0), soft hill lines (#2F4A3A), foreground #3A5540, water #2E6FBF as a strip.
Organisms schematic in side view, no eyes with white, no mouth. Proportions correct between them (deer bigger than shrub, smaller than tree).
Repeated elements (shrubs, trees, individuals of a population) in at least three variants, randomly scaled (80–120%) and mirrored, never evenly spaced.
Empty space is functional: the sky holds labels, annotations and the ondertitelkast, not filler.
Day variant allowed for an ecosystem "in werking": sky #6E8CA8, water #2A6E7E, sand #C9A86A, soil #3A2E24. Same shape rules; a film picks day or night and does not switch.
Organismenbibliotheek: no fixed colour per species, fixed colour groups.
| Groep | Kleur | Regel |
| --- | --- | --- |
| Zoogdieren en vogels | oker en bruin (#B08A5C, #8C5A3A), grijs voor wolven en roofvogels | zijaanzicht, egale vlakken, lichtere buik |
| Planten en algen | groen (#7FC48F, #5FA86E) | silhouet met herkenbare bladvorm, geen individuele blaadjes buiten focus |
| Ongewervelden | oker en koraal | eenvoudig silhouet, segmenten als lichte lijnen |
| Bacteriën en schimmels | teal en grijs | stok of bol met lichte rand |
| Mens | ● huidskleur toegestaan (zachte, egale tinten), neutraal #9AA3B2 voor menigtes | ● simpel gezicht (ogen, mond) in enkele lijnen, minder hoekig, zachte vriendelijke look (keuze Kamiel 12 okt 2026); silhouet zonder gezicht alleen voor menigtes en kleine actiefiguren |
Populations and selection: individuals are small copies of the same silhouette. The trait at stake (coat, beak, size) gets a betekeniskleur; everything else stays neutral. A dimmed individual (35%) is gone: dead, emigrated, not selected.
### C4. Look 3: Schema
The default look: neutral navy without landscape, thin lines, betekeniskleuren, lots of air. Every film that shows no cell and no landscape lives here; that is more than half of all scenes.
When Schema:
All abstract image types: flow diagrams, regelkringen, kringlopen, graphs, kruisingsschema's, stambomen, timelines, side-by-side comparisons, text and question cards.
Organ and tissue as cross-section or schematic tube (darm, bloedvat, nefron, synaps). A film chooses between Schema and a Micro zoom and does not switch.
Onderzoek doen: set-ups as a schema with variables and arrows.
Biologie en samenleving: choices, chains and consequences with icons and human figures.
Tekenregels:
Background #1A2740, flat. A faint grid (#FFFFFF at 3%) is allowed for graphs, nowhere else.
Shapes: rounded rectangles and circles with a 1 px border in a lighter tone of the fill; fill in neutrals (#2A3A58) unless the shape has a meaning.
Arrows: 1.5 px, #8FA0B5, open head. An arrow in a betekeniskleur means that substance or signal flows.
Graphs: axes #8FA0B5, one line per betekeniskleur, axis values in Meta at 28 px or larger, units in Meta.
Kruisingsschema's: alleles as letters in text colour, genotypes in rounded cells, phenotypes as a small organism silhouette from the Macro library in the matching colour.
Comparisons: items on one baseline (#8FA0B5), equal height, label below, annotatiehaak from the UI layer.
At most seven elements on screen at once; more is built up in steps or split.
Lab library (onderzoek doen): test tube, erlenmeyer and beaker as line drawings #AFC0D0 with liquid as a flat plane in a betekeniskleur; petri dish as a circle from above with colonies as dots in oker or teal; microscope, pipette, thermometer and balance in side view, line drawing, no detail; test subject or animal as a silhouette from the Macro library; variables with fixed Meta labels ONAFHANKELIJK, AFHANKELIJK, CONTROLE.
Mens-en-maatschappij library: human as a flat figure #9AA3B2 with a simple face, role via betekeniskleur (patient koraal, doctor teal); a group or population as a grid of small silhouettes, share or distribution via colour and dimming; places (hospital, farm, factory, school, city) as one line icon in a rounded rectangle, fixed across films; products (medicine, food, crop, vaccine) as a simple shape in oker or teal with a light border; a choice as two or three columns on one baseline, arguments as short labels, conclusion with a green annotatiehaak.
### C5. UI layer
Identical in every film and every look. This is what makes three looks one channel, so no variation here.
Labels: two lines, as the illustrator does it: name in Tekst white (#F2F2EE), below it a short note or status in Meta capitals in gold-grey (#C9B896). Leader line 0.75 px #8FA0B5, ending in a 3 px dot at the object. Labels sit outside the object, never over it. On busy or light Macro-day backgrounds the name may sit in a dark pill (#121A26 at 85%, radius 6 px).
Ondertitelkast: dark rounded box (#0D1420 at 90%, radius 12 px), centred at the bottom with a margin, Tekst bold white, at most two lines, 44 px. Present whenever there is narration; gone on question cards and the title card. On narrow screens it moves into a band below the picture (B9).
Annotatiehaak: a bracket (1.5 px) under or beside the elements a conclusion is about, in the betekeniskleur of that conclusion (usually groen for "dit is de regel", koraal for "let op"), with one short sentence in the same colour. At most one at a time.
Zoomcirkel: circle with a gold border (1.5 px #E0B64A), contents in the target look, two straight gold leader lines to the source, caption in Meta below the circle. The fixed transition from Macro to Micro and from organ to cell.
Focus and dimming: the subject of the moment gets goud (border, leader, label) or its own betekeniskleur at full strength. Everything that does not matter now goes to 35% opacity. What the narration names is never dimmed; what it does not name does not move.
Title card: title in Titel large top-left, the puzzle question below it in Tekst, main image right in the look of the film. Meta top-right for series and level (VWO · STOFWISSELING 3/4). End card: three key sentences with an annotatiehaak, no image.
Chapter card: Schema background, chapter number in Meta, chapter title in Titel, the chapter's mini-question in Tekst. Same layout in every film.
Vwo marker: a narrow purple bar (#8C7BBF, 6 px) on the left edge of the stage and VWO in Meta top-left for the whole block, from the level-start cue to the level-end cue. Nothing else changes. The chapter list shows the same tag.
Vraagkaart: "Wat denk je?" in Titel, the question in Tekst, options as rounded cards in Schema style, background always Schema navy whatever the look of the film. The countdown is a thin gold line that shortens.
Scale bar and speed label: Meta, bottom-left of the stage, outside the caption zone.
### C6. Keuzeregels and transitions
Decide the scale level per scene: molecule or cell → Micro; organism, population, ecosystem or earth-and-time → Macro; everything else (schema, graph, cross, comparison, organ as tube or cross-section, research, society) → Schema.
Doubt between Schema and another look → Schema. Schema is the default; Micro and Macro are the exceptions that need a landscape or a cell.
Organ and tissue: per film choose between Schema (tube, cross-section) and a Macro body with a Micro zoom. Not both in one film. The brief's LOOKS field records the choice.
A change of look happens only via the zoomcirkel (Macro → Micro, organ → cell) or via a cut to a Schema card (graph, question card, summary). Never a fade between two looks. One scene never changes look.
Macro-day only for an ecosystem "in werking"; comparisons, selection and evolution over time always Macro-night or Schema.
Vraagkaart, vwo marker, ondertitelkast, title and chapter cards look the same in every look.
Betekeniskleuren hold across looks: a substance that is koraal in Micro is koraal in a Schema graph.
### C7. Assets and libraries
The series library (Part A2) lists every recurring object with the film that first drew it. An object in the library is reused, never redrawn. A new object is drawn by the rules above and reported at the checkpoint, then joins the library at delivery.
Illustrator assets: when the brief attaches SVG files, Claude uses them as they are for the objects they show, scaled and placed by the rules of the look, animated by moving, dimming, highlighting or morphing between supplied states. Claude does not redraw or restyle an attached asset. Objects the assets don't cover are drawn by Claude to match them.
Without assets Claude draws everything itself as SVG or canvas by the rules above. In both cases every frame must pass the Part C checks in B11.
Raster images (photos, scans) never appear on the stage; a real-world opening is drawn in Macro or Schema.
## ★ Part D — Doelgroepprofiel onderbouw
Paste Part D when AUDIENCE is onderbouw: leerjaar 1–3, in mixed groups of vmbo-t, havo and vwo working mostly on their own. Part D wins over Part B where they differ; Part C stays binding except for D5. The content comes from the SLO definitieve conceptkerndoelen mens en natuur (November 2025), kerndoel 32 (organismen en gezondheid) and 33C (ecosystemen).
### D1. Brief and levels
KERNDOEL replaces METHOD + CHAPTER: number and bullets, e.g. "32A, bullets 1–2". The bullets are the leerdoelen; TERMS & DEFINITIONS still override them.
EXAM QUESTIONS and EXAM STOF / VERDIEPING do not apply. The labels are basis (the kerndoel), havo/vwo (the "aanvulling havo-vwo") and verdieping (rare).
NIVEAU default: "basis + havo/vwo-blokken". The basis line is written for vmbo-t and is complete on its own. A havo/vwo block deepens what the basis just showed, by the rules for vwo blocks in B4, with the label HAVO/VWO instead of VWO and the narration "Voor havo en vwo gaan we nog een stap verder" or a shorter variant.
When a whole group of bullets is havo/vwo only (in 32B: mitose en meiose, DNA, overerving, stambomen, grote stappen in de evolutie), it becomes its own film with NIVEAU "havo/vwo", not a block.
Player: a Basis / Havo-vwo switch instead of Havo / Vwo. Default Havo-vwo; a link ending in ?niveau=basis skips the blocks.
USE default: zelfstandig, so the player opens in Leerling mode.
### D2. Depth follows the verb of the kerndoel
| Verb in the kerndoel | What the film does |
| --- | --- |
| beschrijven, benoemen | show it and name it; mechanism only as far as needed to recognise it |
| verklaren | the cause–effect chain is visible on screen; the Why test applies |
| redeneren, analyseren, verbanden leggen | the viewer does the reasoning; prediction moments carry the chapter |
| onderzoeken, experimenteren, verkennen, reflecteren | the film sets up the question and hands over to the Probeer-het-zelf card; the doing happens outside the film |
The Why test stops at the depth the verb asks: no molecules where "beschrijven" is enough, and no chemical formulas in the basis line.
### D3. Language and length
Dutch at B1 level: sentences mostly 12 words or fewer, one idea each, je-vorm, no chains of subordinate clauses.
About 120 words per minute; calibrate on the uitspraaktest clip.
At most 5–6 new terms per film. Each term comes as everyday words first, then the term, then on screen for at least 5 s.
Numbers rounded and made concrete with comparisons students know (a classroom, a football field, a grain of sand).
Length 4–6 minutes, at most 3 chapters, one central question, cold open at most 15 s.
### D4. Pedagogy
A DAILY-LIFE HOOK is required, from the world of a 12–14-year-old: school, sport, food, phone, pets, garden, weather. Never assume anything about a student's body, family or home.
A prediction moment every 60–90 s, with 2 or 3 options, one of them a known misconception.
Typical misconceptions to choose from: plants take their food from the soil; all bacteria are harmful; you breathe in oxygen and breathe out only carbon dioxide; blood in veins is blue; an animal adapts because it needs to; the biggest animal is at the top of the food chain; a cell is flat.
End card "Probeer het zelf" in the vraagkaart style: the matching onderzoekje, opdracht or tool from the startpakket, with its link.
3 check questions in onderbouw style (2 multiple choice, 1 short "leg uit"), answers folded away.
The coverage table runs kerndoel bullet → level → chapter → question.
### D5. Look
Part C stays, with these adjustments:
Schema: at most 5 elements on screen at once instead of 7.
Micro: only the cell parts the kerndoel names (celkern, celmembraan, celwand, cytoplasma, bladgroenkorrel, vacuole, mitochondrium). The vacuole is not yet in the organellenbibliotheek: the first film that draws it fixes it and shows it at the checkpoint.
Macro: recognisable everyday settings (school garden, ditch, park, kitchen) next to the landscapes.
People: simple faces as in Part C, varied, never as a stereotype.
### D6. Page and site
Teacher section: the kerndoel bullets covered and at which level, the suggested onderzoekje, and which segments are havo/vwo.
Files at films/onderbouw/<kerndoel>/<n>-<slug>.html, e.g. films/onderbouw/32a/1-alles-is-cel.html. The navigation bar reads "← Terug naar <kerndoel title>" and links to ../../../index.html#<kerndoel>.
### D7. Not yet
Kerndoel 32D (relationele en seksuele gezondheid) gets no films for now. If it is added later, it needs its own rules first.
## Wijzigingen t.o.v. v3
v3 and the stijlkaart disagreed in seven places. Each is resolved below; the resolution is what v4 now says.
| v3 said | Stijlkaart said | v4 decides |
| --- | --- | --- |
| STYLE: "my films on lab.julesjacobs.com/edu (Alles beweegt, Alles op zijn plek)" | three looks + UI layer | Field removed; Part C is the style. The old films are not a reference anymore, only their scripts and numbers (PREVIOUS VERSION field) |
| Colour: one meaning per colour per series, fixed in film 1 (SHARED COLOUR MEANINGS) | six betekeniskleuren fixed for all films | Fixed in Part C for all films; a series only maps objects onto them (SERIES COLOURS) and may add tints of one colour |
| Text: at most two typefaces | three roles: serif, sans, mono | Three typefaces, one per role (Part C1) |
| Text: labels ≥ 36 px, key terms ≥ 48 px; captions in a reserved zone | captions 44 px; graph labels ≥ 14 px | B's phone readability wins: labels 36 px, terms 48 px, captions 44 px, Meta and axis values 28 px minimum. The 14 px floor is gone |
| Level label: small fixed tag "vwo" in one corner | purple bar 6 px left + VWO in Meta top-left | Stijlkaart wins (Part C5); B's rule that it never overlaps anything stays |
| Within a chapter no hard cuts | look changes only via zoomcirkel or a cut to a Schema card | A cut to a Schema card is the one allowed cut inside a chapter; everything else stays continuous (B3) |
| Colour-blind: never red vs green alone | koraal (#E07A5F) and groen (#7FC48F) both in the palette | Both stay; where both are on screen a second cue (shape, label, position) also tells them apart (B9) |
Other changes:
Rule order in B1 now has the look at position 4, above visual ambition.
New brief fields: LOOKS, ASSETS, PREVIOUS VERSION (A1); SERIES COLOURS, SERIES LIBRARY (A2).
New cue kind look-change; a look column in film plan and storyboard (B6); Part C checks in QA (B11); illustrator credit on the page (B10).
The DNA series brief left this document and lives in "Seriebriefs uitlegfilms biologie", together with the new Cel series (diffusie, organellen, celdeling).
Uitspraaklijst gained negentig, 95 graden and the 5'/3' ends.
Aanvulling 11 okt 2026 (v4, geen nieuwe versie): keyboard rules and site-navigation bar added to Part B §9 Engine, after the first nine films were restyled and published on the site.
● v6 (13 okt 2026): autonomous mode as the default (B7: self-check instead of a waiting checkpoint, open questions go to the bouwlijst); no uitspraaktest before recording, IPA lookup first and an uitspraakwachtlijst per film that Kamiel listens to in batches (B5); blind transcription of the real takes as the pronunciation check (B5, B8). The bouwlijst ("Bouwlijst uitlegfilms biologie") lists every film per PTA onderdeel with its content and status.
★ v5 (12 okt 2026): Part D Doelgroepprofiel onderbouw; KERNDOEL field in A1; PREVIOUS VERSION points to the site repo; new B12 (bronmap and storage) and B13 (changing an existing film). All films already on the site got a reconstructed bron/ folder on 12 Oct 2026.
## Open punten
From the stijlkaart, still open; Part C uses the estimates until they are settled.
Broer: confirm or replace the hex codes of background, grain and organelles
Broer: which typefaces for Titel, Tekst and Meta
Broer: one Micro reference frame with molecules (glucose, ATP, enzyme with active site)
Broer: which program, and can he deliver assets as SVG (decides how much of C7 applies)
Kamiel: one Schema reference frame with a graph and one with a kruisingsschema
Samen: label style final (two lines everywhere, or pill allowed on Macro-day)
Samen: keep Macro-day as a variant, or everything Macro-night
Samen: who makes what per film (static assets vs animation and build)
Kamiel: confirm the three typography decisions in "Wijzigingen" (three typefaces, 28 px floor, level marker as bar)