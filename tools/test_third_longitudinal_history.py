from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n): return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

subjects={x["id"]:x for x in load("subjects.json")}
occ=load("occurrences.json")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")

errors=[]
olive=[x for x in occ if x.get("subjectRef")=="olive_oil" and x.get("status") in {"reviewed","verified"}]

if subjects.get("olive_oil",{}).get("status") not in {"reviewed","verified"}:
    errors.append("olive_oil no es canónico reviewed/verified")
if len(olive)<3:
    errors.append(f"olive_oil necesita >=3 occurrences para tercer recorrido; hay {len(olive)}")

required={
    "occ_olive_oil_kfar_samir_6500_bp",
    "occ_olive_oil_ein_zippori_6th_5th_millennia",
    "occ_olive_oil_monte_testaccio_1_3c"
}
missing=required-{x["id"] for x in olive}
if missing:
    errors.append("faltan hitos aceite: "+", ".join(sorted(missing)))

# Must remain generic: no olive-specific history JS.
for forbidden in ["openOlive","renderOliveHistory","olive_oil===","subjectId==='olive_oil'"]:
    if forbidden in app:
        errors.append("historia especializada indebidamente: "+forbidden)

# Generic history gate is occurrence-count based.
for needle in [
    ".filter(x=>x.occurrences.length>=2)",
    "function subjectHistoryItems(subjectId)",
    "function renderHistorySpotlight()"
]:
    if needle not in app:
        errors.append("motor genérico incompleto: "+needle)

years=sorted(x["period"]["start"] for x in olive)
if years[0] > -4000 or years[-1] < 1:
    errors.append("el recorrido no cubre desde prehistoria hasta mundo romano")

if errors:
    print("THIRD LONGITUDINAL HISTORY: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("THIRD LONGITUDINAL HISTORY: PASS")
print("Subject: olive_oil")
print("Occurrences:",len(olive))
print("Span:",years[0],"→",years[-1])
print("No subject-specific JS.")
