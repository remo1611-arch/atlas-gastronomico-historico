from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

S={x["id"]:x for x in load("subjects")}
P={x["id"]:x for x in load("places")}
O={x["id"]:x for x in load("occurrences")}
E={x["id"]:x for x in load("events")}
R={x["id"]:x for x in load("relationships")}
C={x["id"]:x for x in load("contexts")}
D={x["id"]:x for x in load("developments")}
SRC={x["id"] for x in load("sources")}
config=load("config")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")

errors=[]
public={"reviewed","verified"}

if config.get("project",{}).get("gate") not in {"G2_CLOSED","G3_IN_PROGRESS"}:
    errors.append("estado de proyecto incompatible con G2 ya cerrado")

# Runtime corpus must be production-clean.
for label,items in [
    ("subjects",S.values()),("places",P.values()),("occurrences",O.values()),
    ("events",E.values()),("relationships",R.values()),("contexts",C.values()),
    ("developments",D.values())
]:
    bad=[x["id"] for x in items if x.get("status") not in public]
    if bad:errors.append(f"{label}: estados no públicos {bad}")

# Every public historical claim has sources.
for label,items in [
    ("subjects",S.values()),("places",P.values()),("occurrences",O.values()),
    ("events",E.values()),("relationships",R.values()),("contexts",C.values()),
    ("developments",D.values())
]:
    for x in items:
        refs=x.get("sourceRefs",[])
        if not refs:errors.append(f"{label}:{x['id']}: sin sourceRefs")
        for ref in refs:
            if ref not in SRC:errors.append(f"{label}:{x['id']}: sourceRef roto {ref}")

# Occurrences cannot point back into archived/demo entities.
for o in O.values():
    if o.get("subjectRef") not in S:errors.append(f"{o['id']}: subjectRef fuera de runtime")
    if o.get("placeRef") not in P:errors.append(f"{o['id']}: placeRef fuera de runtime")

# Three independent longitudinal histories.
for sid,min_occ in [("wine",5),("maize",7),("olive_oil",3)]:
    count=sum(o.get("subjectRef")==sid for o in O.values())
    if count<min_occ:errors.append(f"{sid}: recorrido insuficiente {count}<{min_occ}")

# Required maturity features.
if not any(o.get("certainty")=="disputed" and o.get("dispute",{}).get("positions") for o in O.values()):
    errors.append("falta caso disputed estructurado")
rel=R.get("rel_maize_uses_nixtamalization_maya_classic")
if not rel or rel.get("status")!="verified":
    errors.append("nixtamalización no tiene relación técnica verified")
if "black_pepper" not in S:errors.append("falta especia canónica")
if "olive_oil" not in S:errors.append("falta grasa/aceite canónico")

# UX foundation required at G2 closure.
for needle in [
    "function nearestTemporalHit(",
    "function subjectHistoryItems(subjectId)",
    "function isPublicStatus(status)"
]:
    if needle not in app:errors.append("UX/engine gate falta: "+needle)

# Verified gate.
for label,items in [
    ("subject",S.values()),("occurrence",O.values()),("event",E.values()),
    ("relationship",R.values()),("context",C.values()),("development",D.values())
]:
    for x in items:
        if x.get("status")=="verified" and not x.get("verification"):
            errors.append(f"{label}:{x['id']}: verified sin verification")

if errors:
    print("G2 FINAL GATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 FINAL GATE: PASS")
print("Runtime corpus is reviewed/verified only.")
print("Longitudinal histories: wine / maize / olive_oil.")
print("Disputed + technique + oil + spice gates satisfied.")
