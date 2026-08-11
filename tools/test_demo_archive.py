from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
A=json.loads((ROOT/"data"/"archive"/"demo_records_pre_g2.json").read_text(encoding="utf-8"))

def load(n):return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

runtime={
    "subjects":{x["id"]:x for x in load("subjects")},
    "places":{x["id"]:x for x in load("places")},
    "occurrences":{x["id"]:x for x in load("occurrences")},
    "events":{x["id"]:x for x in load("events")},
    "relationships":{x["id"]:x for x in load("relationships")},
}
errors=[]
all_archive_ids=[]

for group in ("subjects","places","occurrences","events","relationships"):
    items=A.get(group,[])
    all_archive_ids.extend((group,x.get("id")) for x in items)
    for x in items:
        if x.get("status") not in {"seed","deprecated"}:
            errors.append(f"{group}:{x.get('id')}: estado de archive inválido")
        if x.get("id") in runtime[group]:
            errors.append(f"{group}:{x.get('id')}: duplicado en runtime y archive")
        target=x.get("supersededBy")
        if target and target not in runtime.get(group,{}):
            errors.append(f"{group}:{x.get('id')}: supersededBy no resuelve a runtime {target}")

# Known unresolved seeds must be preserved, not silently deleted.
expected_seeds={
    "wheat_demo","fermentation_demo","sugar_demo","potato_demo","coffee_demo"
}
archived_subjects={x["id"]:x for x in A.get("subjects",[])}
for sid in expected_seeds:
    if archived_subjects.get(sid,{}).get("status")!="seed":
        errors.append(f"seed histórico perdido: {sid}")

if errors:
    print("DEMO ARCHIVE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("DEMO ARCHIVE: PASS")
print("Archived records:",len(all_archive_ids))
print("Unresolved historical seeds preserved:",len(expected_seeds))
