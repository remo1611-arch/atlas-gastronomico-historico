from pathlib import Path
import json,sys,re

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

subjects={x["id"]:x for x in load("subjects.json")}
occ=load("occurrences.json")
dev=load("developments.json")
tax=load("taxonomy.json")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")

errors=[]
wine=[x for x in occ if x.get("subjectRef")=="wine" and x.get("status") in {"reviewed","verified"}]
wine_dev=[x for x in dev if "wine" in x.get("impactSubjectRefs",[]) and x.get("status") in {"reviewed","verified"}]

if len(wine)<5:
    errors.append(f"wine: se esperaban >=5 occurrences reviewed/verified, hay {len(wine)}")
if not wine_dev:
    errors.append("wine: falta al menos un development relacionado")
if any(x.get("status") in {"seed","deprecated"} for x in wine):
    errors.append("historia wine incluye seed/deprecated")
if "storage" not in tax.get("occurrenceTypes",[]):
    errors.append("taxonomy: falta occurrenceType storage")

required_occ={
    "occ_wine_gadachrili_6000_5800_bce",
    "occ_wine_areni_4000_bce",
    "occ_wine_abydos_3150_bce",
    "occ_wine_tel_kabri_middle_bronze",
    "occ_wine_jerusalem_586_bce",
}
actual={x["id"] for x in wine}
missing=required_occ-actual
if missing:errors.append("wine: faltan hitos "+", ".join(sorted(missing)))

for needle in [
    'id="historyDrawer"','id="historyTimeline"','id="historySummary"','id="historySpotlightList"',
]:
    if needle not in html:errors.append("HTML falta "+needle)

for needle in [
    "function subjectHistoryItems(subjectId)",
    "function renderSubjectHistory(subjectId)",
    "function openHistory(subjectId)",
    "function renderHistorySpotlight()",
    "data-history-occurrence",
    "data-history-development",
    "subjectHistoryBtn",
]:
    if needle not in app:errors.append("JS falta "+needle)

for needle in [".history-panel",".history-timeline",".history-item",".history-card"]:
    if needle not in css:errors.append("CSS falta "+needle)

# Chronology must actually span from Neolithic Georgia to modern development.
years=sorted([x["period"]["start"] for x in wine]+[x["period"]["start"] for x in wine_dev])
if years[0] > -5800:
    errors.append("la historia no alcanza el Neolítico")
if years[-1] < 1800:
    errors.append("la historia no incorpora transformación moderna")

if errors:
    print("SUBJECT HISTORY: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("SUBJECT HISTORY: PASS")
print("Wine occurrences:",len(wine))
print("Wine developments:",len(wine_dev))
print("Span:",years[0],"→",years[-1])
print("Generic UI contract present.")
