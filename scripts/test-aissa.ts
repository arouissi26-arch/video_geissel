import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {AFPS,AINTRO,APREVIEW,ABRIDGE,ACARD,AEND,aissaClips,aissaTimeline,details} from '../src/aissa-data';
const t=aissaTimeline();
assert.equal(aissaClips.length,8);
assert.equal(new Set(aissaClips.map(c=>c.id)).size,8);
assert.equal(APREVIEW/AFPS,2.5);
let cursor=AINTRO;
for(const c of t.previews){assert.equal(c.from,cursor);cursor+=c.frames;assert(c.previewAt+APREVIEW/AFPS<c.seconds);}
assert.equal(t.bridge,cursor);cursor+=ABRIDGE;
for(const c of t.exercises){assert.equal(c.from,cursor);assert.equal(c.frames,Math.ceil(c.seconds*AFPS));cursor+=c.frames;}
assert.equal(t.outro,cursor);assert.equal(t.end,cursor+3*ACARD);assert.equal(t.total,t.end+AEND);
cursor=0;for(const s of t.scenes){assert.equal(s.from,cursor);cursor+=s.frames;}assert.equal(cursor,t.total);
assert.equal(details.squat.name,'Sentadilles');assert.equal(details.lunge.name,'Gambades');
for(const c of aissaClips){
 assert(fs.existsSync(`public/art/aissa/${c.id}.jpg`));
 assert(fs.existsSync(`public/${c.src}`));
 const seconds=Number(execFileSync('node_modules/@remotion/compositor-linux-x64-gnu/ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=duration','-of','csv=p=0',`public/${c.src}`],{encoding:'utf8'}).trim().split(',')[0]);
 assert.equal(seconds,c.seconds);
}
console.log(`PASS: ${t.exercises.length} full sources; 8 × 2.5 s previews; ${t.total} frames (${(t.total/AFPS).toFixed(2)} s); no gaps/overlaps.`);
