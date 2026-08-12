from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}
occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_coffee'),None)
if not st: errors.append('falta story_coffee')
else:
    if st.get('storyType')!='subject': errors.append('story_coffee no es subject')
    if st.get('primarySubjectRef')!='coffee': errors.append('primarySubjectRef coffee ausente')
    if st.get('relatedSubjectRefs')!=['coffee']: errors.append('relatedSubjectRefs debe describir solo coffee')
    if len(st.get('scenes',[]))!=5: errors.append(f'escenas café {len(st.get("scenes",[]))} != 5')
    required={
      ('occurrence','occ_coffee_yemen_sufi_1400_1500'),
      ('development','coffeehouse_ottoman_sociability_1500_1600'),
      ('development','oxford_coffeehouse_1650_1651'),
      ('development','arabica_batavia_1696_1699'),
      ('development','bezzera_coffee_machine_1902_1903'),
      ('development','gaggia_high_pressure_espresso_1938_1947'),
    }
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    if not required<=actual: errors.append('faltan hitos canónicos de café: '+str(sorted(required-actual)))
    blob=json.dumps(st,ensure_ascii=False).lower()
    for forbidden in ['kaldi descubrió','kaldi descubrio','espresso fue inventado en 1901','primer café del mundo','primera cafetería del mundo']:
        if forbidden in blob: errors.append('afirmación de prioridad/leyenda no permitida: '+forbidden)

sub=subjects.get('coffee')
if not sub: errors.append('falta subject coffee')
else:
    aliases={x.lower() for x in sub.get('aliases',[])}
    if not {'café','coffee','arabica'}<=aliases: errors.append('aliases café/coffee/arabica incompletos')

y=occ.get('occ_coffee_yemen_sufi_1400_1500')
if not y: errors.append('falta occurrence Yemen')
elif places.get(y.get('placeRef'),{}).get('point'): errors.append('Yemen temprano no debe recibir punto único inventado')

o=dev.get('oxford_coffeehouse_1650_1651',{})
if o.get('period',{}).get('start')!=1650 or o.get('period',{}).get('end')!=1651: errors.append('Oxford no conserva rango 1650–1651')
if 'discrep' not in o.get('summary','').lower(): errors.append('Oxford no documenta la discrepancia de datación')

j=dev.get('arabica_batavia_1696_1699',{})
if j.get('period',{}).get('start')!=1696 or j.get('period',{}).get('end')!=1699: errors.append('Batavia no conserva 1696–1699')
if not any(places.get(r,{}).get('point') for r in j.get('placeRefs',[])): errors.append('Batavia carece de referencia cartografiable')

b=dev.get('bezzera_coffee_machine_1902_1903',{})
if b.get('period',{}).get('start')!=1902 or b.get('period',{}).get('end')!=1903: errors.append('Bezzera no conserva solicitud/concesión 1902–1903')
if b.get('status')!='verified': errors.append('Bezzera debe quedar verificado con patente + contraste')
g=dev.get('gaggia_high_pressure_espresso_1938_1947',{})
if g.get('period',{}).get('start')!=1938 or g.get('period',{}).get('end')!=1947: errors.append('Gaggia no conserva 1938–1947')

# Story-map semantics: urban references may have pins; regional early Yemen must not.
for pid in ['istanbul_turkiye','oxford_england','batavia_java_reference','milan_italy']:
    if not places.get(pid,{}).get('point'): errors.append(pid+': falta punto urbano/de referencia')

if errors:
    print('COFFEE STORY: FAIL')
    [print('ERROR:',e) for e in errors]
    sys.exit(1)
print('COFFEE STORY: PASS')
print('5 scenes · no Kaldi canon · Oxford 1650–1651 preserved · espresso treated as multi-stage technology.')
