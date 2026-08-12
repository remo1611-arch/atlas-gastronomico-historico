from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
O=load('occurrences.json'); R=load('relationships.json'); D={x['id']:x for x in load('developments.json')}
errors=[]
counts={k:sum(1 for o in O if o.get('occurrenceType')==k) for k in ['introduction','adoption','trade']}
if len(O)<50: errors.append(f'occurrences {len(O)} < 50')
if counts['introduction']<2: errors.append('menos de 2 introductions explícitas')
if counts['adoption']<4: errors.append('menos de 4 adoptions explícitas')
if len(R)!=1: errors.append('G4 readiness no debe alterar todavía relationships.json')
pot=next((o for o in O if o['id']=='occ_potato_gran_canaria_export_1567'),None)
if not pot or 'amberes' not in pot.get('summary','').lower(): errors.append('falta vector documental Gran Canaria→Amberes')
coffee=D.get('arabica_batavia_1696_1699')
if not coffee or 'malabar' not in coffee.get('summary','').lower() or 'batavia' not in coffee.get('name','').lower(): errors.append('falta candidato documental Malabar→Batavia')
doc=(ROOT/'docs'/'G4_READINESS_ALPHA34.md').read_text(encoding='utf-8') if (ROOT/'docs'/'G4_READINESS_ALPHA34.md').exists() else ''
if 'G4 PILOT-READY · FULL NETWORK: NO' not in doc: errors.append('veredicto G4 no documentado')
if errors:
 print('G4 READINESS: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('G4 READINESS: PASS')
print(f"Occurrences: {len(O)} · introduction {counts['introduction']} · adoption {counts['adoption']} · trade {counts['trade']} · relationships {len(R)}")
print('Pilot-ready; full network remains blocked.')
