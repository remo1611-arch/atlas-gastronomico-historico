from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
places={x["id"]:x for x in json.loads((ROOT/"data"/"places.json").read_text(encoding="utf-8"))}
occ=json.loads((ROOT/"data"/"occurrences.json").read_text(encoding="utf-8"))

errors=[]
unmapped=[
    o for o in occ
    if not places.get(o.get("placeRef"),{}).get("point")
]
if len(unmapped)!=18:
    errors.append(f"baseline de registros sin punto cambió: {len(unmapped)} != 18")

for needle in [
    'id="unmappedRecordsPanel"',
    "data-unmapped-occurrence",
    "No se inventan centroides",
    "function matchesSpatialFilter(o)",
]:
    target=html if needle.startswith('id=') else app
    if needle not in target:
        errors.append("acceso sin punto incompleto: "+needle)

if "spatialFilter" not in html:
    errors.append("falta filtro de cobertura cartográfica")

if errors:
    print("G3 UNMAPPED ACCESS: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G3 UNMAPPED ACCESS: PASS")
print("Unmapped public occurrences:",len(unmapped))
print("All remain accessible without invented coordinates.")
