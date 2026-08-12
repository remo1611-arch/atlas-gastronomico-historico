from pathlib import Path
import re, sys
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
errors=[]
visible_forbidden=[r'G4\s*[·-]?\s*PILOTO', r'piloto\s+G4', r'Vínculos documentados\s*·\s*piloto G4']
for pat in visible_forbidden:
    if re.search(pat, html, re.I) or re.search(pat, app, re.I):
        errors.append(f'jerga interna visible: {pat}')
if 'id="versionLabel"' in html:
    errors.append('la versión no debe permanecer visible permanentemente en cabecera')
if 'id="aboutVersion"' not in html:
    errors.append('falta versión diagnóstica en Acerca del atlas')
if 'Versión ${config.project.version}' not in app:
    errors.append('Acerca del atlas no recibe la versión desde config')
if errors:
    print('FAIL')
    for e in errors: print('-',e)
    sys.exit(1)
print('PASS · interfaz pública sin jerga interna de fases; versión disponible solo en Acerca del atlas')
