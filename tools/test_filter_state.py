from pathlib import Path
import re,sys

ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
errors=[]

# The old independent subjectType state must be gone.
if re.search(r"\bsubjectType\s*:",app):
    errors.append("s.subjectType sigue presente en el estado")
if "subject.type!==s.subjectType" in app:
    errors.append("occVisible conserva el filtro duplicado subjectType")
if "subject.type!==s.category" not in app:
    errors.append("falta el filtro canónico único s.category")

# Chips, summary and dropdown must converge on setCategoryFilter.
if "setCategoryFilter(e.target.value)" not in app:
    errors.append("dropdown Tipo no usa setCategoryFilter")
if "setCategoryFilter(button.dataset.category)" not in app:
    errors.append("chips de categoría no usan setCategoryFilter")
if "button.dataset.summaryCategory" not in app or "setCategoryFilter(" not in app:
    errors.append("resumen de categorías no usa estado unificado")

# Reset must restore all controls in the filter drawer.
for needle in [
    "s.category='all'",
    "s.evidence='all'",
    "s.occurrenceType='all'",
    "s.labelMode='auto'",
]:
    if needle not in app:
        errors.append("reset incompleto: "+needle)

if errors:
    print("FILTER STATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("FILTER STATE: PASS")
print("Tipo/categoría usa un único estado canónico: s.category")
