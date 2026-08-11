from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/'js/app.js').read_text(encoding='utf-8')
errors=[]

for needle in [
    "history.replaceState({aghRoute:true},'','#historias')",
    "window.addEventListener('popstate',()=>restoreRouteFromLocation())",
    "function parseExperienceRoute(hash=location.hash)",
    "function applyExperienceRoute(route,{initial=false}={})",
    "function routeToStory(storyId,sceneIndex,{replace=false}={})",
    "function routeToAtlas({kind=null,ref=null,year=null,replace=false}={})",
]:
    if needle not in app: errors.append('routing incompleto: '+needle)

# Avoid double route application on history traversal.
if "window.addEventListener('hashchange',()=>restoreRouteFromLocation())" in app:
    errors.append('popstate + hashchange duplicarían la restauración de ruta')

for needle in [
    "const filtersChanged=revealOccurrenceForDirectAccess(item);",
    "function revealOccurrenceForDirectAccess(o)",
    "if(s.search){s.search='';$('#searchInput').value='';changed=true;}",
    "if(s.evidence!=='all'){s.evidence='all';$('#evidenceFilter').value='all';changed=true;}",
    "if(!s.layers.gastronomy)",
]:
    if needle not in app: errors.append('evidencia narrativa puede quedar oculta: '+needle)

for needle in [
    "const entry=temporalEntryForRoute(itemRef.kind,item.id);",
    "focusTemporalItem(entry,true);",
    "routeToAtlas({kind:itemRef.kind,ref:item.id});",
]:
    if needle not in app: errors.append('development/event no queda enfocado en Atlas: '+needle)

for needle in [
    "routeToStory(storyId,s.storyScene);",
    "routeToStory(story.id,s.storyScene);",
    "routeToAtlas({kind:'occurrence',ref:o.id});",
]:
    if needle not in app: errors.append('round-trip sin estado recuperable: '+needle)

if errors:
    print('STORY ↔ ATLAS ROUNDTRIP: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)

print('STORY ↔ ATLAS ROUNDTRIP: PASS')
print('Browser history · direct evidence reveal · development focus protected.')
