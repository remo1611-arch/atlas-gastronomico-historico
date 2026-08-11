from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
files=[]
for p in sorted(ROOT.rglob("*")):
 if not p.is_file():continue
 rel=p.relative_to(ROOT).as_posix()
 if rel=="MANIFEST.json" or rel.endswith(".zip"):continue
 files.append({"path":rel,"bytes":p.stat().st_size,"sha256":hashlib.sha256(p.read_bytes()).hexdigest()})
m={"project":"Atlas Gastronómico Histórico","version":"0.1.0-alpha.2","generated":"2026-08-11","algorithm":"SHA-256","files":files}
(ROOT/"MANIFEST.json").write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding="utf-8")
print("MANIFEST:",len(files),"archivos")
