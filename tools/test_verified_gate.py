from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

collections=[
    ("subject",load("subjects.json")),
    ("place",load("places.json")),
    ("occurrence",load("occurrences.json")),
    ("event",load("events.json")),
    ("relationship",load("relationships.json")),
    ("transfer",load("transfers.json")),
    ("context",load("contexts.json")),
    ("development",load("developments.json")),
]
sources={x["id"]:x for x in load("sources.json")}
errors=[]
verified=[]

for label,items in collections:
    for item in items:
        if item.get("status")!="verified":
            continue
        verified.append((label,item["id"]))
        meta=item.get("verification")
        if not meta:
            errors.append(f"{label}:{item['id']}: sin verification")
            continue
        refs=meta.get("independentSourceRefs",[])
        if not refs:errors.append(f"{label}:{item['id']}: independentSourceRefs vacío")
        for ref in refs:
            if ref not in sources:errors.append(f"{label}:{item['id']}: fuente independiente rota {ref}")
            if ref not in item.get("sourceRefs",[]):errors.append(f"{label}:{item['id']}: fuente de verificación no está en sourceRefs")
        for key in ("verifiedOn","method","note"):
            if not meta.get(key):errors.append(f"{label}:{item['id']}: verification.{key} vacío")

if not verified:
    errors.append("no hay ningún registro verified para probar el gate")

if errors:
    print("VERIFIED GATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("VERIFIED GATE: PASS")
print("Verified records:",len(verified))
for label,id_ in verified:print(f"- {label}: {id_}")
