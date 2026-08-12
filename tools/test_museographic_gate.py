#!/usr/bin/env python3
import json, math, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
stories=json.loads((ROOT/'data/stories.json').read_text(encoding='utf-8'))
occ={x['id']:x for x in json.loads((ROOT/'data/occurrences.json').read_text(encoding='utf-8'))}
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
html=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'css/app.css').read_text(encoding='utf-8')
errors=[]

def wc(text):
    return len(re.findall(r"\b[\wÁÉÍÓÚÜÑáéíóúüñ-]+\b", text or '', re.UNICODE))

for story in stories:
    visible=0
    used_subjects=set()
    for scene in story.get('scenes',[]):
        visible += wc(scene.get('lead')) + wc(scene.get('whyItMatters')) + wc(scene.get('nextQuestion'))
        visible += sum(wc(x) for x in scene.get('narrative',[]))
        visible += sum(wc(v) for v in scene.get('geography',{}).values() if isinstance(v,str))
        for item in scene.get('itemRefs',[]):
            if item.get('kind')=='occurrence' and item.get('ref') in occ:
                ref=occ[item['ref']].get('subjectRef')
                if ref: used_subjects.add(ref)
    minimum=math.ceil(visible/240)  # lectura ágil; método, límites y fuentes no incluidos
    if story.get('estimatedMinutes',0) < minimum:
        errors.append(f"{story['id']}: ~{story.get('estimatedMinutes')} min < mínimo museográfico {minimum} min para {visible} palabras visibles")
    declared=set(story.get('relatedSubjectRefs',[]))
    orphan=declared-used_subjects
    if orphan:
        errors.append(f"{story['id']}: relatedSubjectRefs no cubiertos por evidencias del recorrido: {sorted(orphan)}")

if 'id="storyContext"' in html or 'narrative-context' in html or "$('#storyContext')" in app or '.narrative-context' in css:
    errors.append('Sigue presente el contexto geográfico duplicado de las escenas')
if 'Mapa parcial:' not in app or 'story-map-coverage' not in app or '.story-map-coverage' not in css:
    errors.append('Falta diagnóstico visible de cobertura cartográfica parcial en las escenas')
if 'Idea para llevarte.' not in app:
    errors.append('La última escena sigue rotulada como “Siguiente pregunta”')

if errors:
    print('MUSEOGRAPHIC GATE: FAIL')
    for e in errors: print('-',e)
    raise SystemExit(1)
print('MUSEOGRAPHIC GATE: PASS')
for story in stories:
    print(f"- {story['id']}: {story['estimatedMinutes']} min · {len(story['scenes'])} escenas")
