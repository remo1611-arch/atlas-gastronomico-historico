from pathlib import Path
import json,sys

ROOT=Path(__file__).resolve().parents[1]
stories=json.loads((ROOT/'data/stories.json').read_text(encoding='utf-8'))
occ={x['id'] for x in json.loads((ROOT/'data/occurrences.json').read_text(encoding='utf-8'))}
events={x['id'] for x in json.loads((ROOT/'data/events.json').read_text(encoding='utf-8'))}
dev={x['id'] for x in json.loads((ROOT/'data/developments.json').read_text(encoding='utf-8'))}
errors=[]

seen=set()
for story in stories:
    if story['id'] in seen: errors.append('story id duplicado '+story['id'])
    seen.add(story['id'])
    for scene in story.get('scenes',[]):
        for ref in scene.get('itemRefs',[]):
            pool={'occurrence':occ,'event':events,'development':dev}.get(ref.get('kind'))
            if pool is None or ref.get('ref') not in pool:
                errors.append(f"ruta imposible desde {story['id']}/{scene['id']}: {ref}")

if errors:
    print('NAVIGATION ROUTE DATA: FAIL')
    for e in errors: print('ERROR:',e)
    sys.exit(1)

print('NAVIGATION ROUTE DATA: PASS')
print('Stories:',len(stories),'· routeable scene itemRefs validated.')
