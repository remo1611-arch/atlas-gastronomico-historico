from pathlib import Path
import json,sys,re,unicodedata
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}
occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_sugar'),None)
if not st: errors.append('falta story_sugar')
else:
    if st.get('storyType')!='subject': errors.append('story_sugar no es subject')
    if st.get('primarySubjectRef')!='sugar': errors.append('primarySubjectRef sugar ausente')
    if st.get('relatedSubjectRefs')!=['sugar']: errors.append('relatedSubjectRefs debe describir solo sugar')
    if len(st.get('scenes',[]))!=5: errors.append(f'escenas azúcar {len(st.get("scenes",[]))} != 5')
    required={
      ('occurrence','occ_sugarcane_domestication_new_guinea_ca_6000_bce'),
      ('development','sugar_crystallization_south_asia_ca_350_ce'),
      ('development','mediterranean_to_madeira_sugar_700_1500'),
      ('occurrence','occ_sugar_madeira_cycle_1400_1600'),
      ('development','atlantic_sugar_plantation_slavery_1490_1750'),
      ('development','marggraf_beet_sucrose_1747'),
      ('development','achard_beet_sugar_factory_1801'),
    }
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    if not required<=actual: errors.append('faltan hitos canónicos de azúcar: '+str(sorted(required-actual)))
    # Las expresiones problemáticas pueden aparecer legítimamente para refutar mitos.
    # Solo fallamos si aparecen como afirmaciones no negadas en una frase narrativa.
    narrative_sentences=[]
    for sc in st.get('scenes',[]):
        for para in sc.get('narrative',[]):
            narrative_sentences.extend(re.split(r'(?<=[.!?])\s+', para.lower()))
    risky=['inventó el azúcar','invento el azucar','primer azúcar del mundo','primer azucar del mundo','la esclavitud fue un detalle']
    negation_markers=['no ','no se ','no fue ','no buscamos ','sin ','evita ','evitar ','ni ','tampoco ','rechaza ','refuta ']
    for sentence in narrative_sentences:
        for phrase in risky:
            if phrase in sentence:
                before=sentence[:sentence.index(phrase)]
                if not any(marker in before[-80:] for marker in negation_markers):
                    errors.append('afirmación de prioridad/minimización no permitida: '+phrase)

sub=subjects.get('sugar')
if not sub: errors.append('falta subject sugar')
else:
    aliases={x.lower() for x in sub.get('aliases',[])}
    if not {'azúcar','sugar','sacarosa','sucrose'}<=aliases: errors.append('aliases azúcar/sugar/sacarosa/sucrose incompletos')
    if any(x in aliases for x in ['caña de azúcar','sugarcane','remolacha azucarera']): errors.append('planta fuente no debe ser alias semántico de sugar')

ng=occ.get('occ_sugarcane_domestication_new_guinea_ca_6000_bce',{})
if ng.get('period',{}).get('start')!=-6000: errors.append('domesticación caña no conserva ca. 6000 a.C.')
if places.get(ng.get('placeRef'),{}).get('point'): errors.append('Nueva Guinea regional no debe recibir centroide')
if 'cristal' in ng.get('summary','').lower() and 'no' not in ng.get('summary','').lower(): errors.append('domesticación caña confunde planta con azúcar cristalizado')

cr=dev.get('sugar_crystallization_south_asia_ca_350_ce',{})
if cr.get('period',{}).get('start')!=300 or cr.get('period',{}).get('end')!=500: errors.append('cristalización no conserva rango prudente 300–500')
if cr.get('certainty')!='medium': errors.append('cronología de cristalización debe mantener certainty medium')
if places.get((cr.get('placeRefs') or [None])[0],{}).get('point'): errors.append('Asia meridional regional no debe recibir centroide')
cr_summary=unicodedata.normalize('NFKD',cr.get('summary','').lower()).encode('ascii','ignore').decode('ascii')
if not any(k in cr_summary for k in ['aproxim','historiograf','reconstruccion']): errors.append('cristalización no explicita cautela historiográfica')

mad=occ.get('occ_sugar_madeira_cycle_1400_1600',{})
mp=places.get(mad.get('placeRef'),{})
if not mp.get('point'): errors.append('Madeira/Funchal carece de referencia cartografiable')
elif mp['point'].get('precision')!='reference': errors.append('Funchal debe ser reference, no coordenada histórica exacta')

atl=dev.get('atlantic_sugar_plantation_slavery_1490_1750',{})
if not atl: errors.append('falta desarrollo atlántico plantación/esclavitud')
else:
    if any(places.get(r,{}).get('point') for r in atl.get('placeRefs',[])): errors.append('sistema atlántico no debe tener centroide único')
    text=(atl.get('name','')+' '+atl.get('summary','')).lower()
    if 'esclav' not in text: errors.append('desarrollo atlántico invisibiliza esclavitud')
    if 'millones' not in text: errors.append('desarrollo atlántico no expresa escala humana')

m=dev.get('marggraf_beet_sucrose_1747',{})
if m.get('period',{}).get('start')!=1747: errors.append('Marggraf no conserva 1747')
if m.get('status')!='verified': errors.append('Marggraf debe quedar verified')
if not any(places.get(r,{}).get('point') for r in m.get('placeRefs',[])): errors.append('Marggraf carece de Berlín cartografiable')
a=dev.get('achard_beet_sugar_factory_1801',{})
if a.get('period',{}).get('start')!=1801: errors.append('Achard no conserva 1801')
if any(places.get(r,{}).get('point') for r in a.get('placeRefs',[])): errors.append('Cunern no debe recibir coordenada sin georreferencia específica')

if errors:
    print('SUGAR STORY: FAIL')
    [print('ERROR:',e) for e in errors]
    sys.exit(1)
print('SUGAR STORY: PASS')
print('5 scenes · plant != crystal · Atlantic slavery explicit · Marggraf 1747 / Achard 1801 separated.')
