import {copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {dirname, resolve} from 'node:path';

const clipsDir = resolve('public/clips');
const audioDir = resolve('public/audio');
const manifestPath = resolve('src/generated/asset-manifest.json');
mkdirSync(clipsDir, {recursive: true});
mkdirSync(audioDir, {recursive: true});
mkdirSync(dirname(manifestPath), {recursive: true});

// Six clips were already supplied in /videos. Stage them into the requested public upload slots
// once; public MP4 inputs are ignored by Git, and a real upload at the public path takes precedence.
const existingSources = {
  'exercici-1.mp4': 'videos/Squats 4.mp4',
  'exercici-2.mp4': 'videos/lunges 1.mp4',
  'exercici-3.mp4': 'videos/pont de glutis 2.mp4',
  'exercici-5.mp4': 'videos/abdominals nivel 3.mp4',
  'exercici-7.mp4': 'videos/dominadas.1.mp4',
  'exercici-8.mp4': 'videos/Flexcions 3.mp4'
};
for (const [name, source] of Object.entries(existingSources)) {
  const targetPath = resolve(clipsDir, name);
  const sourcePath = resolve(source);
  if (!existsSync(targetPath) && existsSync(sourcePath)) {
    copyFileSync(sourcePath, targetPath);
  }
}

const clips = Array.from({length: 9}, (_, index) => {
  const filename = `exercici-${index + 1}.mp4`;
  return {filename, path: `clips/${filename}`, available: existsSync(resolve(clipsDir, filename))};
});
const audioCandidates = readdirSync(audioDir)
  .filter((name) => /^(music|musica|soundtrack)\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(name))
  .sort((a, b) => a.localeCompare(b));
let audio = audioCandidates[0] ? `audio/${audioCandidates[0]}` : 'audio/demo-bed.wav';
if (!audioCandidates.length && !existsSync(resolve(audioDir, 'demo-bed.wav'))) {
  execFileSync(process.execPath, [resolve('scripts/generate-demo-audio.mjs')], {stdio: 'inherit'});
}
writeFileSync(manifestPath, `${JSON.stringify({clips, audio}, null, 2)}\n`);
console.log(`Synced assets: ${clips.filter((clip) => clip.available).length}/9 clips; music: ${audio}`);
