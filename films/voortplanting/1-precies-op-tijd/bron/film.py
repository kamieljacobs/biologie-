import json
segs = json.load(open('segments.json', encoding='utf-8'))
gl = json.load(open('glossary.json', encoding='utf-8'))
film = {
 "slug": "1-precies-op-tijd", "hoofdstuk": "voortplanting", "hoofdstukNaam": "Voortplanting",
 "title": "Van bevruchting tot baby", "sub": "voortplanting als regelsysteem",
 "puzzle": "Een eicel leeft één dag, een zaadcel vijf. Hoe regelt het lichaam dat alles op het goede moment gebeurt, negen maanden lang?",
 "meta": "voortplanting", "alleen": "vwo", "version": "3.0.1 · oktober 2026", "titleLook": "schema",
 "seriesline": "Biologie bij Kamiel · Voortplanting · vwo · Nectar 4.1 H4 · Biologie voor jou thema 2",
 "lead": "Een eicel leeft na de eisprong ongeveer een dag, een zaadcel hooguit vijf. De film volgt één eicel — de eicel waar jij uit bent ontstaan — van de eierstok van je oma tot de geboorte, en behandelt voortplanting steeds als regelsysteem: wie stuurt welk signaal, wie heeft de receptor, en wat gebeurt er daarna met de spiegel? Celdeling zelf (meiose, crossing-over) zit niet in deze film; daarvoor is er de film Celdeling.",
 "endHaak": "wie de signalen begrijpt, begrijpt de hele keten",
 "minis": {"Hoofdstuk 1": "Waarom wacht een eicel tientallen jaren, en krijgt een zaadcel bijna niets mee?",
           "Hoofdstuk 2": "Wie geeft het startsein, en hoe weet een cel dat een bericht voor haar is?",
           "Hoofdstuk 3": "Waarom rijpt er elke maand maar één eicel, terwijl er tientallen beginnen?",
           "Hoofdstuk 4": "Hoe kan hetzelfde hormoon eerst remmen en dan juist aanjagen?",
           "Hoofdstuk 5": "Waarom kan maar één zaadcel naar binnen, en hoe weet de eicel dat?",
           "Hoofdstuk 6": "Hoe voorkomt een embryo van een paar dagen oud dat het wordt weggespoeld?",
           "Hoofdstuk 7": "Hoe krijgt het kind zuurstof van de moeder zonder dat hun bloed mengt?",
           "Hoofdstuk 8": "Hoe wordt uit één en dezelfde aanleg een jongen of een meisje?",
           "Hoofdstuk 9": "Waarom worden weeën vanzelf steeds sterker, en wat zet de lus stil?",
           "Hoofdstuk 10": "Als je de signalen kent, kun je ze nadoen, blokkeren of uitstellen. Hoe?",
           "Hoofdstuk 11": "Waar kan de keten breken, en hoe doen artsen de signalen na?"},
 "footer": "Stem: Roos (ElevenLabs, model eleven_multilingual_v2), opname van versie 1 (september 2026) met zes zinnen uit v2.1; sinds 3.0 per alinea geknipt uit dezelfde opname. Script, animatie en speler: Kamiel met Claude. Personages: castboek (Linda, Oma Ria, Noor). Stijl: Part C. Versie 3.0.1 · oktober 2026 (standaardspeler, prompt v13; nacontrole 29 okt).",
 "questions": {s['id']: {"q": s['q'], "correct": s['correct'], "explain": s['explain']} for s in segs if s['kind'] == 'question'},
 "glossary": [{"t": g['t'], "d": g['d']} for g in gl],
 "sections": open('sections.html', encoding='utf-8').read()
}
json.dump(film, open('film.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
