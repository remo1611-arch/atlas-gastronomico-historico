from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
errors=[]

def load(name):
    try:return json.loads((ROOT/"data"/name).read_text(encoding="utf-8"))
    except Exception as e:
        errors.append(f"{name}: {e}")
        return []

subjects=load("subjects.json")
places=load("places.json")
occ=load("occurrences.json")
events=load("events.json")
rels=load("relationships.json")
contexts=load("contexts.json")
developments=load("developments.json")
sources=load("sources.json")
stories=load("stories.json")
glossary=load("glossary.json")
tax=load("taxonomy.json")
config=load("config.json")

def ids(items,label):
    arr=[x.get("id") for x in items]
    dup=sorted({x for x in arr if arr.count(x)>1})
    if dup:errors.append(f"{label}: IDs duplicadas {dup}")
    return set(arr)

S=ids(subjects,"subjects")
P=ids(places,"places")
O=ids(occ,"occurrences")
E=ids(events,"events")
R=ids(rels,"relationships")
C=ids(contexts,"contexts")
D=ids(developments,"developments")
SRC=ids(sources,"sources")
STORY=ids(stories,"stories")
GLOSS=ids(glossary,"glossary")

def period(o,label):
    p=o.get("period",{})
    a,b=p.get("start"),p.get("end")
    if not isinstance(a,int) or not isinstance(b,int):
        errors.append(f"{label}: período inválido");return
    if a==0 or b==0:errors.append(f"{label}: año 0 no permitido")
    if a>b:errors.append(f"{label}: start > end")

def source_refs(o,label,required_for_review=True):
    refs=o.get("sourceRefs",[])
    for ref in refs:
        if ref not in SRC:errors.append(f"{label}: sourceRef roto {ref}")
    if required_for_review and o.get("status") in {"reviewed","verified"} and not refs:
        errors.append(f"{label}: reviewed/verified sin fuentes")

    if o.get("status")=="verified":
        verification=o.get("verification")
        if not verification:
            errors.append(f"{label}: verified sin metadatos verification")
            return
        indep=verification.get("independentSourceRefs",[])
        if not indep:
            errors.append(f"{label}: verified sin independentSourceRefs")
        for ref in indep:
            if ref not in SRC:
                errors.append(f"{label}: verification sourceRef roto {ref}")
            if ref not in refs:
                errors.append(f"{label}: verification sourceRef no incluido en sourceRefs {ref}")
        if not verification.get("verifiedOn"):
            errors.append(f"{label}: verified sin verifiedOn")
        if not verification.get("method"):
            errors.append(f"{label}: verified sin método")
        if not verification.get("note"):
            errors.append(f"{label}: verified sin nota")

for s in subjects:
    source_refs(s,f"subject:{s.get('id')}")
    if s.get("status")=="deprecated" and not s.get("supersededBy"):
        errors.append(f"subject:{s.get('id')}: deprecated sin supersededBy")
    if s.get("supersededBy") and s.get("supersededBy") not in S:
        errors.append(f"subject:{s.get('id')}: supersededBy roto")

for p in places:
    label=f"place:{p.get('id')}"
    source_refs(p,label)
    pt=p.get("point")
    if pt:
        if not(-90<=pt.get("lat",999)<=90 and -180<=pt.get("lon",999)<=180):
            errors.append(f"{label}: coordenadas inválidas")
        for ref in pt.get("sourceRefs",[]):
            if ref not in SRC:errors.append(f"{label}: point sourceRef roto {ref}")
        if p.get("status") in {"reviewed","verified"} and pt.get("precision") in {"approximate","reference"} and not pt.get("sourceRefs"):
            errors.append(f"{label}: punto reviewed aproximado/referencia sin fuente cartográfica")

