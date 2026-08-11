from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
config=json.loads((ROOT/"data/config.json").read_text(encoding="utf-8"))

errors=[]

# Old parallel timeline/playback must be genuinely removed.
legacy_html=[
    'id="yearRange"',
    'id="playBtn"',
    'id="playStepSelect"',
    'data-step=',
    'class="timeline-controls"',
    'class="range-shell"',
]
for needle in legacy_html:
    if needle in html:
        errors.append("HTML legacy presente: "+needle)

legacy_js=[
    "playStep","s.playing","s.timer","startTimer","stopTimer","shiftYear",
    "$('#yearRange')","data-step","playBtn","playStepSelect"
]
for needle in legacy_js:
    if needle in app:
        errors.append("JS legacy presente: "+needle)

for key in ("playStep","playStepOptions"):
    if key in config.get("timeline",{}):
        errors.append("config legacy presente: "+key)

legacy_css=[
    ".timeline-controls",".play-btn",".range-shell",".range-glow","#yearRange"
]
for needle in legacy_css:
    if needle in css:
        errors.append("CSS legacy presente: "+needle)

# Unified timeline must be the actual time selector.
for needle in [
    "function temporalYearFromClientX(clientX,offsetPx=0)",
    "function beginTemporalDrag(event)",
    "function moveTemporalDrag(event)",
    "function endTemporalDrag(event)",
    "function handleTemporalCursorKey(event)",
    "setPointerCapture",
    "requestAnimationFrame",
]:
    if needle not in app:
        errors.append("selector unificado incompleto: "+needle)

# Accessible handle / touch semantics.
for needle in [
    'id="temporalCursor"',
    'role="slider"',
    'tabindex="0"',
    'aria-valuemin="-12000"',
    'aria-valuemax="2026"',
    'id="temporalNavigatorHint"',
]:
    if needle not in html:
        errors.append("accesibilidad falta: "+needle)

if "touch-action:none" not in css:
    errors.append("falta touch-action:none para arrastre")

# Keep historical jumps and direct year, but only hit-based stepping.
for needle in ['data-jump-year="1492"','id="goYearBtn"','id="prevTemporalHitBtn"','id="nextTemporalHitBtn"']:
    if needle not in html:
        errors.append("navegación útil falta: "+needle)

if "stepTemporalHit(-1)" not in app or "stepTemporalHit(1)" not in app:
    errors.append("anterior/siguiente no navega por hitos")

if errors:
    print("UNIFIED TIMELINE: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("UNIFIED TIMELINE: PASS")
print("Legacy year slider/playback removed.")
print("Single semantic rail = click + drag + keyboard + historical hits.")
