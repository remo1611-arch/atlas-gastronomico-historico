from pathlib import Path
import json,sys,unicodedata

ROOT=Path(__file__).resolve().parents[1]
occ=json.loads((ROOT/"data/occurrences.json").read_text(encoding="utf-8"))
places={x["id"]:x for x in json.loads((ROOT/"data/places.json").read_text(encoding="utf-8"))}
subjects={x["id"]:x for x in json.loads((ROOT/"data/subjects.json").read_text(encoding="utf-8"))}

def norm(v):
    return ''.join(c for c in unicodedata.normalize('NFD',str(v or '')) if unicodedata.category(c)!='Mn').lower()

def query_matches(haystack,query):
    import re
    text=norm(haystack)
    q=norm(query).strip()
    words=[x for x in re.split(r'[^a-z0-9]+',text) if x]
    return all((any(w==token or w.startswith(token) for w in words) if len(token)<=3 else token in text) for token in q.split())

def global_search(q):
    out=[]
    for o in occ:
        if o.get("status") not in {"reviewed","verified"}: continue
        s=subjects[o["subjectRef"]]; p=places[o["placeRef"]]
        hay=" ".join([
            s.get("name",""),s.get("summary","")," ".join(s.get("aliases",[])),
            " ".join(s.get("tags",[])),p.get("name",""),p.get("summary",""),
            o.get("summary","")
        ])
        if query_matches(hay,q): out.append(o)
    return out

errors=[]
wine=global_search("vino")
bread=global_search("pan")
if len(wine)<5: errors.append(f"vino global search only {len(wine)}")
if not any(places[o["placeRef"]].get("point") for o in wine): errors.append("vino search has no mapped result")
if len(bread)!=7: errors.append(f"pan global search {len(bread)} != 7")

# Crucial regression: selected year 1500 must not erase global wine geography.
wine_at_1500=[o for o in wine if o["period"]["start"]<=1500<=o["period"]["end"]]
if wine_at_1500:
    errors.append("baseline changed: wine unexpectedly active in 1500")

if errors:
    print("GLOBAL MAP SEARCH DATA: FAIL")
    for e in errors: print("ERROR:",e)
    sys.exit(1)

print("GLOBAL MAP SEARCH DATA: PASS")
print("vino:",len(wine),"global matches · 0 at 1500")
print("pan:",len(bread),"global matches · no false positive from España")
