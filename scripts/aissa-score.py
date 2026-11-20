"""Original 112 BPM electronic score; no samples or external music. Outputs WAV."""
import array,math as m,random,sys,wave
sr=22050; length=60; rng=random.Random(702); data=array.array('h'); bpm=112; step=60/bpm
for n in range(sr*length):
 t=n/sr; beat=int(t/step); b=t%step; half=t%(step/2); bar=beat//4; noise=rng.uniform(-1,1)
 root=(41.203,48.999,36.708,43.654)[bar%4]
 kick=.62*m.exp(-b*17)*m.sin(m.tau*(46*b+2.2*(1-m.exp(-b*40))))
 snare=.20*noise*m.exp(-b*27)*(beat%4 in (1,3))
 hat=.045*noise*m.exp(-half*100)
 bass=.22*m.sin(m.tau*root*t)*m.exp(-half*6)*min(1,half*100)
 chord=sum(m.sin(m.tau*root*ratio*t) for ratio in (4,5,6))*.026*(.7+.3*m.sin(t*.7))
 eighth=int(t/(step/2)); note=(8,6,5,4,8,10,6,5)[eighth%8]
 pluck=.065*m.sin(m.tau*root*note*half)*m.exp(-half*19)*min(1,half*170)
 swell=.025*noise*(t% (step*16)/(step*16))**10
 envelope=min(1,t/1.5,(length-t)/2)
 data.append(int(29000*m.tanh(kick+snare+hat+bass+chord+pluck+swell)*envelope))
f=wave.open(sys.stdout.buffer,'wb');f.setparams((1,2,sr,0,'NONE',''));f.writeframes(data.tobytes());f.close()
