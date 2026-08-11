from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
errors=[]
for needle in [
    "function debounce(fn,wait=160)",
    "const debouncedSearch=debounce",
    "debouncedSearch(e.target.value)",
    "debouncedSearch.cancel()",
]:
    if needle not in app:
        errors.append("falta: "+needle)
if errors:
    print("SEARCH DEBOUNCE: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)
print("SEARCH DEBOUNCE: PASS · 160 ms")
