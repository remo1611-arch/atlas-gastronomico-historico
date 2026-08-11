from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
sources=json.loads((ROOT/"data"/"sources.json").read_text(encoding="utf-8"))
errors=[]

m=re.search(r"const SOURCE_TYPE_LABELS=\{(.*?)\n\};",app,re.S)
if not m:
    errors.append("SOURCE_TYPE_LABELS no localizado")
    mapped=set()
else:
    mapped=set(re.findall(r"\n\s*([A-Za-z0-9_]+):",m.group(1)))

used={x.get("sourceType") for x in sources if x.get("sourceType")}
missing=sorted(used-mapped)
if missing:
    errors.append("tipos de fuente sin etiqueta G3: "+", ".join(missing))

for needle in [
    "function sourceProfile(refs=[])",
    "function sourceProfileText(refs=[])",
    "function sourceComparisonHTML(refs=[])",
    "<details class=\"source-comparison\">",
]:
    if needle not in app:
        errors.append("comparación de fuentes incompleta: "+needle)

# Compare is descriptive, not a ranking.
for forbidden in ["sourceScore","rankSources","bestSource","sourceRating"]:
    if forbidden in app:
        errors.append("ranking opaco de fuentes no permitido: "+forbidden)

if errors:
    print("G3 SOURCE COMPARISON: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G3 SOURCE COMPARISON: PASS")
print("Source types covered:",len(used))
print("Comparison is descriptive, not ranked.")
