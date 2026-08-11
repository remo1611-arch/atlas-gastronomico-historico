from pathlib import Path
import json,sys,re,hashlib
ROOT=Path(__file__).resolve().parents[1]

def load(n): return json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); glossary=load('glossary.json')
occ={x['id'] for x in load('occurrences.json')}; events={x['id'] for x in load('events.json')}; dev={x['id'] for x in load('developments.json')}
sources={x['id'] for x in load('sources.json')}; subjects={x['id'] for x in load('subjects.json')}
app=(ROOT/'js/app.js').read_text(encoding='utf-8'); html=(ROOT/'index.html').read_text(encoding='utf-8')
fingerprint=json.loads((ROOT/'docs/G2_CONTRACT_FINGERPRINT.json').read_text(encoding='utf-8'))
errors=[]

if len(stories)!=2: errors.append(f'se esperaban 2 historias curadas, hay {len(stories)}')
by={x['id']:x for x in stories}
for sid,n in [('story_wine',6),('story_bread',7)]:
    st=by.get(sid)
    if not st: errors.append('falta '+sid); continue
    if len(st.get('scenes',[]))!=n: errors.append(f'{sid}: {len(st.get("scenes",[]))} escenas != {n}')
    if st.get('subjectRef') not in subjects: errors.append(sid+': subjectRef roto')
    if st.get('status') not in {'reviewed','verified'}: errors.append(sid+': no publicable')
    for ref in st.get('sourceRefs',[]):
        if ref not in sources: errors.append(sid+': sourceRef roto '+ref)
    for scene in st.get('scenes',[]):
        for ref in scene.get('sourceRefs',[]):
            if ref not in sources: errors.append(scene['id']+': sourceRef roto '+ref)
            if ref not in st.get('sourceRefs',[]): errors.append(scene['id']+': source no agregada a story')
        for ref in scene.get('glossaryRefs',[]):
            if ref not in {g['id'] for g in glossary}: errors.append(scene['id']+': glossaryRef roto '+ref)
        for ir in scene.get('itemRefs',[]):
            target={'occurrence':occ,'event':events,'development':dev}.get(ir.get('kind'))
            if target is None or ir.get('ref') not in target: errors.append(scene['id']+': itemRef roto '+str(ir))

for needle in [
    "stories:'./data/stories.json?v=0.1.0-alpha.23'",
    "glossary:'./data/glossary.json?v=0.1.0-alpha.23'",
    'function openNarrativeStory(storyId,sceneIndex=0)',
    'function renderNarrativeStory()',
    'function stepNarrativeScene(direction)',
    'function renderStoryMap(scene)',
    'function openGlossaryEntry(id)',
]:
    if needle not in app: errors.append('motor narrativo falta: '+needle)
for id_ in ['narrativeLanding','narrativeStoryPlayer','storyProgress','storyPrevBtn','storyNextBtn','storyWorldMap','storyNarrativeContent','storySources','glossaryDialog']:
    if f'id="{id_}"' not in html: errors.append('UI narrativa falta '+id_)

# Narrative UI must be generic: no per-story render functions or branches.
for forbidden in ['renderWineStory','renderBreadStory','openWineStory','openBreadStory',"storyId==='story_wine'",'storyId==="story_wine"']:
    if forbidden in app: errors.append('lógica específica de historia: '+forbidden)

# Frozen historical contract remains untouched by the new editorial schemas.
for rel,expected in fingerprint['files'].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected: errors.append('fingerprint G2 roto: '+rel)

if errors:
    print('NARRATIVE MUSEUM CONTRACT: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('NARRATIVE MUSEUM CONTRACT: PASS')
print('Stories: 2 · Scenes: 13 · Glossary:',len(glossary))
print('Generic story engine · G2 fingerprint 9/9.')
