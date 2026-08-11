from pathlib import Path
from bs4 import BeautifulSoup
import re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
soup=BeautifulSoup(html,"html.parser")
errors=[]

# Exactly two primary experiences.
for id_ in ["exploreView","historiesView","exploreNavBtn","historiesNavBtn"]:
    if not soup.find(id=id_):
        errors.append("falta experiencia principal: "+id_)

explore=soup.find(id="exploreView")
histories=soup.find(id="historiesView")
if explore:
    for id_ in ["temporalNavigator","mapSection","occurrenceList"]:
        if not explore.find(id=id_):
            errors.append("Explorar no contiene "+id_)
if histories and not histories.find(id="historySpotlightList"):
    errors.append("Historias no contiene historySpotlightList")

# G3 diagnostics must remain available but not permanently on the main surface.
lens=soup.find(id="evidenceLensSummary")
drawer=soup.find(id="filterDrawer")
if not lens or not drawer or lens not in drawer.descendants:
    errors.append("Evidence Lens no fue movida a Filtros")

# Processes are progressive disclosure, not a standalone home section.
changes=soup.find(id="changesDisclosure")
if not changes:
    errors.append("falta disclosure Procesos y cambios")
else:
    for id_ in ["transformationPreview","eventList","eventWindowSelect"]:
        if not changes.find(id=id_):
            errors.append("Procesos y cambios no contiene "+id_)

# Legacy dashboard sections must be structurally gone.
legacy_html=[
    'class="museum-rail"',
    'id="categorySummary"',
    'class="museum-story"',
    'class="transformation-band',
    'class="events-section',
    'class="method-note"',
    'id="evidenceLensFilterBtn"',
    'id="openFiltersHeroBtn"',
    'id="categoryLegend"',
]
for needle in legacy_html:
    if needle in html:
        errors.append("legacy HTML presente: "+needle)

legacy_js=[
    "function renderCategorySummary(",
    "function renderContext(list)",
    "openFiltersHeroBtn",
    "evidenceLensFilterBtn",
    "categoryLegend",
]
for needle in legacy_js:
    if needle in app:
        errors.append("legacy JS presente: "+needle)

legacy_css=[
    ".museum-rail",".category-summary",".summary-card",".museum-story",
    ".context-highlights",".context-card",".events-section",".method-note",
    ".transformation-band",".transform-head",".category-legend",".legend-pill",
]
for needle in legacy_css:
    if needle in css:
        errors.append("legacy CSS presente: "+needle)

# Overview is deliberately concise.
for needle in [
    "function evidenceCardNode(o)",
    "const primary=sorted.slice(0,4)",
    "const rest=sorted.slice(4)",
    "className='evidence-card focused'",
    "function setExperienceView(view,{scroll=true}={})",
]:
    if needle not in app:
        errors.append("focused behavior falta: "+needle)

# Secondary utilities must be collapsed.
if not soup.select_one("details.period-jumps"):
    errors.append("Periodos no usa progressive disclosure")
if not soup.select_one("details.exact-year-tools"):
    errors.append("Ir al año no usa progressive disclosure")

# Methodology remains accessible.
about=soup.find(id="aboutDialog")
if not about or "Criterio histórico y editorial" not in about.get_text(" ",strip=True):
    errors.append("metodología no está accesible en Acerca del atlas")

if errors:
    print("FOCUSED EXPLORATION: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("FOCUSED EXPLORATION: PASS")
print("Primary experiences: Historias / Atlas")
print("Explore hierarchy: Tiempo -> Mapa -> En esta fecha")
print("Legacy dashboard sections removed.")
