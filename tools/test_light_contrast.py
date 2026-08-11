import sys

def hexrgb(h):
    h=h.lstrip("#")
    return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))

def channel(v):
    return v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4

def lum(h):
    r,g,b=hexrgb(h)
    return .2126*channel(r)+.7152*channel(g)+.0722*channel(b)

def ratio(a,b):
    l1,l2=sorted((lum(a),lum(b)),reverse=True)
    return (l1+.05)/(l2+.05)

pairs={
    "text / surface":("#2b2924","#fbf8f1"),
    "muted / surface":("#686158","#fbf8f1"),
    "accent / surface":("#a85319","#fbf8f1"),
    "drink / surface":("#68459b","#fbf8f1"),
    "technique / surface":("#1d7774","#fbf8f1"),
    "product / surface":("#9e4548","#fbf8f1"),
    "ingredient / surface":("#4c7546","#fbf8f1"),
    "place / surface":("#35678f","#fbf8f1"),
}

errors=[]
for label,(fg,bg) in pairs.items():
    r=ratio(fg,bg)
    print(f"{label}: {r:.2f}:1")
    if r<4.5:
        errors.append(f"{label} = {r:.2f}:1")

if errors:
    print("CONTRAST LIGHT: FAIL")
    for e in errors:print("ERROR:",e)
    sys.exit(1)

print("CONTRAST LIGHT: PASS")
