from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
tax=json.loads((ROOT/"data/taxonomy.json").read_text(encoding="utf-8"))
contexts=json.loads((ROOT/"data/contexts.json").read_text(encoding="utf-8"))
developments=json.loads((ROOT/"data/developments.json").read_text(encoding="utf-8"))
occ=json.loads((ROOT/"data/occurrences.json").read_text(encoding="utf-8"))

errors=[]

required_context={"civilization","culture","empire","institution"}
required_dev={"scientific_discovery","food_technology","cooking_appliance","hygiene","food_safety","regulation","quality_system"}

if not required_context.issubset(set(tax.get("contextTypes",[]))):
    errors.append("Taxonomía de contextos incompleta")
if not required_dev.issubset(set(tax.get("developmentTypes",[]))):
    errors.append("Taxonomía de developments incompleta")
if not isinstance(contexts,list):
    errors.append("contexts.json no es array")
if not isinstance(developments,list):
    errors.append("developments.json no es array")

# Backward compatibility: old occurrences need not carry the new refs.
for item in occ:
    if "contextRefs" in item and not isinstance(item["contextRefs"],list):
        errors.append(f"{item.get('id')}: contextRefs no es array")
    if "developmentRefs" in item and not isinstance(item["developmentRefs"],list):
        errors.append(f"{item.get('id')}: developmentRefs no es array")

if errors:
    print("EXTENDED CONTRACT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("EXTENDED CONTRACT: PASS")
print("Context types:",len(tax["contextTypes"]))
print("Development types:",len(tax["developmentTypes"]))
print("Impact types:",len(tax["impactTypes"]))
print("Empty context/development datasets accepted for pre-G2.")
