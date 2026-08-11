from pathlib import Path
from html.parser import HTMLParser
import re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
errors=[]

class P(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if d.get("id"):self.ids.append(d["id"])

p=P();p.feed(html)
if len(p.ids)!=len(set(p.ids)):
    errors.append("IDs HTML duplicadas")

refs=set(re.findall(r"\$\(['\"]#([A-Za-z0-9_-]+)['\"]\)",app))
missing=sorted(refs-set(p.ids))
if missing:errors.append("IDs usadas por JS inexistentes: "+", ".join(missing))

required={
"heroYear","heroEra","yearDisplay","yearMagnitude","yearEra","goYearBtn",
"occurrenceCount","subjectCount","placeCount","eventCount",
"searchInput","subjectTypeFilter","evidenceFilter","occurrenceTypeFilter","labelMode",
"resetFiltersBtn","worldMap","basemapLayer","occurrenceLayer","occurrenceList",
"categorySummary","eventList","filterDrawer","layersDrawer","detailDrawer","subjectDetail","occurrenceDetail","contextLayer","developmentLayer","layerGastronomy","layerContexts","layerDevelopments","layerSafety","mapCoverageStatus","historyDrawer","historyTitle","historySubtitle","historySummary","historyTimeline","temporalNavigator","temporalRail","temporalDensity","temporalVerified","temporalEvents","temporalDevelopments","temporalCursor","temporalFocus","prevTemporalHitBtn","nextTemporalHitBtn","temporalMinLabel","temporalNavigatorHint","temporalMaxLabel"
}
mr=sorted(required-set(p.ids))
if mr:errors.append("Faltan IDs requeridas: "+", ".join(mr))

if errors:
    print("UI CONTRACT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("UI CONTRACT: PASS")
print("IDs:",len(p.ids),"· refs JS:",len(refs))
