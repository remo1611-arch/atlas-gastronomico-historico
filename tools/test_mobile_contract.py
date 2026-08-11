from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
config=json.loads((ROOT/"data/config.json").read_text(encoding="utf-8"))
version=config["project"]["version"]
errors=[]

checks={
    "page overflow guard":"html,body",
    "shrink defense":"min-width:0",
    "map actions 3 columns":"grid-template-columns:repeat(3,minmax(0,1fr))",
    "mobile category grid":"grid-template-columns:1fr 1fr",
    "text overflow defense":"overflow-wrap:anywhere",
    "narrow-phone breakpoint":"@media(max-width:380px)",
}

for label,needle in checks.items():
    if needle not in css:
        errors.append(f"{label}: falta {needle}")

for label,needle in {
    "build marker":f'meta name="atlas-build" content="{version}"',
    "layers button":'id="layersBtn"',
    "museum rail":'class="museum-rail"',
    "map coverage":'id="mapCoverageStatus"',
}.items():
    if needle not in html:
        errors.append(f"{label}: falta {needle}")

if "body{" not in css or "overflow-x:hidden" not in css:
    errors.append("body no bloquea overflow horizontal")

if errors:
    print("MOBILE CONTRACT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("MOBILE CONTRACT: PASS")
print("Version:",version)
print("Responsive guards:",len(checks)+4)
