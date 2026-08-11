from pathlib import Path
import re,sys

ROOT=Path(__file__).resolve().parents[1]
text=(ROOT/'docs/CANONICAL_RULES.md').read_text(encoding='utf-8')
nums=[int(x) for x in re.findall(r'(?m)^(\d+)\.',text)]
errors=[]
if not nums: errors.append('no se localizaron reglas numeradas')
if len(nums)!=len(set(nums)): errors.append('hay números de regla duplicados')
if nums and nums!=list(range(1,len(nums)+1)): errors.append('la numeración no es consecutiva desde 1')
if nums and nums[-1]!=154: errors.append(f'última regla {nums[-1]} != 154')
if errors:
    print('CANONICAL RULE NUMBERING: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('CANONICAL RULE NUMBERING: PASS · 154 reglas únicas y consecutivas')
