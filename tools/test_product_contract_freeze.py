#!/usr/bin/env python3
import hashlib,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
fp=json.loads((ROOT/'docs/PRODUCT_CONTRACT_FINGERPRINT.json').read_text(encoding='utf-8'))
errors=[]
if fp.get('frozenAt')!='0.1.0-alpha.27': errors.append('frozenAt incorrecto')
if fp.get('productRoles')!={'stories':'comprender','atlas':'descubrir','evidence':'verificar'}: errors.append('roles de producto alterados')
if fp.get('storyTypes')!=['subject','transversal']: errors.append('storyTypes alterados')
if fp.get('legacyStorySubjectRef') is not False: errors.append('legacyStorySubjectRef debe permanecer false')
for rel,expected in fp.get('schemas',{}).items():
    p=ROOT/rel
    if not p.exists(): errors.append(f'falta schema congelado {rel}'); continue
    got=hashlib.sha256(p.read_bytes()).hexdigest()
    if got!=expected: errors.append(f'cambio de contrato no declarado en {rel}')
if errors:
    print('PRODUCT CONTRACT FREEZE: FAIL')
    for e in errors: print('-',e)
    raise SystemExit(1)
print('PRODUCT CONTRACT FREEZE: PASS')
print(f"Schemas congelados: {len(fp.get('schemas',{}))}")
