from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
occ=json.loads((ROOT/"data"/"occurrences.json").read_text(encoding="utf-8"))
dev=json.loads((ROOT/"data"/"developments.json").read_text(encoding="utf-8"))
errors=[]

sid="bread_like_flatbread"
bread_occ=[x for x in occ if x.get("subjectRef")==sid and x.get("status") in {"reviewed","verified"}]
bread_dev=[x for x in dev if sid in x.get("impactSubjectRefs",[]) and x.get("status") in {"reviewed","verified"}]

if len(bread_occ)!=7:
    errors.append("motor longitudinal no tiene 7 evidencias de pan")
if len(bread_dev)!=1:
    errors.append("motor longitudinal no tiene la transformación Chorleywood")

for needle in [
    "function subjectHistoryItems(subjectId)",
    "function openHistory(subjectId)",
]:
    if needle not in app:
        errors.append("motor genérico de historias incompleto: "+needle)

# No bread-specific rendering logic.
for forbidden in [
    "renderBreadHistory",
    "openBreadHistory",
    "subjectId==='bread_like_flatbread'",
    'subjectId==="bread_like_flatbread"',
]:
    if forbidden in app:
        errors.append("lógica especializada de pan no permitida: "+forbidden)

if errors:
    print("BREAD LONGITUDINAL HISTORY: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("BREAD LONGITUDINAL HISTORY: PASS")
print("7 occurrences + 1 development through generic history engine.")
