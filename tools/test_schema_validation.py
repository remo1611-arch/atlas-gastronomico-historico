from pathlib import Path
import json,sys
from jsonschema import Draft202012Validator

ROOT=Path(__file__).resolve().parents[1]

pairs=[
    ("subjects.json","subject.schema.json"),
    ("places.json","place.schema.json"),
    ("occurrences.json","occurrence.schema.json"),
    ("events.json","event.schema.json"),
    ("relationships.json","relationship.schema.json"),
    ("transfers.json","transfer.schema.json"),
    ("contexts.json","context.schema.json"),
    ("developments.json","development.schema.json"),
    ("sources.json","source.schema.json"),
    ("stories.json","story.schema.json"),
    ("glossary.json","glossary.schema.json"),
]

errors=[]
validated=0
for data_name,schema_name in pairs:
    data=json.loads((ROOT/"data"/data_name).read_text(encoding="utf-8"))
    schema=json.loads((ROOT/"schemas"/schema_name).read_text(encoding="utf-8"))
    validator=Draft202012Validator(schema)
    for i,item in enumerate(data):
        item_errors=sorted(validator.iter_errors(item),key=lambda e:list(e.path))
        for e in item_errors:
            path="/".join(map(str,e.path)) or "<root>"
            errors.append(f"{data_name}[{i}] {path}: {e.message}")
        validated+=1

if errors:
    print("SCHEMA VALIDATION: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("SCHEMA VALIDATION: PASS")
print("Objects validated:",validated)
print("Schemas:",len(pairs))
