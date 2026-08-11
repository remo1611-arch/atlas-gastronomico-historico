from pathlib import Path
import json,sys,re

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
subjects=json.loads((ROOT/"data/subjects.json").read_text(encoding="utf-8"))
occ=json.loads((ROOT/"data/occurrences.json").read_text(encoding="utf-8"))
events=json.loads((ROOT/"data"/"events.json").read_text(encoding="utf-8"))
relationships=json.loads((ROOT/"data"/"relationships.json").read_text(encoding="utf-8"))

errors=[]

if "if(o.status==='deprecated') return false;" not in app:
    errors.append("occVisible no excluye occurrences deprecated")
if "subject.status==='deprecated'" not in app:
    errors.append("occVisible no excluye subjects deprecated")

deprecated_subjects=[x for x in subjects if x.get("status")=="deprecated"]
deprecated_occ=[x for x in occ if x.get("status")=="deprecated"]
deprecated_events=[x for x in events if x.get("status")=="deprecated"]
deprecated_relationships=[x for x in relationships if x.get("status")=="deprecated"]

for item in deprecated_subjects+deprecated_occ+deprecated_events:
    if not item.get("supersededBy"):
        errors.append(f"{item.get('id')}: deprecated sin supersededBy")

if errors:
    print("PUBLIC STATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("PUBLIC STATE: PASS")
print("Deprecated subjects preserved/hidden:",len(deprecated_subjects))
print("Deprecated occurrences preserved/hidden:",len(deprecated_occ))
print("Deprecated events preserved/hidden:",len(deprecated_events))
print("Deprecated relationships preserved/hidden:",len(deprecated_relationships))
