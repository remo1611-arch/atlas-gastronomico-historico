from pathlib import Path
import json,hashlib,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n): return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

places={x["id"]:x for x in load("places")}
occ={x["id"]:x for x in load("occurrences")}
sources={x["id"]:x for x in load("sources")}
audit=json.loads((ROOT/"docs"/"G3_SPATIAL_AUDIT.json").read_text(encoding="utf-8"))
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))

errors=[]
decisions=audit.get("decisions",[])
refs=[d.get("occurrenceRef") for d in decisions]

if audit.get("baselineUnmappedOccurrences")!=18:
    errors.append("baseline spatial audit != 18")
if len(decisions)!=18 or len(set(refs))!=18:
    errors.append("la auditoría debe contener 18 occurrenceRefs únicos")

counts={}
for d in decisions:
    counts[d.get("class")]=counts.get(d.get("class"),0)+1

expected={"point_documented":9,"broad_region":5,"specific_site_unresolved":4}
if counts!=expected:
    errors.append(f"clasificación espacial {counts} != {expected}")

for d in decisions:
    oid=d.get("occurrenceRef")
    pid=d.get("placeRef")
    o=occ.get(oid)
    pl=places.get(pid)
    if not o:
        errors.append(f"occurrence auditada inexistente: {oid}")
        continue
    if o.get("placeRef")!=pid:
        errors.append(f"{oid}: placeRef auditado no coincide con runtime")
    if not pl:
        errors.append(f"place auditado inexistente: {pid}")
        continue

    if d.get("decision")=="mapped":
        point=pl.get("point")
        if not point:
            errors.append(f"{pid}: decisión mapped sin point")
            continue
        if point.get("precision") not in {"reference","exact_from_publication","approximate"}:
            errors.append(f"{pid}: precision espacial no canónica")
        if not point.get("sourceRefs"):
            errors.append(f"{pid}: point sin sourceRefs")
        if not point.get("note"):
            errors.append(f"{pid}: point sin note")
        for ref in point.get("sourceRefs",[]):
            if ref not in sources:
                errors.append(f"{pid}: point sourceRef roto {ref}")
        if set(d.get("sourceRefs",[]))-set(point.get("sourceRefs",[])):
            errors.append(f"{pid}: fuentes de auditoría no están en point.sourceRefs")
    elif d.get("decision")=="remain_unmapped":
        if pl.get("point"):
            errors.append(f"{pid}: remain_unmapped pero tiene point")
        if not d.get("reason"):
            errors.append(f"{oid}: decisión sin reason")
    else:
        errors.append(f"{oid}: decision desconocida {d.get('decision')}")

# Broad regions are explicitly protected against fake centroids.
for d in decisions:
    if d.get("class")=="broad_region" and places[d["placeRef"]].get("point"):
        errors.append(f"centroide indebido en región: {d['placeRef']}")

runtime_mapped=sum(1 for o in occ.values() if places[o["placeRef"]].get("point"))
runtime_unmapped=len(occ)-runtime_mapped
if (runtime_mapped,runtime_unmapped)!=(15,9):
    errors.append(f"cobertura runtime {(runtime_mapped,runtime_unmapped)} != (15,9)")

# G2 schemas/taxonomy remain frozen.
for rel,expected_hash in fingerprint["files"].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected_hash:
        errors.append("G2 fingerprint roto: "+rel)

if errors:
    print("G3 SPATIAL AUDIT: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("G3 SPATIAL AUDIT: PASS")
print("Decisions: 18")
print("point_documented: 9 · broad_region: 5 · specific_site_unresolved: 4")
print("Runtime coverage: 15 mapped · 9 unmapped")
print("G2 fingerprint: 9/9")
