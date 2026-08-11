from pathlib import Path
import re,sys
ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
errors=[]
if 'function occurrenceHeadline(o)' not in app: errors.append('falta occurrenceHeadline')
# Within temporalCorpusItems occurrence branch, subject.name must no longer be the title.
m=re.search(r'function temporalCorpusItems\(\)\{(.*?)\n\}',app,re.S)
if not m: errors.append('no se localiza temporalCorpusItems')
else:
    block=m.group(1)
    if 'title:occurrenceHeadline(o)' not in block: errors.append('timeline no usa headline semántico')
    if 'title:subject.name' in block: errors.append('timeline sigue titulando occurrences solo por subject')
for phrase in ['Producción de','Almacenamiento de','Consumo de','Regulación de','Adopción de']:
    if phrase not in app: errors.append('headline vocabulary falta '+phrase)
if errors:
    print('ATLAS SEMANTIC HEADLINES: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('ATLAS SEMANTIC HEADLINES: PASS')
print('Occurrences are titled by historical claim, not repeated subject name.')
