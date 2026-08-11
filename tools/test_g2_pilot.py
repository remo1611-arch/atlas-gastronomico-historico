from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n):return json.loads((ROOT/"data"/n).read_text(encoding="utf-8"))

subjects=load("subjects.json")
archive=json.loads((ROOT/"data"/"archive"/"demo_records_pre_g2.json").read_text(encoding="utf-8"))
places=load("places.json")
occ=load("occurrences.json")
contexts=load("contexts.json")
dev=load("developments.json")
sources=load("sources.json")

errors=[]
SRC={x["id"] for x in sources}
S={x["id"]:x for x in subjects}
O={x["id"]:x for x in occ}
C={x["id"]:x for x in contexts}
D={x["id"]:x for x in dev}

required_subjects={"wine","maize","garum"}
required_occ={
    "occ_wine_gadachrili_6000_5800_bce",
    "occ_maize_xihuatoxtla_early_holocene",
    "occ_garum_pompeii_first_century"
}
required_contexts={"shulaveri_shomutepe","roman_empire_west_reference"}
required_dev={
    "pasteurization_wine_1863_1865",
    "perkins_mechanical_refrigeration_1834",
    "monitor_top_refrigerator_1927",
    "haccp_development_1960s"
}

for label,required,actual in [
    ("subjects",required_subjects,set(S)),
    ("occurrences",required_occ,set(O)),
    ("contexts",required_contexts,set(C)),
    ("developments",required_dev,set(D)),
]:
    missing=required-actual
    if missing:errors.append(f"{label}: faltan {sorted(missing)}")

for collection,label in [(subjects,"subject"),(places,"place"),(occ,"occ"),(contexts,"context"),(dev,"development")]:
    for x in collection:
        if x.get("status") in {"reviewed","verified"}:
            refs=x.get("sourceRefs",[])
            if not refs:errors.append(f"{label}:{x['id']}: reviewed sin fuentes")
            for r in refs:
                if r not in SRC:errors.append(f"{label}:{x['id']}: fuente rota {r}")

archived_subjects={x["id"]:x for x in archive.get("subjects",[])}
for old,new in [("wine_demo","wine"),("maize_demo","maize"),("garum_demo","garum")]:
    item=archived_subjects.get(old)
    if not item or item.get("status")!="deprecated" or item.get("supersededBy")!=new:
        errors.append(f"migración subject archivada incorrecta: {old}")

# No G2 reviewed occurrence may claim 'origin' as occurrence type.
for oid in required_occ:
    item=O.get(oid,{})
    if item.get("occurrenceType")=="origin":
        errors.append(f"{oid}: usa origen simplista")

if errors:
    print("G2 PILOT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G2 PILOT: PASS")
print("Reviewed subjects:",sum(x.get("status")=="reviewed" for x in subjects))
print("Reviewed occurrences:",sum(x.get("status")=="reviewed" for x in occ))
print("Reviewed contexts:",sum(x.get("status")=="reviewed" for x in contexts))
print("Reviewed developments:",sum(x.get("status")=="reviewed" for x in dev))
print("Sources:",len(sources))
