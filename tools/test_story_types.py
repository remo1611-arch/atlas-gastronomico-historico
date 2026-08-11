from pathlib import Path
import copy,json,sys
from jsonschema import Draft202012Validator
ROOT=Path(__file__).resolve().parents[1]
stories=json.loads((ROOT/'data/stories.json').read_text(encoding='utf-8'))
subjects={x['id'] for x in json.loads((ROOT/'data/subjects.json').read_text(encoding='utf-8'))}
schema=json.loads((ROOT/'schemas/story.schema.json').read_text(encoding='utf-8'))
validator=Draft202012Validator(schema)
errors=[]
for st in stories:
    if 'subjectRef' in st: errors.append(st['id']+': subjectRef legacy presente')
    if st.get('storyType')!='subject': errors.append(st['id']+': las historias actuales deben seguir siendo monográficas')
    p=st.get('primarySubjectRef')
    if p not in subjects: errors.append(st['id']+': primarySubjectRef roto')
    if p not in st.get('relatedSubjectRefs',[]): errors.append(st['id']+': primary fuera de related')

# The schema must accept a genuinely transversal story without inventing a fake subject.
synthetic=copy.deepcopy(stories[0])
synthetic['id']='story_contract_transversal_probe'
synthetic['storyType']='transversal'
synthetic['primarySubjectRef']=None
synthetic['relatedSubjectRefs']=['wine','bread_like_flatbread']
for e in validator.iter_errors(synthetic):
    errors.append('transversal synthetic rejected: '+e.message)

# And must reject legacy/ill-formed variants.
legacy=copy.deepcopy(synthetic); legacy['subjectRef']='wine'
if not list(validator.iter_errors(legacy)):
    errors.append('schema acepta subjectRef legacy')
bad=copy.deepcopy(synthetic); bad['relatedSubjectRefs']=['wine']
if not list(validator.iter_errors(bad)):
    errors.append('schema acepta transversal con un único subject')
subject_bad=copy.deepcopy(stories[0]); subject_bad['primarySubjectRef']=None
if not list(validator.iter_errors(subject_bad)):
    errors.append('schema acepta storyType=subject sin primarySubjectRef')

if errors:
    print('STORY TYPES CONTRACT: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('STORY TYPES CONTRACT: PASS')
print('Current stories: 2 subject · synthetic transversal accepted · legacy rejected.')
