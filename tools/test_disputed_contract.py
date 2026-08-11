from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/'data'/n).read_text(encoding='utf-8'))
O=load('occurrences.json'); SRC={x['id'] for x in load('sources.json')}; app=(ROOT/'js'/'app.js').read_text(encoding='utf-8'); css=(ROOT/'css'/'app.css').read_text(encoding='utf-8')
errors=[]; disputed=[x for x in O if x.get('certainty')=='disputed']
if not disputed: errors.append('no hay occurrences disputed')
for o in disputed:
 d=o.get('dispute')
 if not d: errors.append(o['id']+': sin dispute'); continue
 if len(d.get('positions',[]))<2: errors.append(o['id']+': menos de 2 posiciones')
 if not d.get('question'): errors.append(o['id']+': sin pregunta')
 for pos in d.get('positions',[]):
  if not pos.get('sourceRefs'): errors.append(o['id']+': posición sin fuentes')
  for ref in pos.get('sourceRefs',[]):
   if ref not in SRC: errors.append(o['id']+': fuente rota '+ref)
   if ref not in o.get('sourceRefs',[]): errors.append(o['id']+': fuente de posición fuera de sourceRefs '+ref)
for needle in ['function disputeHTML(item)','DEBATE ABIERTO','dispute.positions','certainty-value ${esc(o.certainty)}']:
 if needle not in app: errors.append('UI falta '+needle)
for needle in ['.dispute-box','.dispute-position','.history-uncertainty.disputed']:
 if needle not in css: errors.append('CSS falta '+needle)
if errors:
 print('DISPUTED CONTRACT: FAIL'); [print('ERROR:',e) for e in errors]; sys.exit(1)
print('DISPUTED CONTRACT: PASS')
print('Disputed occurrences:',len(disputed))
print('First:',disputed[0]['id'])
print('Positions:',len(disputed[0]['dispute']['positions']))
