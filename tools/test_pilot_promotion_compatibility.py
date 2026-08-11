from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
b=(ROOT/"tools"/"test_g2_pilot_b.py").read_text(encoding="utf-8")
d=(ROOT/"tools"/"test_g2_pilot_d_nixtamalization.py").read_text(encoding="utf-8")
errors=[]

if 'not in {"reviewed","verified"}' not in b:
    errors.append("G2-B no admite promociones posteriores a verified")
if d.count("not in {'reviewed','verified'}")<2:
    errors.append("G2-D no admite promociones posteriores a verified")

if errors:
    print("PILOT PROMOTION COMPATIBILITY: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("PILOT PROMOTION COMPATIBILITY: PASS")
