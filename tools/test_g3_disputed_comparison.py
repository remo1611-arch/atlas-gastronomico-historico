from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
occ=json.loads((ROOT/"data"/"occurrences.json").read_text(encoding="utf-8"))
sources={x["id"] for x in json.loads((ROOT/"data"/"sources.json").read_text(encoding="utf-8"))}
errors=[]

disputed=[x for x in occ if x.get("certainty")=="disputed"]
if not disputed:
    errors.append("no hay caso disputed runtime")

for item in disputed:
    dispute=item.get("dispute") or {}
    positions=dispute.get("positions") or []
    if len(positions)<2:
        errors.append(item["id"]+": menos de dos posiciones")
    all_refs=set(item.get("sourceRefs",[]))
    for position in positions:
        refs=set(position.get("sourceRefs",[]))
        if not refs:
            errors.append(item["id"]+":"+position.get("id","?")+": posición sin fuentes")
        if not refs.issubset(all_refs):
            errors.append(item["id"]+":"+position.get("id","?")+": fuentes fuera del registro")
        if not refs.issubset(sources):
            errors.append(item["id"]+":"+position.get("id","?")+": sourceRefs rotos")

for needle in [
    "function disputedSourceSummary(item)",
    "sourceProfileText(position.sourceRefs||[])",
    "sourceComparisonHTML(position.sourceRefs||[])",
    "SIN CONSENSO EDITORIAL IMPUESTO",
    "Cómo leer este debate",
    "no significa que el Atlas haya resuelto",
]:
    if needle not in app:
        errors.append("UI disputed falta: "+needle)

for forbidden in [
    "winningPosition","preferredPosition","disputeWinner",
    "resolveDispute","consensusScore"
]:
    if forbidden in app:
        errors.append("resolución automática prohibida: "+forbidden)

if errors:
    print("G3 DISPUTED COMPARISON: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("G3 DISPUTED COMPARISON: PASS")
print("Disputed records:",len(disputed))
print("Positions remain source-backed and non-ranked.")
