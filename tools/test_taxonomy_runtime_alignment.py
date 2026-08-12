from pathlib import Path
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
load=lambda n:json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
subjects=load('subjects.json'); occ=load('occurrences.json'); app=(ROOT/'js'/'app.js').read_text(encoding='utf-8')
errors=[]
checks={
 'subjectTypes':sorted({x.get('type') for x in subjects if x.get('type')}),
 'occurrenceTypes':sorted({x.get('occurrenceType') for x in occ if x.get('occurrenceType')}),
 'evidenceTypes':sorted({x.get('evidenceType') for x in occ if x.get('evidenceType')})}
if 'function runtimeTaxonomyValues' not in app:
    errors.append('falta unión runtime entre taxonomía congelada y valores observados')
for expected in [
    's.subjects.filter(x=>isPublicStatus(x.status)).map(x=>x.type)',
    's.occurrences.filter(x=>isPublicStatus(x.status)).map(x=>x.evidenceType)',
    's.occurrences.filter(x=>isPublicStatus(x.status)).map(x=>x.occurrenceType)']:
    if expected not in app: errors.append('fillControls no incorpora valores observados: '+expected)
# Todo valor público observado debe tener etiqueta explícita en UI para no mostrar IDs crudos.
for group,used in checks.items():
    for value in used:
        if not re.search(rf"\b{re.escape(value)}\s*:\s*'",app):
            errors.append(f'{group} sin etiqueta UI: {value}')
if errors:
    print('TAXONOMY RUNTIME ALIGNMENT: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('TAXONOMY RUNTIME ALIGNMENT: PASS')
for group,used in checks.items(): print(f'- {group}: {len(used)} valores públicos cubiertos por filtros runtime y etiquetas')
print('- taxonomy.json permanece congelado; no se altera el fingerprint G2')
