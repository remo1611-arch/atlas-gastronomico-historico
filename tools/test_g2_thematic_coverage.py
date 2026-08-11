from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

S={x["id"]:x for x in load("subjects.json")}
O={x["id"]:x for x in load("occurrences.json")}
errors=[]

checks={
    "olive_oil":"processed_product",
    "black_pepper":"ingredient",
}
for sid,stype in checks.items():
    item=S.get(sid)
    if not item:
        errors.append(f"falta subject {sid}")
        continue
    if item.get("type")!=stype:
        errors.append(f"{sid}: type esperado {stype}, encontrado {item.get('type')}")
    if item.get("status") not in {"reviewed","verified"}:
        errors.append(f"{sid}: estado no publicable")

oil=[x for x in O.values() if x.get("subjectRef")=="olive_oil" and x.get("status") in {"reviewed","verified"}]
pepper=[x for x in O.values() if x.get("subjectRef")=="black_pepper" and x.get("status") in {"reviewed","verified"}]

if len(oil)<3:errors.append("aceite: cobertura longitudinal insuficiente")
if len(pepper)<1:errors.append("pimienta: falta occurrence")
if pepper and pepper[0].get("occurrenceType")!="trade":
    errors.append("pimienta Berenike debe documentar trade, no origen")
if pepper and pepper[0].get("evidenceType")!="archaeobotanical":
    errors.append("pimienta Berenike debe conservar evidencia archaeobotanical")

if errors:
    print("G2 THEMATIC COVERAGE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 THEMATIC COVERAGE: PASS")
print("Fat/oil: olive_oil")
print("Spice: black_pepper")
