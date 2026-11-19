import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

// Original, sample-free 120 BPM electronic training bed. 48s = exact timeline length.
const OUTPUT = resolve('public/audio/demo-bed.wav');
const SAMPLE_RATE = 44100;
const CHANNELS = 2;
const SECONDS = 48;
const TOTAL = SAMPLE_RATE * SECONDS;
const left = new Float32Array(TOTAL);
const right = new Float32Array(TOTAL);
const TAU = Math.PI * 2;
let randomState = 0x51f15e;
const rand = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return (randomState / 0xffffffff) * 2 - 1;
};
const clampIndex = (n) => Math.max(0, Math.min(TOTAL, n));
const panGains = (pan = 0) => [Math.cos((pan + 1) * Math.PI / 4), Math.sin((pan + 1) * Math.PI / 4)];

function mixAt(index, sample, pan = 0) {
  if (index < 0 || index >= TOTAL) return;
  const [l, r] = panGains(pan);
  left[index] += sample * l;
  right[index] += sample * r;
}

function addKick(time, gain = 0.68, pan = 0) {
  const start = Math.round(time * SAMPLE_RATE);
  const length = Math.min(Math.round(0.30 * SAMPLE_RATE), TOTAL - start);
  for (let n = 0; n < length; n++) {
    const t = n / SAMPLE_RATE;
    const envelope = Math.exp(-t * 13.5);
    const phase = TAU * (48 * t + 78 * (1 - Math.exp(-17 * t)) / 17);
    const click = n < 380 ? rand() * (1 - n / 380) * 0.12 : 0;
    const thump = Math.sin(phase) * envelope * 0.95;
    mixAt(start + n, (thump + click) * gain, pan);
  }
}

function addSnare(time, gain = 0.27, pan = 0) {
  const start = Math.round(time * SAMPLE_RATE);
  const length = Math.min(Math.round(0.22 * SAMPLE_RATE), TOTAL - start);
  for (let n = 0; n < length; n++) {
    const t = n / SAMPLE_RATE;
    const noise = rand() * Math.exp(-t * 24);
    const body = Math.sin(TAU * 185 * t) * Math.exp(-t * 28) * 0.44;
    const crack = n < 450 ? rand() * (1 - n / 450) * 0.25 : 0;
    mixAt(start + n, (noise * 0.52 + body + crack) * gain, pan);
  }
}

function addHat(time, gain = 0.075, open = false, pan = 0) {
  const start = Math.round(time * SAMPLE_RATE);
  const duration = open ? 0.15 : 0.048;
  const length = Math.min(Math.round(duration * SAMPLE_RATE), TOTAL - start);
  let previous = 0;
  for (let n = 0; n < length; n++) {
    const t = n / SAMPLE_RATE;
    const noise = rand();
    const high = noise - previous * 0.65;
    previous = noise;
    const envelope = Math.exp(-t * (open ? 21 : 68));
    const sparkle = Math.sin(TAU * 8850 * t) * 0.12;
    mixAt(start + n, (high * 0.85 + sparkle) * envelope * gain, pan);
  }
}

function addBass(time, frequency, gain = 0.20, pan = 0) {
  const start = Math.round(time * SAMPLE_RATE);
  const length = Math.min(Math.round(0.31 * SAMPLE_RATE), TOTAL - start);
  const phaseShift = rand() * TAU;
  for (let n = 0; n < length; n++) {
    const t = n / SAMPLE_RATE;
    const envelope = Math.exp(-t * 7.4) * Math.min(1, t * 140);
    const fundamental = Math.sin(TAU * frequency * t + phaseShift);
    const octave = Math.sin(TAU * frequency * 2.01 * t + phaseShift * 0.37) * 0.24;
    const grit = Math.sin(TAU * frequency * 3.01 * t) * 0.08;
    mixAt(start + n, (fundamental + octave + grit) * envelope * gain, pan);
  }
}

function addPluck(time, frequency, gain = 0.065, pan = 0) {
  const start = Math.round(time * SAMPLE_RATE);
  const length = Math.min(Math.round(0.26 * SAMPLE_RATE), TOTAL - start);
  for (let n = 0; n < length; n++) {
    const t = n / SAMPLE_RATE;
    const envelope = Math.exp(-t * 11) * Math.min(1, t * 200);
    const fundamental = Math.sin(TAU * frequency * t);
    const overtone = Math.sin(TAU * frequency * 2.003 * t) * 0.27;
    const shimmer = Math.sin(TAU * frequency * 4 * t) * 0.08;
    mixAt(start + n, (fundamental + overtone + shimmer) * envelope * gain, pan);
  }
}

// Four bars of restrained air; the drop lands at 1.0s and then keeps every cut on a bar.
const beatSeconds = 0.5;
const roots = [43.65, 34.65, 51.91, 38.89]; // F1, Db1, Ab1, Eb1
const arpeggio = [1, 1.26, 1.5, 2, 1.5, 1.26, 1.12, 1.5];

