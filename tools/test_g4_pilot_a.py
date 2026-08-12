#!/usr/bin/env python3
from pathlib import Path
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda p: json.loads((ROOT/p).read_text(encoding='utf-8'))
transfers=load('data/transfers.json'); places=load('data/places.json'); subjects=load('data/subjects.json')
sources=load('data/sources.json'); occ=load('data/occurrences.json'); dev=load('data/developments.json'); events=load('data/events.json')
app=(ROOT/'js/app.js').read_text(encoding='utf-8'); html=(ROOT/'index.html').read_text(encoding='utf-8')
errors=[]
if len(transfers)!=2: errors.append(f'piloto debe contener exactamente 2 vectores, hay {len(transfers)}')
ids={x['id'] for x in transfers}
expected={'transfer_potato_gran_canaria_antwerp_1567','transfer_coffee_malabar_batavia_1696_1699'}
if ids!=expected: errors.append(f'vectores inesperados: {ids}')
S={x['id'] for x in subjects}; P={x['id']:x for x in places}; SRC={x['id'] for x in sources}
targets={'occurrence':{x['id'] for x in occ},'development':{x['id'] for x in dev},'event':{x['id'] for x in events}}
for t in transfers:
    if t['subjectRef'] not in S: errors.append(f"{t['id']}: subject roto")
    if t['fromPlaceRef'] not in P or t['toPlaceRef'] not in P: errors.append(f"{t['id']}: extremo roto")
    if not set(t['sourceRefs'])<=SRC: errors.append(f"{t['id']}: sourceRef roto")
    e=t['evidenceRef']
    if e['kind'] not in targets or e['ref'] not in targets[e['kind']]: errors.append(f"{t['id']}: evidencia canónica rota")
    if t['mapMode']!='none': errors.append(f"{t['id']}: alpha.35 no debe dibujar geometría")
    if any(k in t for k in ('coordinates','path','geometry','route')): errors.append(f"{t['id']}: contiene geometría inventada")
if P.get('gran_canaria_potato_1567',{}).get('point') is not None: errors.append('Gran Canaria no debe adquirir centroide')
if P.get('malabar_coast_coffee_transfer_region',{}).get('point') is not None: errors.append('Malabar no debe adquirir centroide')
for token in ('layerTransfers','transferLayer','transferPilotPanel','renderTransferPilot','renderTransferLayer','data/transfers.json'):
    if token not in app+html: errors.append(f'UI/runtime G4 incompleto: {token}')
# The runtime must be generic: canonical transfer IDs belong only to data/tests, never app.js.
for tid in expected:
    if tid in app: errors.append(f'app.js contiene lógica específica del vector {tid}')
if 'mapMode!==\'endpoint_connection\'' not in app: errors.append('runtime no exige opt-in explícito para dibujar conexiones')
if errors:
    print('G4 PILOT A: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('G4 PILOT A: PASS')
print('Vectores documentados:',len(transfers))
print('Geometrías dibujables:',sum(t['mapMode']=='endpoint_connection' for t in transfers))
print('Los 2 vínculos se conservan semánticamente sin inventar trayectos.')
