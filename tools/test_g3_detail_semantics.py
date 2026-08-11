from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
html=(ROOT/"index.html").read_text(encoding="utf-8")
errors=[]

for needle in [
    "RESOLUCIÓN CRONOLÓGICA",
    "CERTEZA HISTÓRICA",
    "ESTADO EDITORIAL",
    "PRECISIÓN ESPACIAL",
    "BASE DOCUMENTAL",
    "No confundir:",
]:
    if needle not in app:
        errors.append("ficha semántica falta: "+needle)

if "reviewed/verified" not in html:
    errors.append("filtro no explica independencia editorial")

if errors:
    print("G3 DETAIL SEMANTICS: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("G3 DETAIL SEMANTICS: PASS")
print("Editorial status / certainty / chronology / spatial precision separated.")
