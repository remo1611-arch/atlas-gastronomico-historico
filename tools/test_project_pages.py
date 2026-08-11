from pathlib import Path
from tempfile import TemporaryDirectory
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from urllib.request import urlopen
import shutil,time,sys

ROOT=Path(__file__).resolve().parents[1]
critical=[
"","index.html","css/app.css","js/core.js","js/app.js","data/config.json","data/taxonomy.json",
"data/subjects.json","data/places.json","data/occurrences.json","data/events.json",
"data/relationships.json","data/contexts.json","data/developments.json","data/sources.json","data/basemap/world_110m.geojson"
]

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,format,*args):
        pass
    def copyfile(self,source,outputfile):
        try:
            super().copyfile(source,outputfile)
        except (BrokenPipeError,ConnectionResetError):
            pass

with TemporaryDirectory() as temp:
    temp=Path(temp)
    site=temp/"atlas-gastronomico-historico"
    shutil.copytree(ROOT,site,ignore=shutil.ignore_patterns("*.zip","MANIFEST.json","__pycache__"))
    handler=partial(QuietHandler,directory=str(temp))
    srv=ThreadingHTTPServer(("127.0.0.1",0),handler)
    th=Thread(target=srv.serve_forever,daemon=True);th.start()
    port=srv.server_address[1];time.sleep(.1)
    fail=[]
    try:
        for rel in critical:
            try:
                with urlopen(f"http://127.0.0.1:{port}/atlas-gastronomico-historico/{rel}",timeout=5) as r:
                    if r.status!=200: fail.append((rel,r.status))
                    r.read(64)
            except Exception as exc:
                fail.append((rel,str(exc)))
    finally:
        srv.shutdown();th.join(timeout=2)

if fail:
    print("GITHUB PAGES: FAIL")
    for x in fail:print("ERROR:",x)
    sys.exit(1)
print(f"GITHUB PAGES: PASS {len(critical)}/{len(critical)}")
