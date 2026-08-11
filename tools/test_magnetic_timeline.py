from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/"index.html").read_text(encoding="utf-8")
app=(ROOT/"js/app.js").read_text(encoding="utf-8")
css=(ROOT/"css/app.css").read_text(encoding="utf-8")
errors=[]
for needle in ["function temporalSnapCandidate(entry,targetYear)","function nearestTemporalHit(targetYear,items=temporalCorpusItems())","function compareTemporalCandidates(a,b)","function previewMagneticCandidate(targetYear,items=temporalCorpusItems())","function markMagneticCandidate(candidate,items)","focusTemporalItem(candidate.entry,true,candidate.snapYear)","setExactYear(targetYear)"]:
    if needle not in app: errors.append("JS falta: "+needle)
for needle in ["if(entry.kind==='event'||entry.kind==='development')","temporalSnapCandidate(entry,targetYear)?.snapYear"]:
    if needle not in app: errors.append("range click incompleto: "+needle)
for needle in ["function setExactYear(year)","button.addEventListener('click',()=>setExactYear(Number(button.dataset.jumpYear)))","$('#goYearBtn').addEventListener('click',()=>setExactYear("]:
    if needle not in app: errors.append("navegación exacta rota: "+needle)
if "function commitTemporalYear" in app: errors.append("dead code: commitTemporalYear sigue presente")
for needle in [".magnetic-candidate",".temporal-focus.magnetic-preview",".temporal-rail.has-magnetic-candidate"]:
    if needle not in css: errors.append("CSS magnético falta: "+needle)
if "Toca para ir al hito más cercano" not in html: errors.append("la ayuda pública no explica la semántica magnética")
if errors:
    print("MAGNETIC TIMELINE CONTRACT: FAIL")
    [print("ERROR:",e) for e in errors]
    sys.exit(1)
print("MAGNETIC TIMELINE CONTRACT: PASS")
print("Tap/release snaps to nearest visible historical hit.")
print("Exact year remains a separate explicit action.")
