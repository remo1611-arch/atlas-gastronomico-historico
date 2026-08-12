from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}; occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}; rel=load('relationships.json')
errors=[]
st=next((x for x in stories if x['id']=='story_columbian_exchange_europe'),None)
expected_subjects={'maize','potato','common_bean','tomato','capsicum_pepper','cacao','sugar'}
if not st: errors.append('falta story_columbian_exchange_europe')
else:
    if st.get('storyType')!='transversal' or st.get('primarySubjectRef') is not None: errors.append('intercambio debe ser transversal sin primary')
    if set(st.get('relatedSubjectRefs',[]))!=expected_subjects: errors.append('relatedSubjectRefs incompletos/incorrectos')
    if len(st.get('scenes',[]))!=6: errors.append('intercambio debe tener 6 escenas')
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    required={
      ('occurrence','occ_common_bean_europe_intro_1529_1532'),
      ('occurrence','occ_common_bean_ne_italy_cultivation_1532'),
      ('occurrence','occ_tomato_italy_mattioli_1544'),
      ('occurrence','occ_tomato_southern_europe_adoption_18c'),
      ('occurrence','occ_capsicum_spain_adoption_16c'),
      ('occurrence','occ_maize_cantabrian_adoption_late_16c'),
      ('occurrence','occ_potato_gran_canaria_export_1567'),
      ('occurrence','occ_potato_herbon_trial_1574_1607'),
      ('development','galicia_potato_adoption_1736_1850'),
      ('development','chocolate_established_spain_1600_1650'),
      ('occurrence','occ_sugar_madeira_cycle_1400_1600'),
      ('development','atlantic_sugar_plantation_slavery_1490_1750')}
    if not required<=actual: errors.append('faltan hitos canónicos: '+str(sorted(required-actual)))
    text=json.dumps(st,ensure_ascii=False).lower()
    safeguards=['no el registro de una caja de semillas','atestiguación, no el primer desembarco','no se dibuja una ruta','no lo es','gran canaria→herbón no lo es','no implica simetría']
    for phrase in safeguards:
        if phrase not in text: errors.append('falta salvaguarda: '+phrase)
for sid in ['common_bean','tomato','capsicum_pepper']:
    if sid not in subjects: errors.append('falta subject '+sid)
# Cadena semántica mínima presencia/introducción/adopción
b=occ.get('occ_common_bean_europe_intro_1529_1532',{})
if b.get('occurrenceType')!='introduction' or b.get('certainty')!='medium': errors.append('introducción judía debe quedar introduction/medium')
if places.get(b.get('placeRef'),{}).get('point'): errors.append('introducción continental de judía no debe tener centroide')
bc=occ.get('occ_common_bean_ne_italy_cultivation_1532',{})
if bc.get('occurrenceType')!='cultivation' or bc.get('period',{}).get('start')!=1532: errors.append('cultivo judía 1532 incorrecto')
if places.get(bc.get('placeRef'),{}).get('point'): errors.append('red regional de judía no debe tener punto único')
t=occ.get('occ_tomato_italy_mattioli_1544',{})
if t.get('occurrenceType')!='textual_attestation' or t.get('period',{}).get('start')!=1544: errors.append('Mattioli 1544 debe ser atestiguación textual')
ta=occ.get('occ_tomato_southern_europe_adoption_18c',{})
if ta.get('occurrenceType')!='adoption' or ta.get('period',{}).get('start')!=1700: errors.append('adopción tomate siglo XVIII incorrecta')
if places.get(ta.get('placeRef'),{}).get('point'): errors.append('Europa meridional no debe tener centroide')
c=occ.get('occ_capsicum_spain_adoption_16c',{})
if c.get('occurrenceType')!='adoption' or c.get('certainty')!='medium': errors.append('Capsicum España debe adoption/medium')
if len(occ)<50: errors.append(f'corpus sigue por debajo de referencia mínima G4: {len(occ)} occurrences')
if len(rel)!=1: errors.append('alpha.34 no debe iniciar G4 añadiendo relationships sin contrato de red')
if errors:
    print('COLUMBIAN EXCHANGE STORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('COLUMBIAN EXCHANGE STORY: PASS')
print(f'6 scenes · 7 subjects · {len(occ)} occurrences · arrival != adoption · G4 remains unopened.')
