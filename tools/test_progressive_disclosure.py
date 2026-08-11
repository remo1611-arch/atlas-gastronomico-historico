from pathlib import Path
from bs4 import BeautifulSoup
import sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
soup=BeautifulSoup(html,"html.parser")
errors=[]

# Technical detail stays available on demand.
expected_details={
    "period-jumps":"Periodos",
    "exact-year-tools":"Ir a un año concreto",
    "context-disclosure":"Procesos y cambios",
    "filter-insight":"Resumen de la selección",
    "about-method":"Criterio histórico y editorial",
}
for cls,label in expected_details.items():
    node=soup.select_one("details."+cls)
    if not node:
        errors.append("falta disclosure "+cls)
    else:
        summary=node.find("summary")
        if not summary or label not in summary.get_text(" ",strip=True):
            errors.append(f"{cls}: summary inesperado")

# Evidence list should not dump an arbitrary long corpus into the home view.
if "const primary=sorted.slice(0,4)" not in app:
    errors.append("lista principal no limita resultados")
if "Ver ${rest.length}" not in app:
    errors.append("resultados secundarios no tienen disclosure")

# Map uncertainty is compact, while exact policy lives in About.
if "coverage-chip" not in app:
    errors.append("cobertura cartográfica no es compacta")
if "inventar un centroide cartográfico" not in html:
    errors.append("política espacial no está disponible bajo demanda")

if errors:
    print("PROGRESSIVE DISCLOSURE: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("PROGRESSIVE DISCLOSURE: PASS")
print("Technical depth preserved without permanent dashboard noise.")
