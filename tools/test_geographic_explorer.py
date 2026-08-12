from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
occ=json.loads((ROOT/"data/occurrences.json").read_text(encoding="utf-8"))
places={x["id"]:x for x in json.loads((ROOT/"data/places.json").read_text(encoding="utf-8"))}
subjects={x["id"]:x for x in json.loads((ROOT/"data/subjects.json").read_text(encoding="utf-8"))}

errors=[]

# Contract: map and exact-date list are intentionally different.
for needle in [
    "function occurrenceMatchesExplorerFilters(o)",
    "function occMapVisible()",
    "function occVisible()",
    "const dateList=occVisible();",
    "const mapList=occMapVisible();",
    "renderMapOverview(mapList,dateList);",
    "renderMapCoverage(mapList);",
    "renderMarkers(mapList);",
]:
    if needle not in app:
        errors.append("contrato mapa global ausente: "+needle)

# The strict active-year constraint belongs only to occVisible.
map_start=app.find("function occMapVisible(){")
map_end=app.find("function occVisible(){",map_start)
if map_start<0 or map_end<0:
    errors.append("no se pudo aislar occMapVisible")
elif "active(o.period,s.year)" in app[map_start:map_end]:
    errors.append("occMapVisible sigue filtrando por año exacto")

visible_start=app.find("function occVisible(){")
visible_end=app.find("function occurrencesWithoutMapPoint",visible_start)
if visible_start<0 or visible_end<0 or "active(o.period,s.year)" not in app[visible_start:visible_end]:
    errors.append("occVisible debe conservar semántica estricta de fecha")

# Search must produce visible result UI and zero-state.
for needle in [
    'id="mapSearchResults"',
    "function renderMapSearchResults()",
    "No hay resultados en el corpus",
    "data-map-result-id",
]:
    target=html if needle.startswith('id=') else app
    if needle not in target:
        errors.append("búsqueda cartográfica incompleta: "+needle)

# Geography must synchronize with time/detail and support regional focus/reset.
for needle in [
    "function focusMapOccurrence(o)",
    "setYear(targetYear);",
    "selectOccurrence(o.id,true);",
    "fitMapToOccurrences([o],{mode:'selection'});",
    "function mapBoundsForOccurrences(list)",
    "function resetMapView(",
    'id="mapResetViewBtn"',
]:
    target=html if needle.startswith('id=') else app
    if needle not in target:
        errors.append("navegación geográfica incompleta: "+needle)

# Marker semantics.
for needle in [
    "temporal-current",
    "temporal-context",
    "occurrenceHeadline(o)",
]:
    if needle not in app:
        errors.append("marcadores sin semántica temporal: "+needle)

# Corpus diagnostics must remain valid as editorial content grows.
public=[o for o in occ if o.get("status") in {"reviewed","verified"}]
mapped=[o for o in public if places[o["placeRef"]].get("point")]
at_1500=[o for o in public if o["period"]["start"]<=1500<=o["period"]["end"]]
mapped_1500=[o for o in at_1500 if places[o["placeRef"]].get("point")]

if not public:
    errors.append("el corpus público de occurrences está vacío")
if not mapped:
    errors.append("el Atlas no dispone de ninguna occurrence cartografiable")

wine=[o for o in public if subjects[o["subjectRef"]]["name"]=="Vino"]
wine_mapped=[o for o in wine if places[o["placeRef"]].get("point")]
if len(wine)<5 or len(wine_mapped)<5:
    errors.append(f"se perdió el núcleo geográfico de Vino: {len(wine)} / {len(wine_mapped)} mapped")

if errors:
    print("GEOGRAPHIC EXPLORER: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("GEOGRAPHIC EXPLORER: PASS")
print(f"Corpus: {len(public)} public occurrences · {len(mapped)} mapped globally.")
print(f"At 1500: {len(at_1500)} active occurrences · {len(mapped_1500)} mapped.")
print(f"Wine geographic core: {len(wine)} occurrences · {len(wine_mapped)} mapped.")
print("Map is global; current date remains a visual highlight and side-panel filter.")
