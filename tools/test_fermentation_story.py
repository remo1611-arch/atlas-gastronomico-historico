from pathlib import Path
import json,sys,re
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories={x['id']:x for x in load('stories.json')}; occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}; places={x['id']:x for x in load('places.json')}; subjects={x['id']:x for x in load('subjects.json')}; errors=[]
st=stories.get('story_fermentation')
if not st: errors.append('falta story_fermentation')
else:
    if st.get('storyType')!='transversal' or st.get('primarySubjectRef') is not None: errors.append('contrato transversal incorrecto')
    required={'mixed_fermented_beverage','wine','bread_like_flatbread','cheese'}
    if not required.issubset(set(st.get('relatedSubjectRefs',[]))): errors.append('relatedSubjectRefs incompletos')
    if len(st.get('scenes',[]))!=5: errors.append('Fermentación debe cerrar alpha.26 con 5 escenas')
    ids=[s['id'] for s in st.get('scenes',[])]
    if ids!=['fermentation_1_jiahu','fermentation_2_diversity','fermentation_3_pasteur_1857','fermentation_4_wine_control','fermentation_5_hansen_1883']: errors.append('orden editorial inesperado')
    text=json.dumps(st,ensure_ascii=False).lower()
    for forbidden in ['primera cerveza del mundo','inventó la fermentación','inventó la levadura','raqefet']:
        if forbidden in text: errors.append('afirmación/registro excluido reaparece: '+forbidden)
for oid in ['occ_fermented_beverage_jiahu_7th_millennium_bce','occ_xiaohe_kefir_cheese_ca_3500_bp']:
    if oid not in occ: errors.append('falta occurrence '+oid)
for did in ['pasteur_fermentation_1857','pasteurization_wine_1863_1865','hansen_pure_yeast_1883']:
    if did not in dev: errors.append('falta development '+did)
if occ.get('occ_fermented_beverage_jiahu_7th_millennium_bce',{}).get('subjectRef')!='mixed_fermented_beverage': errors.append('Jiahu categorizado incorrectamente')
if occ.get('occ_xiaohe_kefir_cheese_ca_3500_bp',{}).get('subjectRef')!='cheese': errors.append('Xiaohe no reutiliza cheese')
if not places.get('jiahu_henan',{}).get('point'): errors.append('Jiahu debe usar coordenadas publicadas')
if places.get('xiaohe_cemetery',{}).get('point') is not None: errors.append('Xiaohe no debe recibir punto no cerrado')
# Pan-like remains must not be promoted to fermentation evidence by this release.
if any(o.get('subjectRef')=='bread_like_flatbread' and 'ferment' in o['id'] for o in occ.values()): errors.append('se fabricó evidencia panaria fermentada no demostrada')
if errors:
    print('FERMENTATION STORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('FERMENTATION STORY: PASS')
print('5 scenes · Jiahu + Georgia/Xiaohe + Pasteur + wine control + Hansen.')
print('Raqefet excluded · no invented bread fermentation · Xiaohe remains unpinned.')
