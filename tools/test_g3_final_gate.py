from pathlib import Path
import json,hashlib,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n): return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

cfg=load("config")
S=load("subjects")
P=load("places")
O=load("occurrences")
E=load("events")
R=load("relationships")
C=load("contexts")
D=load("developments")
SRC=load("sources")
app=(ROOT/"js"/"app.js").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
audit=json.loads((ROOT/"docs"/"G3_SPATIAL_AUDIT.json").read_text(encoding="utf-8"))
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))

errors=[]

if cfg.get("project",{}).get("gate")!="G3_CLOSED":
    errors.append("config.project.gate != G3_CLOSED")

# Historical corpus stays stable; only sources and place points grew in G3-D.
expected_counts={
    "subjects":11,"places":24,"occurrences":24,"events":1,
    "relationships":1,"contexts":7,"developments":6,"sources":75
}
actual_counts={
    "subjects":len(S),"places":len(P),"occurrences":len(O),"events":len(E),
    "relationships":len(R),"contexts":len(C),"developments":len(D),"sources":len(SRC)
}
if actual_counts!=expected_counts:
    errors.append(f"conteos de cierre G3 {actual_counts} != {expected_counts}")

for rel,expected_hash in fingerprint["files"].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected_hash:
        errors.append("contrato G2 modificado: "+rel)

# G3-A
for needle in [
    "function matchesEvidenceQualityFilters(item)",
    "function matchesSpatialFilter(o)",
    "function evidenceReadingHTML(o,pl)",
    "function sourceComparisonHTML(refs=[])",
]:
    if needle not in app: errors.append("G3-A falta: "+needle)

# G3-B
for needle in [
    "function periodSemantics(item)",
    "function historyGapHTML(previous,current)",
    "function disputedSourceSummary(item)",
    "SIN CONSENSO EDITORIAL IMPUESTO",
]:
    if needle not in app: errors.append("G3-B falta: "+needle)

# G3-C
for needle in [
    'id="exploreNavBtn"',
    'id="historiesNavBtn"',
    'id="exploreView"',
    'id="historiesView"',
]:
    if needle not in html: errors.append("G3-C navegación falta: "+needle)
for needle in [
    "function setExperienceView(",
]:
    if needle not in app: errors.append("G3-C lógica de navegación falta: "+needle)
for forbidden in [
    'id="contextReadSection"',
    'id="visibleWorldSection"',
]:
    if forbidden in html: errors.append("Focused Exploration regresó bloque legacy: "+forbidden)

# G3-D
if len(audit.get("decisions",[]))!=18:
    errors.append("G3-D spatial audit incompleta")
pby={x["id"]:x for x in P}
mapped=sum(1 for o in O if pby[o["placeRef"]].get("point"))
if mapped!=15:
    errors.append(f"G3-D mapped occurrences {mapped} != 15")

# Anti-regressions.
for forbidden in [
    "evidenceScore","qualityScore","certaintyScore","starRating",
    "winningPosition","preferredPosition","disputeWinner","consensusScore"
]:
    if forbidden in app:
        errors.append("semántica prohibida: "+forbidden)

broad={d["placeRef"] for d in audit["decisions"] if d.get("class")=="broad_region"}
for pid in broad:
    if pby[pid].get("point"):
        errors.append("región con centroide indebido: "+pid)

for required in [
    ROOT/"docs"/"G3_SPATIAL_AUDIT.md",
    ROOT/"docs"/"G3_SPATIAL_AUDIT.json",
    ROOT/"docs"/"G3_FINAL_GATE.md",
]:
    if not required.exists():
        errors.append("documento de cierre ausente: "+required.name)

if errors:
    print("G3 FINAL GATE: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("G3 FINAL GATE: PASS")
print("G3-A/B/C/D complete.")
print("Corpus: 24 occurrences · 15 mapped · 9 unmapped.")
print("Sources:",len(SRC))
print("G2 frozen contract: 9/9.")
