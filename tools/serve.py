from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, threading, webbrowser
ROOT=Path(__file__).resolve().parents[1]
os.chdir(ROOT)
url="http://127.0.0.1:8000"
print("Atlas Gastronómico Histórico:",url)
threading.Timer(.7,lambda:webbrowser.open(url)).start()
ThreadingHTTPServer(("127.0.0.1",8000),SimpleHTTPRequestHandler).serve_forever()
