from pathlib import Path
import json,sys,re,unicodedata
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
stories=load('stories.json'); subjects={x['id']:x for x in load('subjects.json')}; places={x['id']:x for x in load('places.json')}
occ={x['id']:x for x in load('occurrences.json')}; dev={x['id']:x for x in load('developments.json')}
errors=[]
st=next((x for x in stories if x['id']=='story_potato'),None)
if not st: errors.append('falta story_potato')
else:
    if st.get('storyType')!='subject': errors.append('story_potato no es subject')
    if st.get('primarySubjectRef')!='potato': errors.append('primarySubjectRef potato ausente')
    if st.get('relatedSubjectRefs')!=['potato']: errors.append('relatedSubjectRefs debe describir solo potato')
    if len(st.get('scenes',[]))!=5: errors.append(f'escenas patata {len(st.get("scenes",[]))} != 5')
    required={
      ('occurrence','occ_potato_jiskairumoko_3400_1600_bce'),
      ('occurrence','occ_potato_gran_canaria_export_1567'),
      ('occurrence','occ_potato_herbon_trial_1574_1607'),
      ('development','galicia_potato_adoption_1736_1850'),
      ('development','irish_great_famine_potato_1845_1852')}
    actual={(r['kind'],r['ref']) for sc in st.get('scenes',[]) for r in sc.get('itemRefs',[])}
    if not required<=actual: errors.append('faltan hitos canónicos: '+str(sorted(required-actual)))
    text=' '.join([st.get('title',''),st.get('question',''),st.get('subtitle','')]+[p for sc in st.get('scenes',[]) for p in sc.get('narrative',[])]).lower()
    # Debe negar explícitamente varios atajos historiográficos.
    if 'no se conserva un documento' not in text or 'no decimos' not in text: errors.append('no protege 1567 frente a falsa fecha de llegada')
    if 'no debe narrarse como' not in text: errors.append('no separa tizón de explicación social de la hambruna')
sub=subjects.get('potato')
if not sub: errors.append('falta subject potato')
else:
    aliases={x.lower() for x in sub.get('aliases',[])}
    if not {'patata','papa','potato','solanum tuberosum'}<=aliases: errors.append('aliases incompletos')

j=occ.get('occ_potato_jiskairumoko_3400_1600_bce',{})
if j.get('period',{}).get('start')!=-3400 or j.get('period',{}).get('end')!=-1600: errors.append('Jiskairumoko pierde rango 3400–1600 a.C.')
if places.get(j.get('placeRef'),{}).get('point'): errors.append('Jiskairumoko no debe recibir coordenada no canónica')
if 'invento' in unicodedata.normalize('NFKD',j.get('summary','').lower()).encode('ascii','ignore').decode('ascii') and 'no ' not in j.get('summary','').lower(): errors.append('Jiskairumoko presentado como invención')

c=occ.get('occ_potato_gran_canaria_export_1567',{})
if c.get('period',{}).get('start')!=1567: errors.append('Gran Canaria no conserva 1567')
if c.get('status')!='verified': errors.append('Gran Canaria 1567 debe quedar verified')
if places.get(c.get('placeRef'),{}).get('point'): errors.append('Gran Canaria insular no debe recibir centroide')
if 'no identifica' not in c.get('summary','').lower(): errors.append('1567 no explicita límite de llegada')

h=occ.get('occ_potato_herbon_trial_1574_1607',{})
hp=places.get(h.get('placeRef'),{})
if h.get('certainty')!='medium': errors.append('Herbón retrospectivo debe mantener certainty medium')
if not hp.get('point') or hp['point'].get('precision')!='reference': errors.append('Herbón necesita punto territorial reference')
if 'no identifica' not in hp['point'].get('note','').lower(): errors.append('Herbón no limita precisión espacial')

g=dev.get('galicia_potato_adoption_1736_1850',{})
if g.get('period',{}).get('start')!=1736 or g.get('period',{}).get('end')!=1850: errors.append('difusión Galicia no conserva 1736–1850')
if g.get('status')!='verified': errors.append('difusión Galicia debe quedar verified')
if not all(k in g.get('summary','').lower() for k in ['1769','1770','desigual']): errors.append('difusión Galicia pierde crisis o desigualdad')

f=dev.get('irish_great_famine_potato_1845_1852',{})
if f.get('period',{}).get('start')!=1845 or f.get('period',{}).get('end')!=1852: errors.append('Gran Hambruna no conserva 1845–1852')
if f.get('status')!='verified': errors.append('Gran Hambruna debe quedar verified')
if any(places.get(r,{}).get('point') for r in f.get('placeRefs',[])): errors.append('Gran Hambruna no debe tener centroide único')
ft=(f.get('name','')+' '+f.get('summary','')).lower()
for k in ['phytophthora infestans','pobreza','estructura','respuesta']:
    if k not in ft: errors.append('Gran Hambruna pierde factor: '+k)
if 'causa social única' not in ft: errors.append('Gran Hambruna no explicita modelo multicausal')

if errors:
    print('POTATO STORY: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('POTATO STORY: PASS')
print('5 scenes · Andes evidence != origin · 1567 presence != arrival · Galicia adoption uneven · blight != famine monocause.')