for (let beat = 2; beat < 96; beat++) {
  const t = beat * beatSeconds;
  const bar = Math.floor(beat / 4);
  const beatInBar = beat % 4;
  const root = roots[bar % roots.length];
  const impact = beat % 8 === 0 ? 0.86 : 0.70;
  addKick(t, impact, -0.02);
  if (beatInBar === 1 || beatInBar === 3) {
    addSnare(t, beat % 8 === 3 ? 0.30 : 0.24, beatInBar === 1 ? -0.04 : 0.04);
  }
  addBass(t + 0.02, root * (beatInBar === 2 ? 2 : 1), 0.17 + (beat % 8 === 0 ? 0.05 : 0), beatInBar % 2 ? 0.06 : -0.06);
  if (beat >= 8) {
    const note = arpeggio[(beat + bar) % arpeggio.length];
    addPluck(t + 0.11, root * 4 * note, beat >= 80 ? 0.075 : 0.048, (beat % 2 ? 0.2 : -0.2));
  }
}

// Eighth-note hats grow from a sparse intro into a brighter final build.
for (let eighth = 0; eighth < 192; eighth++) {
  const t = eighth * 0.25;
  if (t < 0.75) continue;
  const beat = Math.floor(eighth / 2);
  const inBuild = t >= 37.5;
  const gain = t < 4 ? 0.025 : inBuild ? 0.09 : 0.055;
  addHat(t, gain * (eighth % 2 === 0 ? 1.0 : 0.72), inBuild && eighth % 8 === 6, (eighth % 4 - 1.5) * 0.08);
  if (inBuild && eighth % 2 === 1) addHat(t + 0.015, 0.025, false, -0.28);
}

// A soft, four-chord synth bed with two detuned voices; no samples or external material.
for (let bar = 0; bar < 24; bar++) {
  const start = bar * 2 * SAMPLE_RATE;
  const end = clampIndex(start + 2 * SAMPLE_RATE);
  const root = roots[bar % roots.length] * 2;
  const frequencies = [root, root * 1.1892, root * 1.4983];
  const pan = (bar % 2 ? 0.11 : -0.11);
  for (let i = start; i < end; i++) {
    const t = (i - start) / SAMPLE_RATE;
    const attack = Math.min(1, t * 1.6);
    const release = Math.min(1, (2 - t) * 5);
    const swell = 0.045 + (bar >= 19 ? 0.018 : 0);
    const chord = frequencies.reduce((sum, frequency, index) => {
      const detune = index === 1 ? 1.003 : 1;
      return sum + Math.sin(TAU * frequency * detune * t + bar * 0.37) / (1 + index * 0.24);
    }, 0) / 2.4;
    mixAt(i, chord * attack * release * swell, pan);
  }
}

// Two rising noise blooms push into the first title and the final reflection section.
for (const [startSeconds, duration, gain] of [[0.15, 0.9, 0.11], [37.4, 2.6, 0.19]]) {
  const start = Math.round(startSeconds * SAMPLE_RATE);
  const length = Math.round(duration * SAMPLE_RATE);
  let previous = 0;
  for (let n = 0; n < length && start + n < TOTAL; n++) {
    const progress = n / length;
    const noise = rand();
    const high = noise - previous * 0.76;
    previous = noise;
    const swell = progress * progress * gain;
    const tremolo = 0.78 + 0.22 * Math.sin(TAU * (1.5 + progress * 7) * n / SAMPLE_RATE);
    const sample = high * swell * tremolo;
    mixAt(start + n, sample, -0.18);
    if (start + n + 900 < TOTAL) mixAt(start + n + 900, sample * 0.17, 0.24);
  }
}

// Gentle, deterministic master fade; the Remotion mix adds its own final audio ramp too.
const fadeStart = Math.round(46 * SAMPLE_RATE);
let peak = 0;
for (let i = 0; i < TOTAL; i++) {
  const fade = i < fadeStart ? 1 : Math.max(0, (TOTAL - i) / (TOTAL - fadeStart));
  left[i] *= fade;
  right[i] *= fade;
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const master = peak > 0 ? 0.9 / peak : 1;
const dataBytes = TOTAL * CHANNELS * 2;
const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataBytes, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(CHANNELS, 22);
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * CHANNELS * 2, 28);
header.writeUInt16LE(CHANNELS * 2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(dataBytes, 40);
const pcm = Buffer.alloc(dataBytes);
for (let i = 0; i < TOTAL; i++) {
  const l = Math.max(-1, Math.min(1, left[i] * master));
  const r = Math.max(-1, Math.min(1, right[i] * master));
  pcm.writeInt16LE(Math.round(l * 32767), i * 4);
  pcm.writeInt16LE(Math.round(r * 32767), i * 4 + 2);
}
mkdirSync(dirname(OUTPUT), {recursive: true});
writeFileSync(OUTPUT, Buffer.concat([header, pcm]));
console.log(`Generated ${OUTPUT} (${SECONDS}s, ${SAMPLE_RATE}Hz, original 120 BPM sample-free demo bed)`);
