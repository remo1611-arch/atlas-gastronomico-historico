from pathlib import Path
import json,sys,re

ROOT=Path(__file__).resolve().parents[1]
places=json.loads((ROOT/"data/places.json").read_text(encoding="utf-8"))
occ=json.loads((ROOT/"data/occurrences.json").read_text(encoding="utf-8"))
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")

errors=[]
by_id={p["id"]:p for p in places}
unmapped=[]

for o in occ:
    p=by_id.get(o.get("placeRef"))
    point=(p or {}).get("point")
    if not point:
        unmapped.append(o["id"])

if 'id="mapCoverageStatus"' not in html:
    errors.append("falta mapCoverageStatus en HTML")
if "function occurrencesWithoutMapPoint" not in app:
    errors.append("falta detector de registros sin punto")
if "function renderMapCoverage" not in app:
    errors.append("falta render de cobertura cartográfica")
if 'id="unmappedRecordsPanel"' not in html:
    errors.append("falta panel accionable de registros sin punto")
if "data-unmapped-occurrence" not in app:
    errors.append("los registros sin punto no tienen acceso directo desde el mapa")
if "coverage-chip" not in app:
    errors.append("falta señal compacta de cobertura")
if "inventar un centroide cartográfico" not in html:
    errors.append("Acerca del atlas no conserva la política de no inventar coordenadas")
if "console.warn(`[Atlas] Registro sin punto cartográfico:" not in app:
    errors.append("falta warning diagnóstico de registro sin punto")

if errors:
    print("MAP COVERAGE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("MAP COVERAGE: PASS")
print("Registros actuales sin punto:",len(unmapped))
if unmapped:
    print("IDs:",", ".join(unmapped))
