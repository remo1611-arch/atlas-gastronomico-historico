from pathlib import Path
import json,hashlib,re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))

errors=[]

for rel,expected in fingerprint["files"].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected:
        errors.append("G2 fingerprint roto: "+rel)

if 'id="temporalPrecisionWindow"' not in html:
    errors.append("falta ventana de precisión temporal")

for needle in [
    "function periodSpanYears(period)",
    "function periodSemantics(item)",
    "function periodProfileHTML(item)",
    "function historyGapLabel(previous,current)",
    "function historyGapHTML(previous,current)",
    "function temporalPeriodPercent(period)",
    "function renderTemporalPrecisionWindow(entry)",
    "renderTemporalPrecisionWindow(focused)",
]:
    if needle not in app:
        errors.append("JS cronológico falta: "+needle)

for needle in [
    ".temporal-precision-window",
    ".period-profile",
    ".history-gap",
    ".history-precision.circa",
]:
    if needle not in css:
        errors.append("CSS cronológico falta: "+needle)

# Equal card spacing must be explicitly qualified.
if app.count("historyGapHTML(items[index-1],entry)")<4:
    errors.append("no todos los tipos de hito explicitan la distancia temporal")

# No proportional DOM positioning of history cards that would make long gaps unusable.
for forbidden in ["history-card-position","historyProportionalTop","absoluteHistoryTimeScale"]:
    if forbidden in app:
        errors.append("layout histórico proporcional no autorizado: "+forbidden)

if errors:
    print("G3 CHRONOLOGY SEMANTICS: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("G3 CHRONOLOGY SEMANTICS: PASS")
print("G2 fingerprint preserved:",len(fingerprint["files"]),"files")
print("Focused temporal interval + explicit history gaps enabled.")
