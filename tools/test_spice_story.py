from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}; occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_spices'),None)
if not st: errors.append('falta story_spices')
else:
    if st.get('storyType')!='transversal' or st.get('primarySubjectRef') is not None: errors.append('Especias debe ser transversal sin primary')
    if set(st.get('relatedSubjectRefs',[]))!={'turmeric','black_pepper','nutmeg'}: errors.append('relatedSubjectRefs incorrectos')
    if len(st.get('scenes',[]))!=5: errors.append('Especias debe tener 5 escenas')
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    required={('occurrence','occ_turmeric_megiddo_1630_1550_bce'),('occurrence','occ_black_pepper_berenike_roman'),('development','medieval_europe_spice_demand_1000_1500'),('development','portuguese_cape_route_calicut_1498'),('occurrence','occ_nutmeg_banda_historic_production_1500_1621'),('development','banda_voc_nutmeg_monopoly_1621')}
    if not required<=actual: errors.append('faltan hitos: '+str(required-actual))
    text=json.dumps(st,ensure_ascii=False).lower()
    for phrase in ['no permite dibujar una línea continua','no explica por sí sola','no conecta por primera vez','no era suficiente','no reconstruye automáticamente']:
        if phrase not in text: errors.append('falta salvaguarda: '+phrase)
    if 'carne podrida' not in text or 'salado, secado y ahumado' not in text: errors.append('no desmonta mito conservación medieval')
for sid in ['turmeric','black_pepper','nutmeg']:
    if sid not in subjects: errors.append('falta subject '+sid)
m=occ.get('occ_turmeric_megiddo_1630_1550_bce',{})
if m.get('certainty')!='medium': errors.append('Megiddo cúrcuma debe mantener medium')
if m.get('period',{}).get('start')!=-1630 or m.get('period',{}).get('end')!=-1550: errors.append('Megiddo pierde rango')
if not places.get('tel_megiddo_spice',{}).get('point'): errors.append('Megiddo debe tener punto UNESCO')
med=dev.get('medieval_europe_spice_demand_1000_1500',{})
if med.get('placeRefs'): errors.append('Europa medieval no debe tener centroide')
if 'ocultar carne podrida' not in med.get('summary','').lower(): errors.append('development medieval pierde refutación')
cal=dev.get('portuguese_cape_route_calicut_1498',{})
if 'no creó' not in cal.get('summary','').lower() or 'preexistentes' not in cal.get('summary','').lower(): errors.append('Calicut pierde redes preexistentes')
b=dev.get('banda_voc_nutmeg_monopoly_1621',{})
if b.get('status')!='verified': errors.append('Banda debe verified')
if places.get('banda_islands_nutmeg_region',{}).get('point'): errors.append('Banda no debe tener centroide')
for k in ['matanzas','expulsiones','esclavización']:
    if k not in b.get('summary','').lower(): errors.append('Banda pierde dimensión humana: '+k)
if errors:
    print('SPICE STORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('SPICE STORY: PASS')
print('5 scenes · long-distance contact != route · medieval spices != rotten-meat mask · 1498 != creation of Indian Ocean trade · Banda monopoly includes colonial violence.')
