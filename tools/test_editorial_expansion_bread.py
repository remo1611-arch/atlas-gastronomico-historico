from pathlib import Path
import json,hashlib,sys

ROOT=Path(__file__).resolve().parents[1]
def load(n): return json.loads((ROOT/"data"/(n+".json")).read_text(encoding="utf-8"))

S={x["id"]:x for x in load("subjects")}
P={x["id"]:x for x in load("places")}
O={x["id"]:x for x in load("occurrences")}
D={x["id"]:x for x in load("developments")}
SRC={x["id"]:x for x in load("sources")}
fingerprint=json.loads((ROOT/"docs"/"G2_CONTRACT_FINGERPRINT.json").read_text(encoding="utf-8"))
errors=[]

sid="bread_like_flatbread"
bread=S.get(sid)
if not bread:
    errors.append("subject estable bread_like_flatbread desapareció")
else:
    if bread.get("name")!="Pan":
        errors.append("la etiqueta pública debe ser Pan")
    if bread.get("status") not in {"reviewed","verified"}:
        errors.append("Pan no es publicable")

bread_occ=[x for x in O.values() if x.get("subjectRef")==sid]
if len(bread_occ)!=7:
    errors.append(f"Historia del pan: 7 occurrences esperadas, hay {len(bread_occ)}")

required={
    "occ_bread_shubayqa_14400_bp",
    "occ_bread_catalhoyuk_7100_6400_bce",
    "occ_bread_parkhaus_opera_3176_3153_bce",
    "occ_bread_kulluoba_3200_3000_bce",
    "occ_bread_ain_sukhna_moulds_2050_1900_bce",
    "occ_bread_saint_memmie_mid_1c",
    "occ_bread_assize_england_mid_13c",
}
missing=required-{x["id"] for x in bread_occ}
if missing:
    errors.append("faltan hitos pan: "+", ".join(sorted(missing)))

# Heterogeneous history, not a sequence of invented "firsts".
types={x.get("occurrenceType") for x in bread_occ}
evidence={x.get("evidenceType") for x in bread_occ}
for expected in {"archaeological_presence","production","regulation"}:
    if expected not in types:
        errors.append("falta occurrenceType en historia del pan: "+expected)
for expected in {"archaeobotanical","material_culture","legal"}:
    if expected not in evidence:
        errors.append("falta evidenceType en historia del pan: "+expected)

for x in bread_occ:
    if x.get("status") not in {"reviewed","verified"}:
        errors.append(x["id"]+": estado no publicable")
    if not x.get("sourceRefs"):
        errors.append(x["id"]+": sin fuentes")
    for ref in x.get("sourceRefs",[]):
        if ref not in SRC:
            errors.append(x["id"]+": sourceRef roto "+ref)
    summary=(x.get("summary") or "").lower()
    if "primer pan de la historia" in summary or "origen del pan" in summary:
        errors.append(x["id"]+": lenguaje de origen absoluto no permitido")

dev=D.get("chorleywood_bread_process_1961")
if not dev:
    errors.append("falta transformación Chorleywood")
else:
    if sid not in dev.get("impactSubjectRefs",[]):
        errors.append("Chorleywood no impacta subject pan")
    if dev.get("type")!="industrial_process":
        errors.append("Chorleywood debe ser industrial_process")
    if dev.get("period",{}).get("start")!=1961:
        errors.append("Chorleywood debe conservar 1961")
    for ref in dev.get("sourceRefs",[]):
        if ref not in SRC:
            errors.append("Chorleywood sourceRef roto "+ref)

cat=P.get("catalhoyuk_east")
if not cat or not cat.get("point"):
    errors.append("Çatalhöyük debe tener punto UNESCO")
elif cat["point"].get("precision")!="exact_from_publication":
    errors.append("Çatalhöyük: precisión espacial incorrecta")

# Expansion must not mutate the frozen structural contract.
for rel,expected in fingerprint["files"].items():
    actual=hashlib.sha256((ROOT/rel).read_bytes()).hexdigest()
    if actual!=expected:
        errors.append("fingerprint G2 roto durante expansión: "+rel)

if errors:
    print("EDITORIAL EXPANSION · BREAD: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

years=sorted((x["period"]["start"],x["period"]["end"]) for x in bread_occ)
print("EDITORIAL EXPANSION · BREAD: PASS")
print("Bread occurrences:",len(bread_occ))
print("Occurrence types:",", ".join(sorted(types)))
print("Evidence types:",", ".join(sorted(evidence)))
print("History span:",years[0][0],"→ 1961")
print("G2 frozen contract: 9/9")
