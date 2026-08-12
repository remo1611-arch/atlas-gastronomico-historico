from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}
occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}; sources={x['id']:x for x in load('sources.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_cacao'),None)
if not st: errors.append('falta story_cacao')
else:
    if st.get('storyType')!='subject': errors.append('story_cacao no es subject')
    if st.get('primarySubjectRef')!='cacao': errors.append('primarySubjectRef cacao ausente')
    if st.get('relatedSubjectRefs')!=['cacao']: errors.append('relatedSubjectRefs debe describir solo cacao actual')
    if len(st.get('scenes',[]))!=5: errors.append(f'escenas cacao {len(st.get("scenes",[]))} != 5')
    required={
      ('occurrence','occ_cacao_santa_ana_la_florida_3500_3300_bce'),
      ('occurrence','occ_cacao_puerto_escondido_1400_1100_bce'),
      ('occurrence','occ_cacao_classic_maya_drinking_vessels_600_900_ce'),
      ('development','chocolate_established_spain_1600_1650'),
      ('development','van_houten_cocoa_press_1828'),
      ('development','daniel_peter_milk_chocolate_trials_1875'),
      ('development','lindt_conching_1879'),
    }
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    if not required<=actual: errors.append('faltan hitos canónicos de cacao/chocolate: '+str(sorted(required-actual)))

sub=subjects.get('cacao')
if not sub or 'chocolate' not in [x.lower() for x in sub.get('aliases',[])]: errors.append('subject cacao no recupera alias chocolate')

for oid in ['occ_cacao_santa_ana_la_florida_3500_3300_bce','occ_cacao_puerto_escondido_1400_1100_bce','occ_cacao_classic_maya_drinking_vessels_600_900_ce']:
    if oid not in occ: errors.append('falta '+oid)
    elif places.get(occ[oid].get('placeRef'),{}).get('point'): errors.append(oid+': no debe recibir un punto inventado')

for did in ['chocolate_established_spain_1600_1650']:
    d=dev.get(did)
    if not d: errors.append('falta '+did)
    elif any(places.get(r,{}).get('point') for r in d.get('placeRefs',[])): errors.append(did+': proceso regional no debe tener punto único')
for did in ['van_houten_cocoa_press_1828','daniel_peter_milk_chocolate_trials_1875','lindt_conching_1879']:
    d=dev.get(did)
    if not d: errors.append('falta '+did)
    elif not any(places.get(r,{}).get('point') for r in d.get('placeRefs',[])): errors.append(did+': falta referencia urbana cartografiable')

vh=dev.get('van_houten_cocoa_press_1828',{})
text=' '.join(str(v) for v in vh.values()).lower()
if 'dutch' not in text and 'alcal' not in text: errors.append('Van Houten no distingue prensa de dutching/alcalinización')
peter=dev.get('daniel_peter_milk_chocolate_trials_1875',{})
if peter.get('period',{}).get('start')!=1875: errors.append('Peter no conserva inicio documentado 1875')
lindt=dev.get('lindt_conching_1879',{})
if lindt.get('period',{}).get('start')!=1879: errors.append('Lindt no conserva 1879')

# Story must not canonize disputed/definition-dependent first-bar slogans.
blob=json.dumps(st,ensure_ascii=False).lower()
for forbidden in ['primera tableta de chocolate','first chocolate bar','primera barra de chocolate']:
    if forbidden in blob: errors.append('afirmación de prioridad no permitida: '+forbidden)

if errors:
    print('CACAO / CHOCOLATE STORY: FAIL')
    [print('ERROR:',e) for e in errors]
    sys.exit(1)
print('CACAO / CHOCOLATE STORY: PASS')
print('5 scenes · early evidence kept non-punctual · industrial milestones qualified.')
