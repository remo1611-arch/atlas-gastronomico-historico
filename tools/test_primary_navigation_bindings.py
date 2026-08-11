from pathlib import Path
from bs4 import BeautifulSoup
import re,sys
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
soup=BeautifulSoup(html,'html.parser')
errors=[]

# Visible controls must exist.
for id_ in ['prevTemporalHitBtn','nextTemporalHitBtn','storyPrevBtn','storyNextBtn','historiesNavBtn','exploreNavBtn','openAtlasFromStoriesBtn']:
    if not soup.find(id=id_): errors.append('control inexistente '+id_)

# And the actual buttons must be bound to the intended action.
expected=[
    "$('#prevTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(-1));",
    "$('#nextTemporalHitBtn').addEventListener('click',()=>stepTemporalHit(1));",
    "$('#storyPrevBtn').addEventListener('click',()=>stepNarrativeScene(-1));",
    "$('#storyNextBtn').addEventListener('click',()=>stepNarrativeScene(1));",
    "$('#openAtlasFromStoriesBtn').addEventListener('click',()=>{withRouteSyncLocked(()=>closeNarrativeStory({scroll:false}));setExperienceView('explore');routeToAtlas();});",
]
for needle in expected:
    if needle not in app: errors.append('binding primario ausente: '+needle)

# The algorithms they invoke must exist.
for needle in ['function stepTemporalHit(direction)','function stepNarrativeScene(direction)','function setExperienceView(view,{scroll=true}={})','function restoreRouteFromLocation({initial=false}={})']:
    if needle not in app: errors.append('acción primaria ausente: '+needle)

# Default product entry is Histories, Atlas secondary.
if "year:1500,view:'histories'" not in app: errors.append('la experiencia por defecto no es Historias')
nav=soup.select_one('nav.experience-nav')
if nav:
    texts=[b.get_text(' ',strip=True) for b in nav.find_all('button')]
    if texts[:2]!=['Historias','Atlas']: errors.append('orden de navegación no es Historias → Atlas')
else: errors.append('experience-nav ausente')

if errors:
    print('PRIMARY NAVIGATION BINDINGS: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)
print('PRIMARY NAVIGATION BINDINGS: PASS')
print('Timeline previous/next and Story previous/next have real click bindings.')
