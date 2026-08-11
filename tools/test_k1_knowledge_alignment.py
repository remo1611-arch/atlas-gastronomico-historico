from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
subjects={x['id']:x for x in load('subjects.json')}
places={x['id']:x for x in load('places.json')}
occ={x['id']:x for x in load('occurrences.json')}
dev={x['id']:x for x in load('developments.json')}
sources={x['id']:x for x in load('sources.json')}
errors=[]
c=dev.get('codex_alimentarius_commission_1963')
if not c or c['period']!={'start':1961,'end':1963,'precision':'range','display':'1961–1963'}:errors.append('Codex no representa 1961–1963')
if c and c.get('status')!='verified':errors.append('Codex no verificado')
for sid in ['src_codex_history_1961_1963','src_codex_first_session_1963','src_common_wheat_georgia_pnas_2026','src_common_wheat_georgia_pnas_commentary_2026']:
 if sid not in sources:errors.append('fuente K1 ausente '+sid)
if 'common_wheat' not in subjects:errors.append('subject common_wheat ausente')
ids=['occ_common_wheat_shulaveris_gora_5922_5832_bce','occ_common_wheat_gadachrili_gora_5808_5747_bce']
for oid in ids:
 o=occ.get(oid)
 if not o:errors.append('occurrence K1 ausente '+oid);continue
 if o.get('subjectRef')!='common_wheat' or o.get('evidenceType')!='archaeobotanical':errors.append(oid+' clasificación incorrecta')
 if o.get('status')!='verified':errors.append(oid+' no verificada')
 if 'bread_like_flatbread'==o.get('subjectRef'):errors.append(oid+' confundida con pan')
if places.get('shulaveris_gora',{}).get('point') is not None:errors.append('Shulaveris Gora no debe recibir punto inferido')
# Guard semántico: búsqueda corta «pan» no debe incorporar las nuevas evidencias de trigo común.
def norm(v):
 import unicodedata
 return ''.join(c for c in unicodedata.normalize('NFD',str(v or '')) if unicodedata.category(c)!='Mn').lower()
for oid in ids:
 o=occ[oid];s=subjects[o['subjectRef']];p=places[o['placeRef']]
 hay=' '.join([s.get('name',''),s.get('summary',''),' '.join(s.get('aliases',[])),' '.join(s.get('tags',[])),p.get('name',''),p.get('summary',''),o.get('summary','')])
 words=[x for x in __import__('re').split(r'[^a-z0-9]+',norm(hay)) if x]
 if any(w=='pan' or w.startswith('pan') for w in words):errors.append(oid+' contamina búsqueda pan')
# Guard adicional: el vínculo museográfico no debe contaminar la búsqueda global `vino`.
for oid in ids:
 o=occ[oid];s=subjects[o['subjectRef']];p=places[o['placeRef']]
 hay=' '.join([s.get('name',''),s.get('summary',''),' '.join(s.get('aliases',[])),' '.join(s.get('tags',[])),p.get('name',''),p.get('summary',''),o.get('summary','')])
 if 'vino' in norm(hay):errors.append(oid+' contamina búsqueda vino')
if errors:
 print('K1 KNOWLEDGE ALIGNMENT: FAIL');[print('ERROR:',e) for e in errors];sys.exit(1)
print('K1 KNOWLEDGE ALIGNMENT: PASS')
print('Codex: 1961–1963 · verified')
print('Common wheat: 2 verified archaeobotanical occurrences · kept separate from Bread')
print('Shulaveris Gora: intentionally unmapped')
