from pathlib import Path
import copy,json,sys
from jsonschema import Draft202012Validator
ROOT=Path(__file__).resolve().parents[1]
stories=json.loads((ROOT/'data/stories.json').read_text(encoding='utf-8'))
subjects={x['id'] for x in json.loads((ROOT/'data/subjects.json').read_text(encoding='utf-8'))}
schema=json.loads((ROOT/'schemas/story.schema.json').read_text(encoding='utf-8'))
validator=Draft202012Validator(schema)
errors=[]
subject_count=transversal_count=0
for st in stories:
    if 'subjectRef' in st: errors.append(st['id']+': subjectRef legacy presente')
    typ=st.get('storyType')
    if typ=='subject':
        subject_count+=1
        p=st.get('primarySubjectRef')
        if p not in subjects: errors.append(st['id']+': primarySubjectRef roto')
        if p not in st.get('relatedSubjectRefs',[]): errors.append(st['id']+': primary fuera de related')
    elif typ=='transversal':
        transversal_count+=1
        if st.get('primarySubjectRef') is not None: errors.append(st['id']+': transversal con primarySubjectRef')
        if len(st.get('relatedSubjectRefs',[]))<2: errors.append(st['id']+': transversal con <2 related')
    else: errors.append(st['id']+': storyType desconocido')
if subject_count<2: errors.append(f'se esperaban al menos 2 historias subject; hay {subject_count}')
if transversal_count<1: errors.append(f'se esperaba al menos 1 historia transversal; hay {transversal_count}')
fer=next((s for s in stories if s['id']=='story_fermentation'),None)
if not fer or fer.get('storyType')!='transversal': errors.append('story_fermentation no prueba el contrato transversal real')

# Schema must continue to accept a synthetic transversal and reject invalid/legacy variants.
synthetic=copy.deepcopy(stories[0]); synthetic['id']='story_contract_transversal_probe'; synthetic['storyType']='transversal'; synthetic['primarySubjectRef']=None; synthetic['relatedSubjectRefs']=['wine','bread_like_flatbread']
for e in validator.iter_errors(synthetic): errors.append('transversal synthetic rejected: '+e.message)
legacy=copy.deepcopy(synthetic); legacy['subjectRef']='wine'
if not list(validator.iter_errors(legacy)): errors.append('schema acepta subjectRef legacy')
bad=copy.deepcopy(synthetic); bad['relatedSubjectRefs']=['wine']
if not list(validator.iter_errors(bad)): errors.append('schema acepta transversal con un único subject')
subject_bad=copy.deepcopy(stories[0]); subject_bad['primarySubjectRef']=None
if not list(validator.iter_errors(subject_bad)): errors.append('schema acepta storyType=subject sin primarySubjectRef')
if errors:
    print('STORY TYPES CONTRACT: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('STORY TYPES CONTRACT: PASS')
print(f'Current stories: {subject_count} subject + {transversal_count} transversal · legacy rejected.')
