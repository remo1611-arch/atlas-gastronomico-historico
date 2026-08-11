from pathlib import Path
import json,hashlib,re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
cfg=json.loads((ROOT/"data"/"config.json").read_text(encoding="utf-8"))
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))

errors=[]

if cfg.get("project",{}).get("gate") not in {"G3_IN_PROGRESS","G3_CLOSED"}:
    errors.append("config.project.gate incompatible con G3")

# G2 contract must remain byte-identical for schemas/taxonomy.
for rel,expected in fingerprint["files"].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected:
        errors.append(f"contrato G2 modificado sin ADR/migración: {rel}")

for id_ in [
    "certaintyFilter","precisionFilter","spatialFilter",
    "evidenceLensSummary","evidenceReadingSection","evidenceReadingDetail",
    "unmappedRecordsPanel"
]:
    if f'id="{id_}"' not in html:
        errors.append("HTML G3 falta "+id_)

for needle in [
    "function matchesEvidenceQualityFilters(item)",
    "function matchesSpatialFilter(o)",
    "function evidenceReadingHTML(o,pl)",
    "function sourceComparisonHTML(refs=[])",
    "function renderEvidenceLens(list)",
    "PRECISION_HELP",
    "CERTAINTY_HELP",
    "STATUS_HELP",
]:
    if needle not in app:
        errors.append("JS G3 falta "+needle)

# Filters must be enforced in occurrence visibility, directly or through the shared explorer predicate.
if "function occurrenceMatchesExplorerFilters(o)" not in app:
    errors.append("falta predicate compartido de filtros de occurrence")
else:
    start=app.find("function occurrenceMatchesExplorerFilters(o)")
    end=app.find("function occMapVisible()",start)
    block=app[start:end]
    for needle in ["matchesEvidenceQualityFilters(o)","matchesSpatialFilter(o)"]:
        if needle not in block:
            errors.append("predicate compartido no aplica "+needle)
if "return occMapVisible().filter(o=>active(o.period,s.year));" not in app:
    errors.append("occVisible no conserva el filtro temporal estricto")

# No opaque score system.
for forbidden in ["evidenceScore","qualityScore","certaintyScore","starRating"]:
    if forbidden in app:
        errors.append("score opaco no permitido: "+forbidden)

if errors:
    print("G3 EVIDENCE & PRECISION: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G3 EVIDENCE & PRECISION: PASS")
print("G2 schema/taxonomy fingerprint preserved:",len(fingerprint["files"]),"files")
print("Filters: certainty / precision / spatial")
print("No opaque evidence score.")