for o in occ:
    label=f"occ:{o.get('id')}"
    period(o,label);source_refs(o,label)
    if o.get("subjectRef") not in S:errors.append(f"{label}: subjectRef roto")
    if o.get("placeRef") not in P:errors.append(f"{label}: placeRef roto")
    for ref in o.get("contextRefs",[]):
        if ref not in C:errors.append(f"{label}: contextRef roto {ref}")
    for ref in o.get("developmentRefs",[]):
        if ref not in D:errors.append(f"{label}: developmentRef roto {ref}")
    if o.get("status")=="deprecated" and not o.get("supersededBy"):
        errors.append(f"{label}: deprecated sin supersededBy")
    if o.get("supersededBy") and o.get("supersededBy") not in O:
        errors.append(f"{label}: supersededBy roto")
    dispute=o.get("dispute")
    if o.get("certainty")=="disputed":
        if not dispute:
            errors.append(f"{label}: certainty disputed sin dispute")
        else:
            if not dispute.get("question"):
                errors.append(f"{label}: dispute sin question")
            positions=dispute.get("positions",[])
            if len(positions)<2:
                errors.append(f"{label}: dispute necesita >=2 posiciones")
            for pos in positions:
                refs=pos.get("sourceRefs",[])
                if not refs:
                    errors.append(f"{label}: posición {pos.get('id')} sin fuentes")
                for ref in refs:
                    if ref not in SRC:
                        errors.append(f"{label}: dispute sourceRef roto {ref}")
                    if ref not in o.get("sourceRefs",[]):
                        errors.append(f"{label}: dispute sourceRef no incluido en sourceRefs {ref}")
    elif dispute:
        errors.append(f"{label}: dispute presente sin certainty disputed")

for e in events:
    label=f"event:{e.get('id')}"
    period(e,label);source_refs(e,label)
    for ref in e.get("subjectRefs",[]):
        if ref not in S:errors.append(f"{label}: subjectRef roto {ref}")
    for ref in e.get("placeRefs",[]):
        if ref not in P:errors.append(f"{label}: placeRef roto {ref}")
    for ref in e.get("contextRefs",[]):
        if ref not in C:errors.append(f"{label}: contextRef roto {ref}")
    for ref in e.get("developmentRefs",[]):
        if ref not in D:errors.append(f"{label}: developmentRef roto {ref}")
    if e.get("status")=="deprecated" and not e.get("supersededBy"):
        errors.append(f"{label}: deprecated sin supersededBy")
    if e.get("supersededBy") and e.get("supersededBy") not in E:
        errors.append(f"{label}: supersededBy roto")

for r in rels:
    label=f"rel:{r.get('id')}"
    period(r,label);source_refs(r,label)
    if r.get("from") not in S or r.get("to") not in S:
        errors.append(f"{label}: subject roto")
    if r.get("supersededBy") and r.get("supersededBy") not in R:
        errors.append(f"{label}: supersededBy roto")

for c in contexts:
    label=f"context:{c.get('id')}"
    period(c,label);source_refs(c,label)
    for ref in c.get("placeRefs",[]):
        if ref not in P:errors.append(f"{label}: placeRef roto {ref}")

for d in developments:
    label=f"development:{d.get('id')}"
    period(d,label);source_refs(d,label)
    for ref in d.get("placeRefs",[]):
        if ref not in P:errors.append(f"{label}: placeRef roto {ref}")
    for ref in d.get("contextRefs",[]):
        if ref not in C:errors.append(f"{label}: contextRef roto {ref}")
    for ref in d.get("impactSubjectRefs",[]):
        if ref not in S:errors.append(f"{label}: impactSubjectRef roto {ref}")

for story in stories:
    label=f"story:{story.get('id')}"
    source_refs(story,label,required_for_review=True)
    if story.get("subjectRef") not in S:
        errors.append(f"{label}: subjectRef roto {story.get('subjectRef')}")
    scene_ids=[]
    for scene in story.get("scenes",[]):
        sid=scene.get("id")
        if sid in scene_ids: errors.append(f"{label}: scene id duplicado {sid}")
        scene_ids.append(sid)
        slabel=f"{label}/scene:{sid}"
        for ref in scene.get("sourceRefs",[]):
            if ref not in SRC: errors.append(f"{slabel}: sourceRef roto {ref}")
            if ref not in story.get("sourceRefs",[]): errors.append(f"{slabel}: fuente no incluida en story.sourceRefs {ref}")
        for ref in scene.get("glossaryRefs",[]):
            if ref not in GLOSS: errors.append(f"{slabel}: glossaryRef roto {ref}")
        for item in scene.get("itemRefs",[]):
            kind=item.get("kind");ref=item.get("ref")
            target={"occurrence":O,"event":E,"development":D}.get(kind)
            if target is None: errors.append(f"{slabel}: item kind desconocido {kind}")
            elif ref not in target: errors.append(f"{slabel}: itemRef roto {kind}:{ref}")
    if story.get("status") in {"reviewed","verified"} and len(story.get("scenes",[]))<2:
        errors.append(f"{label}: historia pública necesita >=2 escenas")

