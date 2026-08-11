from pathlib import Path
import json,sys,re

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")

def load(n):return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

runtime={
    "subjects":load("subjects"),
    "places":load("places"),
    "occurrences":load("occurrences"),
    "events":load("events"),
    "relationships":load("relationships"),
    "contexts":load("contexts"),
    "developments":load("developments"),
}
archive=json.loads((ROOT/"data"/"archive"/"demo_records_pre_g2.json").read_text(encoding="utf-8"))

errors=[]
allowed={"reviewed","verified"}

for name,items in runtime.items():
    bad=[x.get("id") for x in items if x.get("status") not in allowed]
    if bad:
        errors.append(f"{name}: runtime contiene estados no públicos {bad}")

if "showSeed" in app or "seedToggle" in app or 'id="seedToggle"' in html:
    errors.append("la experiencia pública conserva control/estado seed")

if "function isPublicStatus(status)" not in app:
    errors.append("falta gate central isPublicStatus")
if "if(!isPublicStatus(o.status)) return false;" not in app:
    errors.append("occVisible no aplica gate público")

archived=sum(len(archive.get(name,[])) for name in ("subjects","places","occurrences","events","relationships"))
if archived<1:
    errors.append("archivo demo vacío")

for name in ("subjects","places","occurrences","events","relationships"):
    for item in archive.get(name,[]):
        if item.get("status") not in {"seed","deprecated"}:
            errors.append(f"archive {name}:{item.get('id')} con estado inesperado")

if errors:
    print("PUBLIC STATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("PUBLIC STATE: PASS")
print("Runtime records: reviewed/verified only.")
print("Archived demo records:",archived)
print("Public seed toggle/state: absent.")
