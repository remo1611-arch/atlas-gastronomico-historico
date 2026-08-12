from pathlib import Path
import json,sys,hashlib
ROOT=Path(__file__).resolve().parents[1]
def load(n): return json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); glossary=load('glossary.json'); config=load('config.json')
occ={x['id'] for x in load('occurrences.json')}; events={x['id'] for x in load('events.json')}; dev={x['id'] for x in load('developments.json')}
sources={x['id'] for x in load('sources.json')}; subjects={x['id'] for x in load('subjects.json')}
app=(ROOT/'js/app.js').read_text(encoding='utf-8'); html=(ROOT/'index.html').read_text(encoding='utf-8')
fingerprint=json.loads((ROOT/'docs/G2_CONTRACT_FINGERPRINT.json').read_text(encoding='utf-8'))
errors=[]
if len(stories)<3: errors.append(f'se esperaban al menos 3 historias curadas, hay {len(stories)}')
by={x['id']:x for x in stories}
expected=[('story_wine',6,'subject'),('story_bread',7,'subject'),('story_fermentation',5,'transversal')]
for sid,n,typ in expected:
    st=by.get(sid)
    if not st: errors.append('falta '+sid); continue
    if len(st.get('scenes',[]))!=n: errors.append(f'{sid}: {len(st.get("scenes",[]))} escenas != {n}')
    if st.get('storyType')!=typ: errors.append(sid+': storyType inesperado')
    if typ=='subject':
        if st.get('primarySubjectRef') not in subjects: errors.append(sid+': primarySubjectRef roto')
        if st.get('primarySubjectRef') not in st.get('relatedSubjectRefs',[]): errors.append(sid+': primarySubjectRef fuera de relatedSubjectRefs')
    else:
        if st.get('primarySubjectRef') is not None: errors.append(sid+': transversal con primarySubjectRef')
        if len(st.get('relatedSubjectRefs',[]))<2: errors.append(sid+': transversal insuficiente')
    if 'subjectRef' in st: errors.append(sid+': conserva subjectRef legacy')
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
version=config['project']['version']
for needle in [
    f"stories:'./data/stories.json?v={version}'",
    f"glossary:'./data/glossary.json?v={version}'",
    'function openNarrativeStory(storyId,sceneIndex=0)','function renderNarrativeStory()','function stepNarrativeScene(direction)','function renderStoryMap(scene)','function openGlossaryEntry(id)','function preferredStoryForSubject(subjectId)',
]:
    if needle not in app: errors.append('motor narrativo falta: '+needle)
for id_ in ['narrativeLanding','narrativeStoryPlayer','storyProgress','storyPrevBtn','storyNextBtn','storyWorldMap','storyNarrativeContent','storySources','glossaryDialog']:
    if f'id="{id_}"' not in html: errors.append('UI narrativa falta '+id_)
for forbidden in ['renderWineStory','renderBreadStory','renderFermentationStory','openWineStory','openBreadStory','openFermentationStory',"storyId==='story_wine'",'storyId==="story_wine"','x.subjectRef===subjectId','function storyForSubject(subjectId)']:
    if forbidden in app: errors.append('lógica específica de historia: '+forbidden)
for rel,expected_hash in fingerprint['files'].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected_hash: errors.append('fingerprint G2 roto: '+rel)
if errors:
    print('NARRATIVE MUSEUM CONTRACT: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('NARRATIVE MUSEUM CONTRACT: PASS')
print(f'Stories: {len(stories)} · Scenes: {sum(len(x.get("scenes",[])) for x in stories)} · Glossary: {len(glossary)}')
print('Generic subject + transversal engine · G2 fingerprint 9/9.')
