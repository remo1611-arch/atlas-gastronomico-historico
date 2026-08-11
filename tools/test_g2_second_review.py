from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

collections={}
for name in ["subjects","occurrences","relationships"]:
    collections[name]={x["id"]:x for x in load(name+".json")}

required=[
    ("subjects","goat"),
    ("occurrences","occ_goat_ganj_dareh_8200_bce"),
    ("subjects","forme_of_cury"),
    ("occurrences","occ_forme_of_cury_1390"),
    ("subjects","nixtamalization"),
    ("relationships","rel_maize_uses_nixtamalization_maya_classic"),
]
errors=[]

for group,id_ in required:
    item=collections[group].get(id_)
    if not item:
        errors.append(f"falta {group}:{id_}")
        continue
    if item.get("status")!="verified":
        errors.append(f"{group}:{id_}: no promoted to verified")
        continue
    verification=item.get("verification") or {}
    refs=verification.get("independentSourceRefs",[])
    if not refs:
        errors.append(f"{group}:{id_}: verification sin fuentes")
    for ref in refs:
        if ref not in item.get("sourceRefs",[]):
            errors.append(f"{group}:{id_}: verification ref no está en sourceRefs")

# Cases deliberately NOT promoted.
for group,id_ in [
    ("subjects","bread_like_flatbread"),
    ("subjects","cheese"),
    ("subjects","chicken"),
]:
    item=collections[group].get(id_)
    if item and item.get("status")=="verified":
        errors.append(f"{group}:{id_}: promoción indebida; debía permanecer reviewed")

if errors:
    print("G2 SECOND REVIEW B/C/D: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 SECOND REVIEW B/C/D: PASS")
print("Promotions:",len(required))
print("Conservative non-promotions preserved.")
