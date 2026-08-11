from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

S={x["id"]:x for x in load("subjects.json")}
P={x["id"]:x for x in load("places.json")}
O={x["id"]:x for x in load("occurrences.json")}
C={x["id"]:x for x in load("contexts.json")}
D={x["id"]:x for x in load("developments.json")}
SRC={x["id"] for x in load("sources.json")}

required_subjects={"goat","bread_like_flatbread","cheese","forme_of_cury"}
required_occ={
    "occ_goat_ganj_dareh_8200_bce",
    "occ_bread_shubayqa_14400_bp",
    "occ_cheese_kuyavia_sixth_millennium_bce",
    "occ_forme_of_cury_1390"
}
required_contexts={"natufian","richard_ii_royal_household"}
required_dev={"appert_preservation_1809_1810","codex_alimentarius_commission_1963"}
errors=[]

for label,req,actual in [
    ("subjects",required_subjects,set(S)),
    ("occurrences",required_occ,set(O)),
    ("contexts",required_contexts,set(C)),
    ("developments",required_dev,set(D))
]:
    missing=req-actual
    if missing:errors.append(f"{label}: faltan {sorted(missing)}")

for group,lookup in [
    (required_subjects,S),(required_occ,O),(required_contexts,C),(required_dev,D)
]:
    for id_ in group:
        item=lookup.get(id_,{})
        if item.get("status") not in {"reviewed","verified"}:
            errors.append(f"{id_}: la tanda B debe permanecer reviewed/verified")
        if not item.get("sourceRefs"):
            errors.append(f"{id_}: reviewed sin fuentes")
        for r in item.get("sourceRefs",[]):
            if r not in SRC:errors.append(f"{id_}: fuente rota {r}")

# Real model stress cases.
# Ganj Dareh originally entered G2 without a point. G3-D may map it only after
# explicit spatial provenance has been audited.
ganj_point=P.get("ganj_dareh",{}).get("point")
if ganj_point is not None:
    if ganj_point.get("precision")!="reference":
        errors.append("Ganj Dareh: punto posterior debe conservar precision=reference")
    if not ganj_point.get("sourceRefs"):
        errors.append("Ganj Dareh: punto posterior sin procedencia espacial")
    if not ganj_point.get("note"):
        errors.append("Ganj Dareh: punto posterior sin limitación interpretativa")

if P.get("kuyavia_poland",{}).get("point") is not None:
    errors.append("Kuyavia debe seguir sin punto para evitar falsa precisión regional")
point=P.get("shubayqa_1",{}).get("point") or {}
if point.get("precision")!="exact_from_publication":
    errors.append("Shubayqa 1 debe conservar coordenadas publicadas")

bread=O.get("occ_bread_shubayqa_14400_bp",{})
if bread.get("contextRefs")!=["natufian"]:
    errors.append("pan Shubayqa no enlaza el contexto Natufiense")

if errors:
    print("G2 PILOT B: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 PILOT B: PASS")
print("Subjects:",len(required_subjects))
print("Occurrences:",len(required_occ))
print("Contexts:",len(required_contexts))
print("Developments:",len(required_dev))
print("Spatial regression: Ganj Dareh mapped only with audited reference provenance.")
print("Intentional unmapped places: kuyavia_poland, england_richard_ii_reference")
