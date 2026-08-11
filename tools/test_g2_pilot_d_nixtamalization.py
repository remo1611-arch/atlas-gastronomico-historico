from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
S={x['id']:x for x in load('subjects.json')}; O={x['id']:x for x in load('occurrences.json')}; R={x['id']:x for x in load('relationships.json')}; T=load('taxonomy.json'); SRC={x['id'] for x in load('sources.json')}
errors=[]
if 'technique_attestation' not in T['occurrenceTypes']: errors.append('taxonomy sin technique_attestation')
tech=S.get('nixtamalization')
if not tech or tech.get('status') not in {'reviewed','verified'} or tech.get('type')!='culinary_technique': errors.append('nixtamalization canonical incorrecta')
for oid in ['occ_nixtamal_san_bartolo_600_800','occ_nixtamal_la_corona_600_800']:
    o=O.get(oid)
    if not o: errors.append('falta '+oid); continue
    if o.get('subjectRef')!='nixtamalization': errors.append(oid+' subjectRef')
    if o.get('occurrenceType')!='technique_attestation': errors.append(oid+' occurrenceType')
    if o.get('certainty')!='high' or o.get('status')!='reviewed': errors.append(oid+' estado/certeza')
    if not o.get('sourceRefs'): errors.append(oid+' sin fuentes')
    text=(o.get('summary','')+' '+o.get('period',{}).get('note','')).lower()
    if 'origen de la técnica fue' in text or 'se inventó en' in text: errors.append(oid+' claim de origen simplista')
r=R.get('rel_maize_uses_nixtamalization_maya_classic')
if not r or r.get('from')!='maize' or r.get('to')!='nixtamalization' or r.get('type')!='uses_technique' or r.get('status') not in {'reviewed','verified'}: errors.append('relación canónica incorrecta')
for old,new in [('nixtamalization_demo','nixtamalization')]:
    x=S.get(old)
    if not x or x.get('status')!='deprecated' or x.get('supersededBy')!=new: errors.append('migración subject demo incorrecta')
o=O.get('occ_nixtamal_demo')
if not o or o.get('status')!='deprecated' or o.get('supersededBy')!='occ_nixtamal_san_bartolo_600_800': errors.append('migración occurrence demo incorrecta')
r0=R.get('rel_nixtamal_maize_demo')
if not r0 or r0.get('status')!='deprecated' or r0.get('supersededBy')!='rel_maize_uses_nixtamalization_maya_classic': errors.append('migración relationship demo incorrecta')
if errors:
 print('G2 PILOT D NIXTAMALIZATION: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('G2 PILOT D NIXTAMALIZATION: PASS')
print('Direct reviewed occurrences: 2')
print('Canonical relationship: maize -> uses_technique -> nixtamalization')
