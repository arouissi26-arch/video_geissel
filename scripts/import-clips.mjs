import {copyFileSync,constants} from 'node:fs';
for (const [n,file] of Object.entries({1:'Squats 4.mp4',2:'lunges 1.mp4',3:'pont de glutis 2.mp4',5:'abdominals nivel 3.mp4',7:'dominadas.1.mp4',8:'Flexcions 3.mp4'})) {
  try {copyFileSync(`videos/${file}`,`public/clips/exercici-${n}.mp4`,constants.COPYFILE_EXCL);} catch(e) {if(e.code!=='EEXIST') throw e;}
}
