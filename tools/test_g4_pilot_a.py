#!/usr/bin/env python3
import json, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
load=lambda rel: json.load(open(ROOT/rel,encoding='utf-8'))
transfers=load('data/transfers.json'); places=load('data/places.json')
T={x['id']:x for x in transfers}; P={x['id']:x for x in places}
errors=[]
expected={'transfer_potato_gran_canaria_antwerp_1567','transfer_coffee_malabar_batavia_1696_1699'}
if not expected <= set(T): errors.append(f'faltan transfers originales de Pilot A: {expected-set(T)}')
for tid in expected:
    t=T.get(tid)
    if not t: continue
    if t.get('mapMode')!='none': errors.append(f'{tid}: Pilot A debe permanecer sin geometría')
    if not t.get('mapNote'): errors.append(f'{tid}: falta mapNote')
if P.get('malabar_coast_coffee_transfer_region',{}).get('point') is not None: errors.append('Malabar no debe adquirir centroide')
if P.get('gran_canaria_potato_1567',{}).get('point') is not None: errors.append('Gran Canaria no debe adquirir centroide')
print('G4 PILOT A REGRESSION:', 'PASS' if not errors else 'FAIL')
for e in errors: print('ERROR:',e)
sys.exit(1 if errors else 0)
