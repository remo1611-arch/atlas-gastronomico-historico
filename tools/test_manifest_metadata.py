from pathlib import Path
import json,subprocess,sys
ROOT=Path(__file__).resolve().parents[1];path=ROOT/'MANIFEST.json';before=json.loads(path.read_text(encoding='utf-8'));keep={k:before.get(k) for k in ('gate','phase')};subprocess.run([sys.executable,str(ROOT/'tools/build_manifest.py')],check=True,capture_output=True,text=True);after=json.loads(path.read_text(encoding='utf-8'));errors=[]
for k,v in keep.items():
 if v is not None and after.get(k)!=v:errors.append(f'{k}: {v!r}->{after.get(k)!r}')
config=json.loads((ROOT/'data/config.json').read_text(encoding='utf-8'))
if after.get('version')!=config['project']['version']:errors.append('version no sincronizada')
if errors:print('MANIFEST METADATA: FAIL');[print('ERROR:',e) for e in errors];sys.exit(1)
print('MANIFEST METADATA: PASS')
