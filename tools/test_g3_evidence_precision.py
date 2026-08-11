from pathlib import Path
import json,hashlib,re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
cfg=json.loads((ROOT/"data"/"config.json").read_text(encoding="utf-8"))
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))

errors=[]

if cfg.get("project",{}).get("gate")!="G3_IN_PROGRESS":
    errors.append("config.project.gate no está en G3_IN_PROGRESS")

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

# Filters must be enforced in occurrence visibility.
occ_block=re.search(r"function occVisible\(\).*?\n\}",app,re.S)
if not occ_block:
    errors.append("no se pudo localizar occVisible")
else:
    text=occ_block.group(0)
    for needle in ["matchesEvidenceQualityFilters(o)","matchesSpatialFilter(o)"]:
        if needle not in text:
            errors.append("occVisible no aplica "+needle)

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