for g in glossary:
    label=f"glossary:{g.get('id')}"
    if not g.get("term") or not g.get("definition"):
        errors.append(f"{label}: término/definición incompletos")

for src in sources:
    if not src.get("title") or not src.get("publisher"):
        errors.append(f"source:{src.get('id')}: metadatos mínimos incompletos")
    if src.get("url") and not str(src["url"]).startswith(("https://","http://")):
        errors.append(f"source:{src.get('id')}: URL no HTTP(S)")

required=[
    "index.html",".nojekyll","css/app.css","js/core.js","js/app.js",
    "data/config.json","data/taxonomy.json","data/subjects.json","data/places.json",
    "data/occurrences.json","data/events.json","data/relationships.json",
    "data/contexts.json","data/developments.json","data/sources.json","data/stories.json","data/glossary.json",
    "data/basemap/world_110m.geojson","data/archive/demo_records_pre_g2.json",
    "schemas/context.schema.json","schemas/development.schema.json","schemas/story.schema.json","schemas/glossary.schema.json",
    "docs/PROJECT_STATE.md","docs/CANONICAL_RULES.md","docs/DATA_MODEL.md",
    "docs/ROADMAP.md","docs/G2_PILOT.md","docs/G2_FINAL_GATE.md","docs/SEED_ARCHIVE.md","docs/NARRATIVE_MUSEUM_INTEGRATION.md"
]
for x in required:
    if not(ROOT/x).exists():errors.append("Falta: "+x)

html=(ROOT/"index.html").read_text(encoding="utf-8")
version=config.get("project",{}).get("version")
if version:
    if f'app.css?v={version}' not in html:errors.append("index: CSS sin cache busting de versión")
    if f'app.js?v={version}' not in html:errors.append("index: JS sin cache busting de versión")
    app=(ROOT/"js/app.js").read_text(encoding="utf-8")
    if f"core.js?v={version}" not in app:errors.append("app: core.js sin cache busting de versión")
    for asset in [
        "config.json","taxonomy.json","subjects.json","places.json","occurrences.json",
        "events.json","relationships.json","contexts.json","developments.json","sources.json","stories.json","glossary.json",
        "world_110m.geojson"
    ]:
        if f"{asset}?v={version}" not in app:
            errors.append(f"app: {asset} sin cache busting de versión")

if errors:
    print("VALIDACIÓN: FAIL")
    for x in errors:print("ERROR:",x)
    sys.exit(1)

reviewed_counts={
    "subjects":sum(x.get("status") in {"reviewed","verified"} for x in subjects),
    "places":sum(x.get("status") in {"reviewed","verified"} for x in places),
    "occurrences":sum(x.get("status") in {"reviewed","verified"} for x in occ),
    "contexts":sum(x.get("status") in {"reviewed","verified"} for x in contexts),
    "developments":sum(x.get("status") in {"reviewed","verified"} for x in developments),
}

unmapped=0
place_by_id={p.get("id"):p for p in places}
for o in occ:
    if o.get("status")=="deprecated":continue
    pl=place_by_id.get(o.get("placeRef"))
    if not (pl or {}).get("point"):
        unmapped+=1

print("VALIDACIÓN: PASS")
print("Subjects:",len(subjects),"· reviewed/verified:",reviewed_counts["subjects"])
print("Places:",len(places),"· reviewed/verified:",reviewed_counts["places"])
print("Occurrences:",len(occ),"· reviewed/verified:",reviewed_counts["occurrences"])
print("Events:",len(events))
print("Relationships:",len(rels))
print("Contexts:",len(contexts),"· reviewed/verified:",reviewed_counts["contexts"])
print("Developments:",len(developments),"· reviewed/verified:",reviewed_counts["developments"])
print("Sources:",len(sources))
print("Stories:",len(stories),"· scenes:",sum(len(x.get("scenes",[])) for x in stories))
print("Glossary:",len(glossary))
print("Unmapped active/nondeprecated occurrences:",unmapped)
