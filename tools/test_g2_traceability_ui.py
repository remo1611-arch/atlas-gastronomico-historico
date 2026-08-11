from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
errors=[]

for needle in [
    "function statusMeta(status)",
    "function sourceListHTML",
    "function verificationHTML",
    "Fuentes del elemento",
    "Fuentes del registro",
    "renderTransformationPreview()",
    "status==='deprecated'",
]:
    if needle not in app:errors.append("app falta: "+needle)

for needle in [".status-badge.reviewed",".source-list",".development-card",".verification-box"]:
    if needle not in css:errors.append("css falta: "+needle)

if errors:
    print("G2 TRACEABILITY UI: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 TRACEABILITY UI: PASS")
