from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]
def load(name):
 try:return json.loads((ROOT/"data"/name).read_text(encoding="utf-8"))
 except Exception as e:errors.append(f"{name}: {e}");return []
subjects=load("subjects.json");places=load("places.json");occ=load("occurrences.json");events=load("events.json");rels=load("relationships.json");sources=load("sources.json");tax=load("taxonomy.json")
def ids(items,label):
 arr=[x.get("id") for x in items]
 dup=sorted({x for x in arr if arr.count(x)>1})
 if dup:errors.append(f"{label}: IDs duplicadas {dup}")
 return set(arr)
S=ids(subjects,"subjects");P=ids(places,"places");O=ids(occ,"occurrences");E=ids(events,"events");R=ids(rels,"relationships");SRC=ids(sources,"sources")
def period(o,label):
 p=o.get("period",{});a,b=p.get("start"),p.get("end")
 if not isinstance(a,int) or not isinstance(b,int):errors.append(f"{label}: período inválido");return
 if a==0 or b==0:errors.append(f"{label}: año 0 no permitido")
 if a>b:errors.append(f"{label}: start > end")
for o in occ:
 period(o,f"occ:{o.get('id')}")
 if o.get("subjectRef") not in S:errors.append(f"occ:{o.get('id')}: subjectRef roto")
 if o.get("placeRef") not in P:errors.append(f"occ:{o.get('id')}: placeRef roto")
 if o.get("status") in {"reviewed","verified"} and not o.get("sourceRefs"):errors.append(f"occ:{o.get('id')}: reviewed/verified sin fuentes")
 for r in o.get("sourceRefs",[]):
  if r not in SRC:errors.append(f"occ:{o.get('id')}: sourceRef roto {r}")
for e in events:
 period(e,f"event:{e.get('id')}")
 for r in e.get("subjectRefs",[]):
  if r not in S:errors.append(f"event:{e.get('id')}: subjectRef roto {r}")
 for r in e.get("placeRefs",[]):
  if r not in P:errors.append(f"event:{e.get('id')}: placeRef roto {r}")
 if e.get("status") in {"reviewed","verified"} and not e.get("sourceRefs"):errors.append(f"event:{e.get('id')}: reviewed/verified sin fuentes")
for r in rels:
 period(r,f"rel:{r.get('id')}")
 if r.get("from") not in S or r.get("to") not in S:errors.append(f"rel:{r.get('id')}: subject roto")
 if r.get("status") in {"reviewed","verified"} and not r.get("sourceRefs"):errors.append(f"rel:{r.get('id')}: reviewed/verified sin fuentes")
for p in places:
 pt=p.get("point")
 if pt and not(-90<=pt.get("lat",999)<=90 and -180<=pt.get("lon",999)<=180):errors.append(f"place:{p.get('id')}: coordenadas inválidas")
required=["tools/test_ui_contract.py","tools/test_project_pages.py","index.html","css/app.css","js/core.js","js/app.js","data/config.json","data/taxonomy.json","data/subjects.json","data/places.json","data/occurrences.json","data/events.json","data/relationships.json","data/sources.json","data/basemap/world_110m.geojson",".nojekyll","docs/PROJECT_STATE.md","docs/CANONICAL_RULES.md","docs/DATA_MODEL.md","docs/ROADMAP.md","docs/GITHUB_PAGES.md"]
for x in required:
 if not(ROOT/x).exists():errors.append("Falta: "+x)
if errors:
 print("VALIDACIÓN: FAIL")
 for x in errors:print("ERROR:",x)
 sys.exit(1)
print("VALIDACIÓN: PASS")
print("Subjects:",len(subjects));print("Places:",len(places));print("Occurrences:",len(occ));print("Events:",len(events));print("Relationships:",len(rels))
