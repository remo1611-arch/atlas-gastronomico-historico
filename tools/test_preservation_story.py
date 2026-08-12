from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; dev={x['id']:x for x in load('developments.json')}; src={x['id']:x for x in load('sources.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_food_preservation'),None)
if not st: errors.append('falta story_food_preservation')
else:
    if st.get('storyType')!='transversal' or st.get('primarySubjectRef') is not None: errors.append('Conservación debe ser transversal sin primary')
    if set(st.get('relatedSubjectRefs',[]))!={'mixed_fermented_beverage','garum'}: errors.append('relatedSubjectRefs incorrectos')
    if len(st.get('scenes',[]))!=6: errors.append('Conservación debe tener 6 escenas')
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    required={('occurrence','occ_fermented_beverage_jiahu_7th_millennium_bce'),('occurrence','occ_garum_pompeii_first_century'),('development','appert_preservation_1809_1810'),('development','perkins_mechanical_refrigeration_1834'),('development','monitor_top_refrigerator_1927'),('development','pasteurization_wine_1863_1865'),('development','haccp_development_1960s'),('development','codex_alimentarius_commission_1963')}
    if not required<=actual: errors.append('faltan hitos: '+str(required-actual))
    text=json.dumps(st,ensure_ascii=False).lower()
    safeguards=['intención explícita de conservación','appert ≠ origen universal','refrigeración mecánica ≠ nacimiento','appcc ≠ inspección final','codex ≠ una ley mundial']
    for phrase in safeguards:
        if phrase not in text: errors.append('falta salvaguarda: '+phrase)
    if 'conservar, hacer seguro y estandarizar' not in text: errors.append('falta distinción final entre conservación, inocuidad y normalización')
if 'preservation' in subjects or 'conservation' in subjects: errors.append('no debe existir subject ficticio de conservación')
a=dev.get('appert_preservation_1809_1810',{})
if a.get('status')!='verified' or a.get('certainty')!='high': errors.append('Appert debe quedar verified/high tras contraste K3')
for sid in ['src_usda_nal_canning_history','src_appert_loc_1811_primary']:
    if sid not in src: errors.append('falta fuente Appert '+sid)
    elif sid not in a.get('sourceRefs',[]): errors.append('Appert no enlaza '+sid)
for did in ['perkins_mechanical_refrigeration_1834','monitor_top_refrigerator_1927','haccp_development_1960s','codex_alimentarius_commission_1963']:
    if dev.get(did,{}).get('placeRefs'): errors.append(did+' no debe recibir punto/centroide artificial en alpha.33')
if errors:
    print('PRESERVATION STORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('PRESERVATION STORY: PASS')
print('6 scenes · empirical transformation != demonstrated preservation intent · Appert before germ theory · cold != one machine · HACCP != shelf life · Codex != world law.')
