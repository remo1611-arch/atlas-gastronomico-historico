from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

S={x["id"]:x for x in load("subjects.json")}
P={x["id"]:x for x in load("places.json")}
O={x["id"]:x for x in load("occurrences.json")}
E={x["id"]:x for x in load("events.json")}
C={x["id"]:x for x in load("contexts.json")}
SRC={x["id"] for x in load("sources.json")}
archive=json.loads((ROOT/"data"/"archive"/"demo_records_pre_g2.json").read_text(encoding="utf-8"))
app=(ROOT/"js/app.js").read_text(encoding="utf-8")

errors=[]

required_occ={
    "occ_maize_xihuatoxtla_early_holocene",
    "occ_maize_san_andres_7300_calbp",
    "occ_maize_paredones_6775_6504_calbp",
    "occ_maize_paredones_consumption_6500_6000_calbp",
    "occ_maize_lower_great_lakes_540_1030",
    "occ_maize_atlantic_africa_16c",
    "occ_maize_cantabrian_adoption_late_16c",
}
missing=required_occ-set(O)
if missing:errors.append("faltan occurrences maíz: "+", ".join(sorted(missing)))

maize=[O[x] for x in required_occ if x in O]
if len(maize)<7:errors.append("historia del maíz insuficiente")
for o in maize:
    if o.get("status") not in {"reviewed","verified"}:
        errors.append(f"{o['id']}: no reviewed/verified")
    if not o.get("sourceRefs"):
        errors.append(f"{o['id']}: sin fuentes")
    for ref in o.get("sourceRefs",[]):
        if ref not in SRC:errors.append(f"{o['id']}: fuente rota {ref}")

africa=O.get("occ_maize_atlantic_africa_16c",{})
if africa.get("certainty")!="medium":
    errors.append("el caso africano debe conservar certeza medium")
if africa.get("occurrenceType")!="adoption":
    errors.append("el caso africano debe ser adoption, no origen/difusión absoluta")

cant=O.get("occ_maize_cantabrian_adoption_late_16c",{})
if cant.get("period",{}).get("precision")!="circa":
    errors.append("Cantábrico debe conservar cronología aproximada")

event=E.get("event_maize_transatlantic_exchange_1492_1700")
if not event:
    errors.append("falta evento canónico del maíz")
else:
    if event.get("status")!="reviewed":errors.append("evento canónico debe entrar reviewed")
    if event.get("subjectRefs")!=["maize"]:errors.append("evento debe ser específico de maize")
    if len(event.get("sourceRefs",[]))<2:errors.append("evento transatlántico necesita fuentes múltiples")

old={x["id"]:x for x in archive.get("events",[])}.get("event_columbian_exchange_demo")
if not old or old.get("status")!="deprecated" or old.get("supersededBy")!="event_maize_transatlantic_exchange_1492_1700":
    errors.append("migración del evento demo incorrecta")

if C.get("princess_point_complex",{}).get("status")!="reviewed":
    errors.append("falta contexto Princess Point reviewed")

for pid in [
    "san_andres_tabasco","paredones_peru","lower_great_lakes_region",
    "cantabrian_region","tropical_atlantic_africa_coasts"
]:
    if pid not in P:errors.append(f"falta place {pid}")

for needle in [
    "const events=s.events",
    "kind:'event'",
    "data-history-event",
    "EVENT_LABELS",
]:
    if needle not in app:errors.append("motor historia sin soporte evento: "+needle)

if errors:
    print("G2 PILOT C MAIZE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 PILOT C MAIZE: PASS")
print("Maize occurrences:",len(maize))
print("Canonical events: 1")
print("Uncertainty case preserved: Atlantic Africa = medium")
