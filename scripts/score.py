"""Original 120 BPM score. No samples. python scripts/score.py > pulse.wav"""
import array, math as m, random, sys, wave
sr=22050; rng=random.Random(51); buf=array.array('h'); pi2=m.tau; prev=0
for n in range(sr*52):
 t=n/sr; beat=int(t*2); b=t%0.5; sub=t%0.25; bar=beat//4; build=min(1,max(0,(t-24)/16)); root=(55,55,43.654,48.999)[bar%4]; noise=rng.uniform(-1,1); hat=noise-prev; prev=noise
 kick=.68*m.exp(-b*14)*m.sin(pi2*(48*b+2.8*(1-m.exp(-b*35))))
 snare=(.32*noise+.09*m.sin(pi2*180*b))*m.exp(-b*23)*(beat%2)
 h=.09*hat*m.exp(-sub*75)*(0.6 if sub==b else 1); bass=.23*m.exp(-sub*8)*min(1,sub*180)*m.sin(pi2*root*t)
 freq=root*(4,6,8,7.12)[int(t*4)%4]; lead=.115*min(1,sub*130)*m.exp(-sub*15)*(m.sin(pi2*freq*sub)+.3*m.sin(2*pi2*freq*sub)); roll=build*.14*noise*m.exp(-60*(t%.125)) if t<40 else 0
 val=(kick+snare+h+bass+lead+roll)*(1 if t<40 else .72); buf.append(int(28500*m.tanh(val)*min(1,(52-t)/2)))
f=wave.open(sys.stdout.buffer,'wb'); f.setparams((1,2,sr,0,'NONE',''));f.writeframes(buf.tobytes());f.close()
