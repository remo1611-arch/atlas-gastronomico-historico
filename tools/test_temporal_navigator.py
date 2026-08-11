from pathlib import Path
import json,sys,re

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")

errors=[]

html_ids=[
    "temporalNavigator","temporalRail","temporalDensity","temporalVerified",
    "temporalEvents","temporalDevelopments","temporalCursor","temporalFocus",
    "prevTemporalHitBtn","nextTemporalHitBtn"
]
for id_ in html_ids:
    if f'id="{id_}"' not in html:
        errors.append("HTML falta "+id_)

for needle in [
    "function temporalCorpusItems()",
    "function temporalBins(items)",
    "function renderTemporalNavigator()",
    "function renderTemporalRanges(items,kind,containerId)",
    "function renderTemporalVerified(items)",
    "function stepTemporalHit(direction)",
    "o.status!=='reviewed'&&o.status!=='verified'",
    "e.status!=='reviewed'&&e.status!=='verified'",
    "d.status!=='reviewed'&&d.status!=='verified'",
]:
    if needle not in app:
        errors.append("JS falta: "+needle)

for needle in [
    ".temporal-navigator",".temporal-rail",".density-bin",".temporal-range",
    ".event-range",".development-range",".temporal-cursor",".temporal-focus",
    "@media(prefers-reduced-motion:reduce)"
]:
    if needle not in css:
        errors.append("CSS falta: "+needle)

# Explicitly protect against seed noise.
if "status==='seed'" in re.search(r"function temporalCorpusItems\(\).*?return out\.sort",app,re.S).group(0):
    errors.append("temporalCorpusItems incluye lógica seed inesperada")

# There must be adaptive density bin counts for mobile/tablet/desktop.
for count in ["38","68","120"]:
    if count not in app:
        errors.append("faltan bins adaptativos "+count)

# Invisible/touch targets must be larger than the visual marks on mobile.
if "width:36px" not in css or "height:36px" not in css:
    errors.append("marcas móviles sin target táctil ampliado")

if errors:
    print("TEMPORAL NAVIGATOR: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("TEMPORAL NAVIGATOR: PASS")
print("HTML IDs:",len(html_ids))
print("Density bins: 38 / 68 / 120")
print("Semantic lanes: evidence density / verified / events / developments")
print("Seed/deprecated excluded from navigator.")
