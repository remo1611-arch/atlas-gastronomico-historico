from pathlib import Path
from datetime import date
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]; MANIFEST=ROOT/'MANIFEST.json'
try: existing=json.loads(MANIFEST.read_text(encoding='utf-8')) if MANIFEST.exists() else {}
except Exception: existing={}
config=json.loads((ROOT/'data/config.json').read_text(encoding='utf-8')); project=config.get('project',{})
files=[]
for p in sorted(ROOT.rglob('*')):
 if not p.is_file(): continue
 rel=p.relative_to(ROOT).as_posix()
 if rel=='MANIFEST.json' or rel.endswith('.zip'): continue
 files.append({'path':rel,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
meta={k:v for k,v in existing.items() if k not in {'project','version','generated','algorithm','files'}}
m={'project':project.get('name','Atlas Gastronómico Histórico'),'version':project.get('version','unknown'),**meta,'generated':date.today().isoformat(),'algorithm':'SHA-256','files':files}
MANIFEST.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');print('MANIFEST:',len(files),'archivos ·',m['version'])
