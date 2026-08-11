from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
places={x["id"]:x for x in json.loads((ROOT/"data"/"places.json").read_text(encoding="utf-8"))}
occ=json.loads((ROOT/"data"/"occurrences.json").read_text(encoding="utf-8"))
audit=json.loads((ROOT/"docs"/"G3_SPATIAL_AUDIT.json").read_text(encoding="utf-8"))

errors=[]
unmapped=[
    o for o in occ
    if not places.get(o.get("placeRef"),{}).get("point")
]
audit_unmapped={
    d["occurrenceRef"] for d in audit.get("decisions",[])
    if d.get("decision")=="remain_unmapped"
}
runtime_unmapped_ids={o["id"] for o in unmapped}

# The nine G3-D cases must remain unmapped unless a future explicit re-audit
# supersedes that decision. New editorial records may legitimately add more.
missing_baseline=sorted(audit_unmapped-runtime_unmapped_ids)
if missing_baseline:
    errors.append("casos G3-D dejaron de estar unmapped sin re-auditoría: "+", ".join(missing_baseline))
expected=len(audit_unmapped)

for needle in [
    'id="unmappedRecordsPanel"',
    "data-unmapped-occurrence",
    "function matchesSpatialFilter(o)",
]:
    target=html if needle.startswith('id=') else app
    if needle not in target:
        errors.append("acceso sin punto incompleto: "+needle)

if "inventar un centroide cartográfico" not in html:
    errors.append("la política espacial ya no está accesible en Acerca del atlas")

if "spatialFilter" not in html:
    errors.append("falta filtro de cobertura cartográfica")

if errors:
    print("G3 UNMAPPED ACCESS: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G3 UNMAPPED ACCESS: PASS")
print("Unmapped public occurrences:",len(unmapped))
print("G3-D baseline still unmapped:",expected)
print("Additional post-G3 unmapped:",len(unmapped)-expected)
print("All remain accessible without invented coordinates.")
