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

# Focused Exploration keeps a single category control: the drawer dropdown.
if "setCategoryFilter(e.target.value)" not in app:
    errors.append("dropdown Tipo no usa setCategoryFilter")
if "setCategoryFilter(button.dataset.category)" in app:
    errors.append("reaparecieron chips de categoría redundantes")
if "button.dataset.summaryCategory" in app:
    errors.append("reapareció el resumen de categorías redundante")

# Reset must restore all controls in the filter drawer.
for needle in [
    "s.category='all'",
    "s.evidence='all'",
    "s.occurrenceType='all'",
    "s.certainty='all'",
    "s.precision='all'",
    "s.spatial='all'",
    "s.labelMode='auto'",
]:
    if needle not in app:
        errors.append("reset incompleto: "+needle)

if errors:
    print("FILTER STATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("FILTER STATE: PASS")
for needle in [
    "$('#certaintyFilter').value='all'",
    "$('#precisionFilter').value='all'",
    "$('#spatialFilter').value='all'",
]:
    if needle not in app:
        errors.append("reset UI G3 incompleto: "+needle)

if errors:
    print("FILTER STATE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("Tipo/categoría usa un único estado canónico: s.category")
print("Filtros G3 certainty/precision/spatial: reset canónico PASS")
