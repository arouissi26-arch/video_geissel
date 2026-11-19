"""Original procedural soundtrack. No samples or third-party music."""
import math, random, wave, struct
from pathlib import Path
rate = 22050
rng = random.Random(86)
path = Path('public/audio/beat.wav')
path.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(path), 'wb') as out:
    out.setparams((1, 2, rate, 0, 'NONE', 'not compressed'))
    for beat in range(135):
        section = max(0, min(8, (beat-7)//12))
        level = .55 + .05*section
        hz = [55,55,65.41,49,55,73.42,65.41,49][beat%8]
        impact = beat == 1 or (beat >= 7 and (beat-7)%12 == 0)
        chunk = bytearray()
        for i in range(rate//2):
            t=i/rate
            noise=rng.uniform(-1,1)
            hat=t%.25
            kick=.56*math.exp(-t*17)*math.sin(2*math.pi*(47*t+3*(1-math.exp(-22*t))))
            bass=.22*min(1,t*240)*math.exp(-t*5)*(math.sin(2*math.pi*hz*t)+.22*math.sin(6*math.pi*hz*t))
            drums=.14*noise*math.exp(-hat*85)+(.18*noise*math.exp(-t*26) if beat%2==0 else 0)
            stab=.13*math.exp(-t*8)*min(1,t*180)*sum(math.sin(2*math.pi*hz*m*t) for m in (4,6,9.51)) if beat>=7 else 0
            hit=.24*math.exp(-t*12)*(noise*.45+math.sin(2*math.pi*36*t)) if impact else 0
            riser=.17*noise*t*2 if 106<=beat<115 else 0
            gain=.2 if beat==0 else .55 if beat<7 and beat!=1 else 1
            v=gain*(kick+level*(bass+drums+stab)+hit+riser)
            chunk.extend(struct.pack('<h',int(30000*math.tanh(v))))
        out.writeframes(chunk)
