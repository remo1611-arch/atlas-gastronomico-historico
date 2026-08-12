#!/usr/bin/env python3
import json, pathlib, collections, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
load=lambda name: json.load(open(ROOT/'data'/name,encoding='utf-8'))
O=load('occurrences.json'); R=load('relationships.json'); T=load('transfers.json')
counts=collections.Counter(x.get('occurrenceType') for x in O)
errors=[]
if len(O)<50: errors.append(f'corpus por debajo del umbral mínimo orientativo: {len(O)}')
if len(T)<3: errors.append(f'Pilot B requiere al menos 3 transfers, hay {len(T)}')
projectable=sum(t.get('mapMode')=='endpoint_connection' for t in T)
if projectable<1: errors.append('Pilot B debe demostrar al menos una conexión cartográfica legítima')
if projectable>=len(T): errors.append('el sistema no debe exigir geometría a todos los vínculos documentados')
if len(R)<1: errors.append('falta relationship canónica mínima')
print('G4 READINESS:', 'PASS' if not errors else 'FAIL')
print(f"Occurrences: {len(O)} · introduction {counts['introduction']} · adoption {counts['adoption']} · trade {counts['trade']} · relationships {len(R)} · transfers {len(T)} · projectables {projectable}")
for e in errors: print('ERROR:',e)
sys.exit(1 if errors else 0)
