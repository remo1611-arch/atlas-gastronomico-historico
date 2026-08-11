from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
R=load('relationships.json'); O=load('occurrences.json'); app=(ROOT/'js'/'app.js').read_text(encoding='utf-8'); css=(ROOT/'css'/'app.css').read_text(encoding='utf-8')
errors=[]
r=[x for x in R if x.get('status') in {'reviewed','verified'} and x.get('from')=='maize' and x.get('to')=='nixtamalization' and x.get('type')=='uses_technique']
if not r: errors.append('maize sin relación técnica canónica')
tech=[x for x in O if x.get('subjectRef')=='nixtamalization' and x.get('status') in {'reviewed','verified'}]
if len(tech)<2: errors.append('nixtamalización necesita >=2 occurrences para historia')
for needle in ["kind:'technique'","r.type==='uses_technique'","data-history-technique-occurrence","history-kind technique","const techniqueCount=items.filter(x=>x.kind==='technique').length"]:
 if needle not in app: errors.append('motor historia falta '+needle)
for needle in ['.history-technique','.history-kind.technique','.history-open-technique']:
 if needle not in css: errors.append('CSS técnica falta '+needle)
if errors:
 print('TECHNIQUE HISTORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('TECHNIQUE HISTORY: PASS')
print('Nixtamalization occurrences:',len(tech))
print('Maize related technique relationship: PASS')
