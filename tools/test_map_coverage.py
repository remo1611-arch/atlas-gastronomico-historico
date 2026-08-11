from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
places=load('places.json');occ=load('occurrences.json');contexts=load('contexts.json');developments=load('developments.json');html=(ROOT/'index.html').read_text(encoding='utf-8');app=(ROOT/'js/app.js').read_text(encoding='utf-8');by={p['id']:p for p in places};errors=[]
def hp(i):
 p=by.get(i) or {}; q=p.get('point');
 if not q:return False
 try:return -90<=float(q['lat'])<=90 and -180<=float(q['lon'])<=180
 except:return False
def anyp(refs):return any(hp(x) for x in refs or [])
uo=[o['id'] for o in occ if not hp(o.get('placeRef'))];uc=[c['id'] for c in contexts if not anyp(c.get('placeRefs'))];ud=[d['id'] for d in developments if not anyp(d.get('placeRefs'))]
for needle in ['id="mapCoverageStatus"','id="unmappedRecordsPanel"','sin inventar centroides']:
 if needle not in html:errors.append('HTML falta '+needle)
for needle in ['function placeHasMapPoint(pl)','function firstResolvedPlace(placeRefs=[])','function firstMappablePlace(placeRefs=[])','function activeUnmappedSecondaryRecords()','if(!box) return;','data-unmapped-occurrence','data-unmapped-secondary','Capa activa sin punto cartográfico:','El Atlas no inventa centroides ni puntos únicos.','const firstPlace=firstMappablePlace(c.placeRefs||[])','const firstPlace=firstMappablePlace(d.placeRefs||[])']:
 if needle not in app:errors.append('app falta '+needle)
for legacy in ['const firstPlace=(c.placeRefs||[]).map(place).find(Boolean)','const firstPlace=(d.placeRefs||[]).map(place).find(Boolean)']:
 if legacy in app:errors.append('legacy '+legacy)
if len(uo)!=15:errors.append(f'occ {len(uo)} != 15')
if len(uc)!=2:errors.append(f'contexts {len(uc)} != 2')
if len(ud)!=6:errors.append(f'dev {len(ud)} != 6')
if errors:
 print('MAP COVERAGE: FAIL');[print('ERROR:',e) for e in errors];sys.exit(1)
print('MAP COVERAGE: PASS');print('Occurrences sin punto:',len(uo));print('Contexts sin punto:',len(uc));print('Developments sin punto:',len(ud))
