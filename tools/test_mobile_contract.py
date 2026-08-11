from pathlib import Path
from bs4 import BeautifulSoup
import json,sys

ROOT=Path(__file__).resolve().parents[1]
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
config=json.loads((ROOT/"data/config.json").read_text(encoding="utf-8"))
soup=BeautifulSoup(html,"html.parser")
version=config["project"]["version"]
errors=[]

checks={
    "page overflow guard":"html,body",
    "shrink defense":"min-width:0",
    "focused mobile breakpoint":"@media(max-width:600px)",
    "experience nav CSS":"experience-nav",
    "text overflow defense":"overflow-wrap:anywhere",
    "narrow-phone breakpoint":"@media(max-width:380px)",
}
for label,needle in checks.items():
    if needle not in css:
        errors.append(f"{label}: falta {needle}")

build=soup.find("meta",attrs={"name":"atlas-build"})
if not build or build.get("content")!=version:
    errors.append("build marker incorrecto")

for id_ in ["layersBtn","mapCoverageStatus","exploreView","historiesView","exploreNavBtn","historiesNavBtn"]:
    if not soup.find(id=id_):
        errors.append("HTML móvil falta "+id_)

if soup.select_one(".museum-rail"):
    errors.append("legacy museum rail reapareció")

if "body{" not in css or "overflow-x:hidden" not in css:
    errors.append("body no bloquea overflow horizontal")

if errors:
    print("MOBILE CONTRACT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("MOBILE CONTRACT: PASS")
print("Version:",version)
print("Responsive guards:",len(checks)+8)
