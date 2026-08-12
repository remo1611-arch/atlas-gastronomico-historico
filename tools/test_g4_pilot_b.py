#!/usr/bin/env python3
import json, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
load=lambda rel: json.load(open(ROOT/rel,encoding='utf-8'))
T=load('data/transfers.json'); P={x['id']:x for x in load('data/places.json')}; D={x['id']:x for x in load('data/developments.json')}; S={x['id']:x for x in load('data/sources.json')}
app=(ROOT/'js/app.js').read_text(encoding='utf-8'); css=(ROOT/'css/app.css').read_text(encoding='utf-8')
errors=[]
if len(T)!=3: errors.append(f'Pilot B debe contener 3 transfers, hay {len(T)}')
projectable=[t for t in T if t.get('mapMode')=='endpoint_connection']
if len(projectable)!=1: errors.append(f'debe existir exactamente 1 endpoint_connection, hay {len(projectable)}')
else:
 t=projectable[0]
 if t['id']!='transfer_coffee_amsterdam_paris_1714': errors.append('la primera conexión debe ser Ámsterdam→París 1714')
 if t.get('fromPlaceRef')!='amsterdam_1714_urban_reference' or t.get('toPlaceRef')!='jardin_des_plantes_paris_1714': errors.append('extremos Pilot B incorrectos')
 for ref in (t['fromPlaceRef'],t['toPlaceRef']):
  p=P.get(ref)
  if not p or not p.get('point'): errors.append(f'{ref}: extremo sin punto')
 if t.get('status')!='verified' or t.get('certainty')!='high': errors.append('transfer 1714 debe ser verified/high')
 if t.get('evidenceRef',{}).get('ref')!='coffee_amsterdam_paris_1714': errors.append('evidenceRef incorrecta')
 if not {'src_coffee_wcr_arabica_history','src_coffee_mnhn_jardin_2026'} <= set(t.get('sourceRefs',[])): errors.append('faltan fuentes históricas independientes')
 if 'trayecto' not in (t.get('mapNote') or '').lower(): errors.append('mapNote debe limitar interpretación como trayecto')
if 'coffee_amsterdam_paris_1714' not in D: errors.append('falta development canónico 1714')
for sid in ['src_coffee_mnhn_jardin_2026','src_amsterdam_wikidata_q727','src_jardin_plantes_wikidata_q730948']:
 if sid not in S: errors.append(f'falta fuente {sid}')
for token in ['transfer-vector-origin','transfer-vector-arrow','Math.atan2','endpoint_connection']:
 if token not in app and token not in css: errors.append(f'falta soporte direccional: {token}')
print('G4 PILOT B:', 'PASS' if not errors else 'FAIL')
print('Transfers:',len(T),'· cartografiables:',len(projectable))
for e in errors: print('ERROR:',e)
sys.exit(1 if errors else 0)
