from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
stories=json.loads((ROOT/'data/stories.json').read_text(encoding='utf-8'))
errors=[]
for story in stories:
    for scene in story.get('scenes',[]):
        label=f"{story['id']}/{scene['id']}"
        narrative=scene.get('narrative',[])
        if len(narrative)<3: errors.append(label+': necesita >=3 párrafos narrativos')
        chars=sum(len(p) for p in narrative)
        if chars<1200: errors.append(f'{label}: narrativa demasiado breve ({chars} caracteres)')
        geo=scene.get('geography',{})
        for k in ['today','region','orientation','society']:
            if len(geo.get(k,''))<12: errors.append(f'{label}: geografía/contexto insuficiente {k}')
        if len(scene.get('method',{}).get('body',''))<100: errors.append(label+': método insuficiente')
        if len(scene.get('limits',''))<70: errors.append(label+': límites insuficientes')
        if len(scene.get('whyItMatters',''))<70: errors.append(label+': por qué importa insuficiente')
        if len(scene.get('nextQuestion',''))<50: errors.append(label+': transición insuficiente')
        if not scene.get('sourceRefs'): errors.append(label+': sin trazabilidad')

if errors:
    print('NARRATIVE EDITORIAL DEPTH: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('NARRATIVE EDITORIAL DEPTH: PASS')
print('Every scene has geography, human context, method, limits, significance and transition.')
